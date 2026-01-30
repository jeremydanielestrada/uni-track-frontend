/* eslint-disable @typescript-eslint/no-explicit-any */
interface CardProps {
  children: React.ReactNode;
  className: string;
  onClick?: (e: any) => any;
}

function Card({ header, children, className, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`border border-secondary shadow-lg rounded ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
