import Container from "@/app/_components/Container";
import UserLogo from "@/app/_components/userLogo";
import getListingById from "@/app/actions/getListingById";
import { getReservations } from "@/app/actions/reservation";
import getCountries from "@/libs/countries";
import { eachDayOfInterval } from "date-fns";
import Image from "next/image";
import IconSection from "../IconSection";
import MapClient from "../MapClient";
import ReservationSection from "../ReservationSection";
import HeartIcon from "@/app/_components/HeartIcon";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface PropsType {
  params: {
    listingId: string;
  };
  searchParams: {
    [key: string]: string;
  };
}

export default async function Page({ params }: PropsType) {
  const { listingId } = params;

  const data = await getListingById(listingId);
  const reservation = await getReservations(listingId);
  const author = data?.user;
  const currentUser = await getCurrentUser();

  let disabledDates: Date[] = [];

  reservation.forEach((el) => {
    const dates = eachDayOfInterval({
      start: el.startDate,
      end: el.endDate,
    });
    disabledDates = [...disabledDates, ...dates];
  });

  if (!data) {
    return;
  }
  const { getByValue } = getCountries();
  const location = getByValue(data.location);
  const price = Number(data.price);

  return (
    //here I used the container component to respect the different
    //paddings on reponsive
    <Container>
      <div className="mt-28 max-w-5xl mx-auto relative mb-24">
        <h3 className="font-bold text-2xl mb-2">Funhouse</h3>
        <p className="font-light text-neutral-500 mb-6">
          {location?.region}, {location?.label}
        </p>
        <div className="w-full relative h-[60vh] rounded-xl overflow-hidden mb-10">
          <Image
            alt="listing image"
            fill
            src={data.imageSrc}
            className="object-cover "
          />
          <HeartIcon user={currentUser} listing_Id={listingId} />
        </div>

        <div className="grid md:grid-cols-7 gap-10">
          <div className="md:col-span-4">
            <div className="flex gap-1 items-center">
              <div className="text-lg font-semibold">
                Hosted by {author?.name}
              </div>
              <div>
                <UserLogo />
              </div>
            </div>
            <div className="flex gap-2 text-neutral-500 font-light mb-6">
              <p>
                {data.guestCount} {data.guestCount > 1 ? "guests" : "guest"}
              </p>
              <p>
                {data.roomCount} {data.roomCount > 1 ? "rooms" : "room"}
              </p>
              <p>
                {data.bathroomCount}{" "}
                {data.bathroomCount > 1 ? "bathrooms" : "bathroom"}
              </p>
            </div>
            <hr className="mb-6" />

            <div className="flex gap-2 items-center mb-6">
              <IconSection iconLabel={data.category} />
            </div>
            <hr className="mb-6" />
            <p className="text-lg font-light text-neutral-500 mb-6">
              {data.description}
            </p>
            <hr className="mb-6" />
            <MapClient locationValue={data.location} />
          </div>
          <div className="order-first md:order-2 md:col-span-3 border border-neutral-200 rounded-xl overflow-hidden">
            <ReservationSection
              disabledDates={disabledDates}
              price={price}
              listingId={listingId}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
