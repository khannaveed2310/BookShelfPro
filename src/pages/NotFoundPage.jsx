import { Link } from "react-router-dom";
import { HelpCircle, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-[80px] flex flex-col items-center justify-center text-center p-6 py-20 animate-fade-in">
      <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mb-6 text-red-400 shadow-inner">
        <HelpCircle className="w-8 h-8" />
      </div>
      
      <h1 className="text-4xl font-extrabold text-white font-display tracking-tight">
        Page Not Found
      </h1>
      
      <p className="text-surface-400 text-sm max-w-md mt-2.5 mb-8 leading-relaxed">
        The book resource or routing segment you are looking for does not exist, has been deleted, or shifted somewhere else.
      </p>

      <Link to="/" className="btn-primary inline-flex items-center gap-2 shadow-lg shadow-indigo-600/10">
        <Home className="w-4 h-4" />
        Return to Dashboard
      </Link>
    </div>
  );
}