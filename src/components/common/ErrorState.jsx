import { AlertCircle, RefreshCw } from "lucide-react";

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-red-400" />
      </div>

      <h3 className="text-base font-semibold text-surface-800 dark:text-surface-200 mb-1 font-display">
        Something went wrong
      </h3>

      <p className="text-sm text-surface-400 dark:text-surface-500 mb-5 max-w-xs">
        {message || "Failed to load books. Please try again."}
      </p>

      {onRetry && (
        <button onClick={onRetry} className="btn-secondary">
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
      )}
    </div>
  );
}