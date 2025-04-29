"use client";

import useCreateRentModal from "@/app/hooks/useCreateRentModal";
import Modal from "./Modal";
import { navigationIcon } from "../Categories";
import { useMemo, useState } from "react";
import CategoryInput from "../CategoryInput";
import Heading from "../Heading";
import dynamic from "next/dynamic";
import SelectCountry from "../SelectCountry";

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
}
export default function CreateRentModal() {
  const createRentModal = useCreateRentModal();
  const [step, setStep] = useState(Steps.category);
  const [category, setCategory] = useState("");
  const [location, setlocation] = useState<LocationType>();

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

        <SelectCountry handleLocation={setlocation} />

        <Map markerPosition={location?.latlng} />
      </div>
    );
  }

  const footer = (
    <div className="p-6 pt-4 flex gap-2">
      {step !== Steps.category && (
        <button
          onClick={onBack}
          type="button"
          className=" w-full py-3 rounded-md border border-black"
        >
          Back
        </button>
      )}
      <button
        onClick={onNext}
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
