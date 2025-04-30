"use client";

import useCreateRentModal from "@/app/hooks/useCreateRentModal";
import Modal from "./Modal";
import { navigationIcon } from "../Categories";
import { useMemo, useState } from "react";
import CategoryInput from "../CategoryInput";
import Heading from "../Heading";
import dynamic from "next/dynamic";
import SelectCountry from "../SelectCountry";
import Counter from "../Counter";
import ImageUpload from "../ImageUpload";
import Input from "../Input";

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
  const createRentModal = useCreateRentModal();
  const [step, setStep] = useState(Steps.category);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState<LocationType>();
  const [imageSrc, setImageSrc] = useState<File>();
  const [titleInput, setTitleInput] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("1");

  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [error, setError] = useState(false);

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function clientAction(formdata: FormData) {
    console.log("hi");
  }

  const onNext = () => {
    setStep((state) => state + 1);
  };
  const onBack = () => {
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
        <ImageUpload handleImage={setImageSrc} imageUploaded={imageSrc} />
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
          error={error}
        />
        <hr />
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
          id="description"
          error={error}
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
          error={error}
          formatPrice
        />
      </div>
    );
  }
  const footer = (
    <div className="p-6 pt-4 flex gap-2">
      {step !== Steps.category && (
        <button
          onClick={onBack}
          type="button"
          className=" w-full py-3 rounded-md border-2 border-black"
        >
          Back
        </button>
      )}
      <button
        onClick={() => {
          if (step !== Steps.price) {
            onNext();
          } else {
            // clientAction("24");
          }
        }}
        type="button"
        className="bg-primary w-full py-3 rounded-md"
      >
        Next
      </button>
    </div>
  );
  return (
    <Modal
      title={title}
      isOpen={createRentModal.isOpen}
      onClose={createRentModal.onClose}
      Body={body}
      Footer={footer}
      clientAction={clientAction}
    />
  );
}
