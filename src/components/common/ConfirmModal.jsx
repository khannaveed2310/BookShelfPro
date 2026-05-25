import { Trash2, AlertTriangle } from "lucide-react";
import Modal from "./Modal";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  loading,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Deletion" size="sm">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
        </div>

        <div>
          <p className="font-semibold text-surface-900 dark:text-surface-50 mb-1">
            {title}
          </p>
          <p className="text-sm text-surface-500 dark:text-surface-400">
            {description}
          </p>
        </div>

        <div className="flex gap-3 w-full pt-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="btn-secondary flex-1 justify-center"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="btn-danger flex-1 justify-center"
          >
            <Trash2 className="w-4 h-4" />
            {loading ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
}