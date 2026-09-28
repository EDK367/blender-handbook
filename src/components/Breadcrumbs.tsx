import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center space-x-1.5 text-xs text-zinc-400 overflow-x-auto py-2 ${className}`}
    >
      <Link
        href="/"
        className="inline-flex items-center hover:text-[#00E5FF] transition-colors gap-1"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Inicio</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3 h-3 text-zinc-600 shrink-0" />
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-[#00E5FF] transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ) : (
              <span className={`whitespace-nowrap ${isLast ? 'text-zinc-200 font-medium' : ''}`}>
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
