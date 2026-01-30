interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: any) => void;
  size: string;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  children,
  onClick,
  size = "default",
  className,
  disabled,
  type,
}: ButtonProps) => {
  const baseClasses =
    "cursor-pointer relative overflow-hidden rounded font-medium focus:outline-none  focus-visible:ring-2 focus-visible:ring-primary bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm shadow-primary/50 ";

  const sizeClasses: { [key: string]: string } = {
    sm: "px-4 py-2 text-sm",
    lg: "px-8 py-4 text-lg",
    default: "px-6 py-3 text-base",
  };
  const classes = `${baseClasses} ${sizeClasses[size]} ${className}`;
  return (
    <button
      onClick={onClick}
      className={classes}
      disabled={disabled}
      type={type}
    >
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};
