"use client";

import useCreateRentModal from "@/app/hooks/useCreateRentModal";
import Modal from "./rent/Modal";
import { navigationIcon } from "../Categories";
import { useMemo, useState } from "react";
import CategoryInput from "../Input/CategoryInput";
import Heading from "../Heading";
import dynamic from "next/dynamic";
import Counter from "../Input/Counter";
import ImageUpload from "../Input/ImageUpload";
import Input from "../Input/Input";
import { useRouter } from "next/navigation";
import SelectCountry from "../Input/SelectCountry";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { rentSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { createListing } from "@/app/actions/listings";

enum Steps {
  category = 0,
  location = 1,
  info = 2,
  image = 3,
  describe = 4,
  price = 5,
}

type InputField = z.infer<typeof rentSchema>;

export default function CreateRentModal() {
  const router = useRouter();
  const createRentModal = useCreateRentModal();
  const [step, setStep] = useState(Steps.category);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<InputField>({
    resolver: zodResolver(rentSchema),
    shouldUnregister: false,
    defaultValues: {
      price: 1,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
    },
  });

  //we need watch to observe since getValues doesn't re-render when values change
  const selectedCategory = watch("category");
  const selectedLocation = watch("location");
  const selectedImage = watch("image");
  const selectedGuestCount = watch("guestCount");
  const selectedRoomCount = watch("roomCount");
  const selectedBathroomCount = watch("bathroomCount");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        loading: () => (
          <div className="rounded-lg animate-pulse">
            <div className="w-full h-[35vh] bg-gray-300 rounded"></div>
          </div>
        ),
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedLocation],
  );

  const actionLabel = step === Steps.price ? "Create" : "Next";
  const secondaryActionLabel = step !== Steps.category && "Back";

  const onSubmit: SubmitHandler<InputField> = async (data) => {
    //I define here because of typescript, optimize later in case
    //we don't go the URL after fetching
    let imageSrc: string = "";
    const formData = new FormData();

    async function submitData(image: File) {
      // Image will never be undefined because of the above validaitons
      formData.append("file", image);
      formData.append("upload_preset", "upload-post-preset");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await res.json();

      // handle this later in case error
      //set link of image
      imageSrc = data.secure_url;
    }

    await submitData(data.image);

    await createListing({ ...data, imageSrc, location: data.location.value });
    router.refresh();
    createRentModal.onClose();
    reset();
    setStep(Steps.category);
  };

  const onNext = async () => {
    setError("root", {
      message: "",
    });
    if (step === Steps.category) {
      const output = await trigger("category");
      if (!output) {
        setError("root", {
          message: "Please select a category",
        });
        return;
      }
    }

    if (step === Steps.location) {
      const output = await trigger("location");
      if (!output) {
        setError("root", {
          message: "Please select a location",
        });
        return;
      }
    }
    if (step === Steps.image) {
      const output = await trigger("image");
      if (!output) {
        setError("root", {
          message: "Please select an image",
        });
        return;
      }
    }
    if (step === Steps.describe) {
      const output = await trigger("title");
      if (!output) {
        setError("root", {
          message: "Please describe the place",
        });
        return;
      }
    }

    if (step === Steps.price) {
      await handleSubmit(onSubmit)();
      return;
    }
    setStep((state) => state + 1);
  };
  const secondaryAction = () => {
    setStep((state) => state - 1);
  };

  const title = "Nextbnb your home!";
  let body = (
    <div className="p-6">
      <div className="mb-3">
        <Heading
          title="Which of these best describes your place?"
          subtitle="Pick a category"
        />
      </div>
      <div className="grid grid-cols-2 gap-3 max-h-[50vh] overflow-auto">
        {navigationIcon.map((item, idx) => (
          <CategoryInput
            key={idx}
            icon={item.icon}
            label={item.label}
            onClick={(label: string) =>
              setValue("category", label, { shouldValidate: true })
            }
            selected={selectedCategory === item.label}
          />
        ))}
      </div>
    </div>
  );

  if (step === Steps.location) {
    body = (
      <div className="p-6 flex flex-col gap-6">
        <div>
          <Heading
            title="Where is your place located ?"
            subtitle="Help guests find you!"
          />
        </div>

        <SelectCountry
          handleLocation={(location) => setValue("location", location)}
          location={selectedLocation}
        />

        <Map markerPosition={selectedLocation?.latlng} />
      </div>
    );
  }

  if (step === Steps.info) {
    body = (
      <div className="p-6 flex flex-col gap-8">
        <div>
          <Heading
            title="Share information about your place ?"
            subtitle="What amenities do you have?"
          />
        </div>
        <Counter
          key="Guests"
          title="Guests"
          subTitle="How many guests do you allow?"
          value={selectedGuestCount}
          handleCount={(value) => setValue("guestCount", value)}
        />
        <hr />
        <Counter
          key="Rooms"
          title="Rooms"
          subTitle="How many rooms do you have?"
          value={selectedRoomCount}
          handleCount={(value) => setValue("roomCount", value)}
        />
        <hr />
        <Counter
          key="Bathrooms"
          title="Bathrooms"
          subTitle="How many bathrooms do you have?"
          value={selectedBathroomCount}
          handleCount={(value) => setValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === Steps.image) {
    body = (
      <div className="p-6 flex flex-col gap-6">
        <div>
          <Heading
            title="Add a photo of your place"
            subtitle="Show guests what your place looks like!"
          />
        </div>
        <ImageUpload
          handleImage={(image: File) => setValue("image", image)}
          imageUploaded={selectedImage}
        />
      </div>
    );
  }

  if (step === Steps.describe) {
    body = (
      <div className="p-6 flex flex-col gap-6">
        <div>
          <Heading
            title="How would you describe your place ?"
            subtitle="Short and sweet works best!"
          />
        </div>
        <Input
          key="title"
          register={register}
          label="Title"
          id="title"
          type="text"
        />
        <hr />
        <Input
          key="description"
          register={register}
          label="Description"
          id="description"
          type="text"
        />
      </div>
    );
  }

  if (step === Steps.price) {
    body = (
      <div className="p-6 flex flex-col gap-6">
        <div>
          <Heading
            title="Now, set your price"
            subtitle="How much do you charge per night ?"
          />
        </div>
        <Input
          key="price"
          register={register}
          type="number"
          label="Price"
          id="price"
          formatPrice
        />
      </div>
    );
  }

  return (
    <Modal
      title={title}
      isOpen={createRentModal.isOpen}
      onClose={createRentModal.onClose}
      Body={body}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      actionLabel={actionLabel}
      secondaryAction={secondaryAction}
      secondaryActionLabel={secondaryActionLabel}
      error={errors.root?.message}
      onNext={onNext}
    />
  );
}
