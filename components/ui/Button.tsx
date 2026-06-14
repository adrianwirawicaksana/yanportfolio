import { ButtonHTMLAttributes, ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";

const BASE_BUTTON_STYLES = `
  inline-flex items-center justify-center 
  font-bold text-white rounded-xl
  border-3 border-blue-600 bg-linear-to-t from-blue-600 to-blue-500 
  hover:scale-102 active:scale-98 transition-all duration-300 
  cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  asChild?: boolean;
}

export default function Button({ 
  children, 
  asChild = false, 
  className = "",  
  ...props      
}: ButtonProps) {
  
  const Component = asChild ? Slot : "button";

  return (
    <Component className={`${BASE_BUTTON_STYLES} ${className}`} {...props}>
      {children}
    </Component>
  );
}