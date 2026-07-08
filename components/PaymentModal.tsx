"use client";

type PaymentModalProps = {
  open: boolean;
  onClose: () => void;
  onUnlock: () => void;
};

export function PaymentModal({ open, onClose, onUnlock }: PaymentModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="paper-panel w-full max-w-md p-6">
        <p className="text-sm font-semibold text-[#9f3f2f]">模拟解锁说明</p>
        <h2 className="mt-2 text-2xl font-semibold text-[#2f241d]">当前不会真实付款</h2>
        <p className="mt-3 text-sm leading-7 text-[#5f4a37]">
          这里是产品测试用的模拟流程，不会跳转微信支付、不会输入付款密码，也不会从任何账户扣钱。
          点击确认后，只会把这份报告在本机浏览器记录中标记为“已模拟解锁”。
        </p>
        <div className="mt-4 rounded-2xl border border-[#9f3f2f]/35 bg-[#fff1de] p-4 text-sm leading-7 text-[#4f3b2c]">
          <p className="font-semibold text-[#9f3f2f]">请确认你理解：</p>
          <ul className="mt-2 space-y-1">
            <li>- 不会真实扣款。</li>
            <li>- 不会产生真实订单。</li>
            <li>- 只是演示未来付费解锁的页面流程。</li>
          </ul>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            className="gold-button"
            onClick={onUnlock}
            type="button"
          >
            我理解，模拟解锁
          </button>
          <button
            className="rounded-xl border border-[#b98a4a]/45 px-5 py-3 text-sm font-semibold text-[#5f4a37]"
            onClick={onClose}
            type="button"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  );
}
