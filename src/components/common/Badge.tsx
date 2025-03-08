import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'info' | 'warning';
  icon?: React.ReactNode;
  className?: string;
}

const variantStyles = {
  success: 'bg-emerald-500 text-white',
  info: 'bg-emerald-50 text-emerald-700',
  warning: 'bg-amber-50 text-amber-700'
};

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'info',
  icon,
  className = ''
}) => {
  return (
    <div className={`
      inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
      ${variantStyles[variant]}
      ${className}
    `}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </div>
  );
};

export default Badge; 