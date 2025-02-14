import Image from "next/image";

export default function Logo() {
  return (
    <>
      <div className="hidden min-[824px]:flex items-center gap-[5px] cursor-pointer ">
        <Image
          width={31}
          height={30}
          src="/images/airbnb_logo.svg"
          alt="logo"
        />
        <span className="text-primary text-xl font-bold">nextbnb</span>
      </div>
    </>
  );
}
