import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass' | 'interactive' | 'outline';
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  glow = false,
  ...props
}) => {
  const baseStyles = 'rounded-2xl transition-all duration-200 overflow-hidden';

  const variantStyles = {
    default: 'bg-midnight-900 border border-slate-800/80 shadow-md',
    elevated: 'bg-midnight-850 border border-slate-700/60 shadow-xl shadow-black/40',
    glass: 'bg-midnight-900/60 backdrop-blur-xl border border-white/10 shadow-2xl',
    interactive:
      'bg-midnight-900/80 border border-slate-800 hover:border-slate-600 hover:bg-midnight-850 hover:shadow-xl hover:shadow-brand-purple/5 transition-all duration-300',
    outline: 'bg-transparent border border-slate-800',
  };

  const glowStyles = glow ? 'relative before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gradient-to-r before:from-blue-600/20 before:to-purple-600/20 before:blur-xl' : '';

  return (
    <div className={twMerge(clsx(baseStyles, variantStyles[variant], glowStyles, className))} {...props}>
      {children}
    </div>
  );
};
