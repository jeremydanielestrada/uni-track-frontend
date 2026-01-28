interface CardProps {
  children: React.ReactNode;
  className: string;
}

function Card({ children, className }: CardProps) {
  return (
    <div
      className={`p-8 border border-secondary shadow-lg rounded ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
