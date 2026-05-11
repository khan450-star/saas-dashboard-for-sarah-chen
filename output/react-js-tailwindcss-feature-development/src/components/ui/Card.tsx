import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function Card({ title, icon, children, className }: CardProps) {
  return (
    <div className={cn('card', className)}>
      {title && (
        <div className="flex items-center mb-4">
          {icon && <div className="mr-3 text-primary-600">{icon}</div>}
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
}