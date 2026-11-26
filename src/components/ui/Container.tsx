import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}
