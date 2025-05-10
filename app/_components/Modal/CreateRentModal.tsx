"use client";

import useCreateRentModal from "@/app/hooks/useCreateRentModal";
import Modal from "./Modal";
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
import { createListing } from "@/app/actions/listings";

export interface LocationType {
  value: string;
  label: string;
  flag: string;
  region: string;
  latlng: [number, number];
}

enum Steps {
  category = 0,
  location = 1,
  info = 2,
  image = 3,
  describe = 4,
  price = 5,
}

export default function CreateRentModal() {
  const router = useRouter();
  const createRentModal = useCreateRentModal();
  const [step, setStep] = useState(Steps.category);
  const [error, setError] = useState("");

  const [category, setCategory] = useState("");
  const [location, setLocation] = useState<LocationType>();
  const [image, setImage] = useState<File>();
  const [titleInput, setTitleInput] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("1");
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

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
    [location]
  );

  const actionLabel = step === Steps.price ? "Create" : "Next";
  const secondaryActionLabel = step !== Steps.category && "Back";

  async function clientAction() {
    // Validation
    if (step == Steps.category && !category) {
      setError("Please select category");
      return;
    }
    if (step == Steps.location && !location) {
      setError("Please select a place");
      return;
    }
    if (step == Steps.image && !image) {
      setError("Please provide an image");
      return;
    }
    setError("");

    // When we reach price we can now submit the data
    if (step !== Steps.price) {
      return onNext();
    }

    //I define here because of typescript, optimize later in case
    //we don't go the URL after fetching
    let imageSrc: string =
      "https://res.cloudinary.com/ducsubyd2/image/upload/v1746128002/iwmiinowal5japv6ohwb.png";
    const locationValue = location!.value;
    const formData = new FormData();

    // async function submitData() {
    //   // Image will never be undefined because of the above validaitons
    //   formData.append("file", image!);
    //   formData.append("upload_preset", "upload-post-preset");

    //   const res = await fetch(
    //     `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
    //     {
    //       method: "POST",
    //       body: formData,
    //     }
    //   );
    //   const data = await res.json();

    //   // handle this later in case error
    //   //set link of image
    //   imageSrc = data.secure_url;
    // }

    // await submitData();

    const data = {
      category,
      location: locationValue,
      imageSrc,
      titleInput,
      description,
      price,
      guestCount,
      roomCount,
      bathroomCount,
    };

    await createListing(data);
    router.refresh();
    createRentModal.onClose();
  }

  const onNext = () => {
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
            onClick={(label: string) => setCategory(label)}
            selected={category === item.label}
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

        <SelectCountry handleLocation={setLocation} location={location} />

        <Map markerPosition={location?.latlng} />
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
          title="Guests"
          subTitle="How many guests do you allow?"
          value={guestCount}
          handleCount={setGuestCount}
        />
        <hr />
        <Counter
          title="Rooms"
          subTitle="How many rooms do you have?"
          value={roomCount}
          handleCount={setRoomCount}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subTitle="How many bathrooms do you have?"
          value={bathroomCount}
          handleCount={setBathroomCount}
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
        <ImageUpload handleImage={setImage} imageUploaded={image} />
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
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          label="Title"
          id="title"
          required
        />
        <hr />
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
          id="description"
          required
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
          value={price}
          onChange={(e) => setPrice(e.target.value)}
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
      // Footer={footer}
      clientAction={clientAction}
      actionLabel={actionLabel}
      secondaryAction={secondaryAction}
      secondaryActionLabel={secondaryActionLabel}
      error={error}
    />
  );
}
