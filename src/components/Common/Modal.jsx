import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog Box */}
      <div
        role="dialog"
        aria-modal="true"
        className={`relative w-full ${maxWidth} bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl shadow-xl p-6 z-10 transition-all duration-200`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] mb-4">
          <h3 className="text-base font-semibold text-[var(--text-primary)]">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-subtle)] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

