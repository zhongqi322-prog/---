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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/45 px-4">
      <div className="w-full max-w-md rounded-3xl bg-paper p-6 shadow-card">
        <p className="text-sm font-semibold text-cinnabar">mock 支付</p>
        <h2 className="mt-2 text-2xl font-semibold text-ink">解锁完整报告</h2>
        <p className="mt-3 text-sm leading-7 text-muted">
          当前为 MVP mock 支付流程，不会产生真实扣款。点击确认后只会在本地记录中标记为已解锁。
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            className="rounded-full bg-cinnabar px-5 py-3 text-sm font-semibold text-white"
            onClick={onUnlock}
            type="button"
          >
            mock 支付成功
          </button>
          <button
            className="rounded-full border border-muted/20 px-5 py-3 text-sm font-semibold text-muted"
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
