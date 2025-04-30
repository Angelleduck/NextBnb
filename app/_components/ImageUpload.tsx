import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";

interface ImageUploadProps {
  handleImage: Dispatch<SetStateAction<File | undefined>>;
  imageUploaded: File | undefined;
}
export default function ImageUpload({
  handleImage,
  imageUploaded,
}: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!imageUploaded) return;

    const objectUrl = URL.createObjectURL(imageUploaded);
    setPreviewUrl(objectUrl);

    // const formData = new FormData();

    // formData.append("file", imageUploaded);
    // formData.append("upload_preset", "upload-post-preset");

    // console.log(formData.get("file"));

    // async function ft() {
    //   const res = await fetch(
    //     `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
    //     {
    //       method: "POST",
    //       body: formData,
    //     }
    //   );
    //   const data = await res.json();

    //   console.log(data);
    // }
    // ft();
    // Clean up the object URL
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageUploaded]);
  return (
    <>
      <input
        onChange={(e) => {
          const file = e.target.files?.[0];
          handleImage(file);
        }}
        className="hidden"
        type="file"
        name="file-select"
        id="file-select"
      />
      <label
        htmlFor="file-select"
        className="border-2 border-dashed flex items-center justify-center h-[35vh] cursor-pointer hover:opacity-70 text-neutral-600 relative"
      >
        {previewUrl ? (
          <Image
            alt="image preview"
            src={previewUrl}
            fill
            unoptimized={true}
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <TbPhotoPlus size={44} />
            <p>Click to udpdate</p>
          </div>
        )}
      </label>
    </>
  );
}
