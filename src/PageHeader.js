import React from "react";

export default function PageHeader({ title, breadcrumbs = [] }) {
  return (
    <header className="sticky top-0 z-20 bg-white flex flex-col gap-1 py-2 px-2 mb-2 font-inter">
      {breadcrumbs.length > 0 && (
        <nav className="text-xs text-zinc-400 mb-1 flex gap-1 items-center">
          {breadcrumbs.map((bc, idx) => (
            <span key={bc.label} className="flex items-center">
              {idx > 0 && <span className="mx-1">/</span>}
              {bc.href ? (
                <a href={bc.href} className="hover:underline text-zinc-500">
                  {bc.label}
                </a>
              ) : (
                <span className="text-zinc-400">{bc.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
          {title}
        </h1>
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-2 rounded-md text-zinc-900 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-56 placeholder-zinc-400 font-inter text-sm"
        />
      </div>
    </header>
  );
}
