interface CardProps {
  children: React.ReactNode;
  classname: string;
}

function Card({ children, classname }: CardProps) {
  return (
    <div
      className={`p-8 border border-secondary shadow-lg rounded ${classname}`}
    >
      {children}
    </div>
  );
}

export default Card;
