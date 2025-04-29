interface HeadingProps {
  title: string;
  subtitle: string;
}
export default function Heading({ title, subtitle }: HeadingProps) {
  return (
    <>
      <h1 className="text-2xl font-bold mb-1">{title}</h1>
      <p className="text-neutral-500">{subtitle}</p>
    </>
  );
}
