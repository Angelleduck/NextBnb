"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import SelectCountry from "../Input/SelectCountry";
import Counter from "../Input/Counter";
import Heading from "../Heading";
import { SubmitHandler, useForm } from "react-hook-form";
import type z from "zod";
import { filterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFilterModal } from "@/app/hooks/useFilterModal";
import Modal from "./rent/Modal";

enum STEPS {
  LOCATION = 0,
  INFO = 1,
}

type InputField = z.infer<typeof filterSchema>;
export default function FilterModal() {
  const router = useRouter();
  const filterModal = useFilterModal();
  const [step, setStep] = useState(STEPS.LOCATION);

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm<InputField>({
    resolver: zodResolver(filterSchema),
    shouldUnregister: false,
    defaultValues: {
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
    },
  });

  //we need watch to observe since getValues doesn't re-render when values change
  const selectedLocation = watch("location");
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

  const actionLabel = step === STEPS.INFO ? "Search" : "Next";
  const secondaryActionLabel = step !== STEPS.LOCATION && "Back";

  const onSubmit: SubmitHandler<InputField> = async (data) => {
    const url = `?bathroomCount=${data.bathroomCount}&roomCount=${data.roomCount}&guestroomCount=${data.guestCount}${data.location ? `&location=${data.location.value}` : ""}`;
    router.push(url);
    filterModal.onClose();
    reset();
    setStep(STEPS.LOCATION);
  };

  const onNext = async () => {
    if (step === STEPS.INFO) {
      await handleSubmit(onSubmit)();
    }
    setStep((state) => state + 1);
  };
  const secondaryAction = () => {
    setStep((state) => state - 1);
  };

  let body = (
    <div className="p-6 flex flex-col gap-6">
      <div>
        <Heading
          title="Where do you wanna go ?"
          subtitle="Find the perfect location!"
        />
      </div>

      <SelectCountry
        handleLocation={(location) => setValue("location", location)}
        location={selectedLocation}
      />

      <Map markerPosition={selectedLocation?.latlng} />
    </div>
  );

  if (step === STEPS.INFO) {
    body = (
      <div className="p-6 flex flex-col gap-8">
        <div>
          <Heading
            title="More information"
            subtitle="Find your perfect place!"
          />
        </div>
        <Counter
          key="Guests"
          title="Guests"
          subTitle="How many guests are coming ?"
          value={selectedGuestCount}
          handleCount={(value) => setValue("guestCount", value)}
        />
        <hr />
        <Counter
          key="Rooms"
          title="Rooms"
          subTitle="How many rooms do you need ?"
          value={selectedRoomCount}
          handleCount={(value) => setValue("roomCount", value)}
        />
        <hr />
        <Counter
          key="Bathrooms"
          title="Bathrooms"
          subTitle="How many bahtrooms do you need ?"
          value={selectedBathroomCount}
          handleCount={(value) => setValue("bathroomCount", value)}
        />
      </div>
    );
  }

  return (
    <Modal
      title="Filters"
      isOpen={filterModal.isOpen}
      onClose={filterModal.onClose}
      Body={body}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      actionLabel={actionLabel}
      secondaryAction={secondaryAction}
      secondaryActionLabel={secondaryActionLabel}
      onNext={onNext}
    />
  );
}
