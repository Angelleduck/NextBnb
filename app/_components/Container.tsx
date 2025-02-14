interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="max-w-[1500px] xl:px-20 md:px-10 mx-auto px-4">
      {children}
    </div>
  );
}
