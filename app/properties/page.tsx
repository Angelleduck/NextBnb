import { redirect } from "next/navigation";
import Container from "../_components/Container";
import getCurrentUser from "../actions/getCurrentUser";
import { getProperties } from "../actions/listings";
import PropertyCard from "../_components/PropertyCard";

export default async function page() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/");
  }

  const properties = await getProperties();
  return (
    <Container>
      <div className="mt-28 mb-24">
        <h3 className="text-2xl font-bold mb-1">Properties</h3>
        <p className="font-light text-neutral-500 mb-8">
          List of your properties
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-7">
          {properties?.map((property, idx) => (
            <PropertyCard
              key={idx}
              user={currentUser}
              listing={property}
              propertyId={property.id}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
