import { ReactNode } from 'react';

interface FeatureBadgeProps {
  icon: ReactNode;
  text: string;
  variant?: 'primary' | 'secondary' | 'accent';
}

export function FeatureBadge({ icon, text, variant = 'primary' }: FeatureBadgeProps) {
  const variantClasses = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent text-accent-foreground',
  };

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold uppercase tracking-tight ${variantClasses[variant]}`}>
      {icon}
      {text}
    </div>
  );
}
