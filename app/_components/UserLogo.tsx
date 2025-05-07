import Image from "next/image";

export default function UserLogo() {
  return (
    <Image
      src="/images/placeholder.jpg"
      alt="user"
      width={30}
      height={30}
      className="rounded-full"
    />
  );
}
