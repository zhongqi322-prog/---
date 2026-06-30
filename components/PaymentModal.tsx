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
        <p className="text-sm font-semibold text-[#9f3f2f]">mock 支付</p>
        <h2 className="mt-2 text-2xl font-semibold text-[#2f241d]">解锁完整报告</h2>
        <p className="mt-3 text-sm leading-7 text-[#5f4a37]">
          当前为 MVP mock 支付流程，不会产生真实扣款。点击确认后只会在本地记录中标记为已解锁。
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            className="gold-button"
            onClick={onUnlock}
            type="button"
          >
            mock 支付成功
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
