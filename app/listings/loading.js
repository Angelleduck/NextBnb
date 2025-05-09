import Container from "@/app/_components/Container";

export default function Loading() {
  return (
    <Container>
      <div className="mt-28 max-w-5xl mx-auto mb-24 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="rounded-lg animate-pulse">
            <div className="max-w-[8ch] h-2 bg-gray-300 rounded"></div>
          </div>
          <div className="rounded-lg animate-pulse">
            <div className="max-w-[18ch] h-2 bg-gray-300 rounded"></div>
          </div>
        </div>
        <div className="rounded-lg animate-pulse">
          <div className="w-full h-[60vh] bg-gray-300 rounded"></div>
        </div>
        <div className="grid md:grid-cols-7 gap-10">
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="rounded-lg animate-pulse">
                <div className="w-[15ch] h-2 bg-gray-300 rounded"></div>
              </div>
              <div className="flex gap-3">
                <div className="rounded-lg animate-pulse">
                  <div className="w-[6ch] h-2 bg-gray-300 rounded"></div>
                </div>
                <div className="rounded-lg animate-pulse">
                  <div className="w-[6ch] h-2 bg-gray-300 rounded"></div>
                </div>
                <div className="rounded-lg animate-pulse">
                  <div className="w-[6ch] h-2 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
            <hr />
            <div className="flex gap-2 items-center">
              <div className="rounded-lg animate-pulse">
                <div className="w-[40px] h-[40px] bg-gray-300 rounded"></div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="rounded-lg animate-pulse">
                  <div className="w-[8ch] h-2 bg-gray-300 rounded"></div>
                </div>
                <div className="rounded-lg animate-pulse">
                  <div className="w-[14ch] h-2 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
            <hr />
            <div className="rounded-lg animate-pulse">
              <div className="max-w-[30ch] h-8 bg-gray-300 rounded"></div>
            </div>
            <hr />
            <div className="rounded-lg animate-pulse">
              <div className="w-full h-[35vh] bg-gray-300 rounded"></div>
            </div>
          </div>
          {/* <div className="order-first md:order-2 md:col-span-3 rounded-xl"></div> */}
          <div className="order-first md:order-2 md:col-span-3 rounded-lg animate-pulse">
            <div className="w-full h-full bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </Container>
  );
}
