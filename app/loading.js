import Container from "../app/_components/Container";

export default function Loading() {
  return (
    <Container>
      <div className="mt-[200px] mb-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-7">
        {Array.from({ length: 14 }).map((el, idx) => (
          <div key={idx}>
            <div className="rounded-lg animate-pulse aspect-square mb-2">
              <div className="h-full bg-gray-300 rounded"></div>
            </div>
            <div className="rounded-lg animate-pulse mb-1">
              <div className="w-[15ch] h-2 bg-gray-300 rounded"></div>
            </div>
            <div className="rounded-lg animate-pulse">
              <div className="w-[9ch] h-2 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
