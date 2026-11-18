import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  fullWidth = true,
  disabled = false,
  onClick,
  className = '',
  icon: Icon,
  type = 'button'
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-150 active:scale-[0.98] select-none";

  const sizeStyles = {
    sm: "h-[40px] px-4 text-[13px] rounded-xl gap-1.5",
    md: "h-[52px] px-6 text-[15px] rounded-2xl gap-2",
    lg: "h-[56px] px-8 text-[16px] rounded-2xl gap-2.5",
  };

  const variantStyles = {
    primary: "bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-sm hover:shadow active:bg-[#1D4ED8]",
    secondary: "bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#3B82F6] active:bg-[#BFDBFE]",
    outline: "bg-white border border-[#CED8E5] text-[#172B4D] hover:bg-slate-50",
    danger: "bg-rose-500 hover:bg-rose-600 text-white",
  };

  const disabledStyles = disabled ? "opacity-50 pointer-events-none cursor-not-allowed" : "cursor-pointer";
  const widthStyles = fullWidth ? "w-full" : "w-auto";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabledStyles} ${widthStyles} ${className}`}
    >
      {Icon && <Icon className="w-5 h-5 shrink-0" />}
      <span>{children}</span>
    </button>
  );
};
