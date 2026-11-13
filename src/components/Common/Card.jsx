import React from 'react';

export function Card({ children, className = '', hover = false, onClick, ...props }) {
  return (
    <div
      onClick={onClick}
      className={`bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 transition-all duration-200 ${
        hover ? 'hover:border-[var(--accent-lavender)]/50 hover:shadow-sm cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action, className = '' }) {
  return (
    <div className={`flex items-start justify-between gap-4 mb-4 ${className}`}>
      <div>
        <h3 className="text-base font-semibold text-[var(--text-primary)] tracking-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

