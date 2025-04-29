import { BsSnow } from "react-icons/bs";
import { FaSkiing } from "react-icons/fa";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import CategoryBox from "./CategoryBox";
import Container from "./Container";

const navigationIcon = [
  { icon: TbBeach, label: "Beach" },
  { icon: GiWindmill, label: "Windmills" },
  { icon: MdOutlineVilla, label: "Modern" },
  { icon: TbMountain, label: "Mountain" },
  { icon: TbPool, label: "Pool" },
  { icon: GiIsland, label: "Island" },
  { icon: GiBoatFishing, label: "Lake" },
  { icon: FaSkiing, label: "Skiing" },
  { icon: GiCastle, label: "Castle" },
  { icon: GiCaveEntrance, label: "Cave" },
  { icon: GiForestCamp, label: "Camping" },
  { icon: BsSnow, label: "Arctic" },
  { icon: GiCactus, label: "Desert" },
  { icon: GiBarn, label: "Barns" },
  { icon: IoDiamond, label: "Lux" },
];
export default function Categories() {
  return (
    <Container>
      <div className="flex justify-between overflow-x-auto pt-3">
        {navigationIcon.map((Category, idx) => (
          <CategoryBox key={idx} icon={Category.icon} label={Category.label} />
        ))}
      </div>
    </Container>
  );
}

export { navigationIcon };
