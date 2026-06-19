import argparse

from playwright.sync_api import sync_playwright


def normalize_url(url: str) -> str:
    value = url.rstrip("/")
    if not value.startswith(("http://", "https://")):
        return f"https://{value}"
    return value


def main() -> None:
    parser = argparse.ArgumentParser(description="Run P5 public smoke test against a deployed URL.")
    parser.add_argument("base_url", help="Public Vercel URL, for example https://example.vercel.app")
    args = parser.parse_args()
    base_url = normalize_url(args.base_url)

    checks_after_report = [
        "古籍出处",
        "书名：",
        "原文：",
        "白话解释：",
        "与本问题的关系：",
        "风险提醒",
    ]

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 390, "height": 844})

        page.goto(f"{base_url}/", wait_until="networkidle")
        home = page.locator("body").inner_text()
        for expected in ["今日黄历", "八字解读", "风险说明"]:
            if expected not in home:
                raise AssertionError(f"Missing home text: {expected}")

        routes = [
            "/service/bazi",
            "/service/ziwei",
            "/service/marriage",
            "/service/fengshui",
            "/service/yijing",
            "/service/wish",
            "/service/dream",
            "/service/palm",
            "/service/classics",
            "/records",
        ]
        for route in routes:
            response = page.goto(f"{base_url}{route}", wait_until="networkidle")
            if response is None or response.status >= 400:
                raise AssertionError(f"Route failed: {route}")

        page.goto(f"{base_url}/service/bazi", wait_until="networkidle")
        for selector, value in [
            ('input[name="name"]', "Test User"),
            ('input[name="birthDate"]', "1990-01-01"),
            ('input[name="birthTime"]', "08:00"),
            ('textarea[name="question"]', "career direction"),
        ]:
            if page.locator(selector).count() > 0:
                page.locator(selector).fill(value)

        page.locator('button[type="submit"]').click()
        page.wait_for_timeout(600)
        text = page.locator("body").inner_text()
        missing = [item for item in checks_after_report if item not in text]
        if missing:
            raise AssertionError("Missing report text: " + ", ".join(missing))

        page.get_by_text("解锁完整报告").click()
        page.wait_for_timeout(300)
        modal_text = page.locator("body").inner_text()
        if "mock 支付" not in modal_text or "不会产生真实扣款" not in modal_text:
            raise AssertionError("Mock payment warning missing")

        page.get_by_text("mock 支付成功").click()
        page.wait_for_timeout(300)
        unlocked_text = page.locator("body").inner_text()
        if "完整报告已 mock 解锁" not in unlocked_text:
            raise AssertionError("Unlock state missing")

        page.goto(f"{base_url}/records", wait_until="networkidle")
        records_text = page.locator("body").inner_text()
        if "八字解读" not in records_text:
            raise AssertionError("localStorage record missing")

        browser.close()

    print("p5-public-smoke passed")


if __name__ == "__main__":
    main()
