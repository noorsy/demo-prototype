import React from "react";

export default function PageHeader({ title, breadcrumbs = [] }) {
  return (
    <header className="sticky top-0 z-20 bg-background flex flex-col gap-1 py-2 px-2 mb-2">
      {breadcrumbs.length > 0 && (
        <nav className="text-xs text-muted-foreground mb-1 flex gap-1 items-center">
          {breadcrumbs.map((bc, idx) => (
            <span key={bc.label} className="flex items-center">
              {idx > 0 && <span className="mx-1">/</span>}
              {bc.href ? (
                <a
                  href={bc.href}
                  className="hover:underline text-muted-foreground"
                >
                  {bc.label}
                </a>
              ) : (
                <span className="text-muted-foreground">{bc.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
      </div>
    </header>
  );
}
