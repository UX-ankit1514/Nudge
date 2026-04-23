import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "apple-button flex items-center justify-center font-ui font-medium rounded-full tracking-[2px] transition-all focus:outline-none focus:ring-2 focus:ring-white/20";
  
  const variants = {
    primary: "bg-[#efa339] text-black hover:bg-[#ffb349] shadow-[0_4px_20px_rgba(239,163,57,0.3)] hover:shadow-[0_8px_30px_rgba(239,163,57,0.4)]",
    outline: "border border-[#efa339] text-white hover:bg-[#efa339]/10",
    ghost: "bg-white/5 border border-white/10 text-white hover:bg-white/10"
  };

  const sizes = {
    sm: "px-4 py-2 text-[14px]",
    md: "px-8 py-3 text-[18px]",
    lg: "px-10 py-4 text-[20px]"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
