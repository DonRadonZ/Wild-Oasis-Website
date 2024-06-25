import { unstable_noStore as noStore } from "next/cache";

import CabinCard from "../_components/CabinCard";
import { getCabins } from "../_lib/data-service";


interface CabinListProps {
  filter: "all" |"small" | "medium" | "large"
}

export default async function CabinList({filter}: CabinListProps) {
    // noStore();

    const cabins = await getCabins();

    if(!cabins.length){
        return null;
    }

    let displayedCabins: {
      id: string;
      name: string;
      maxCapacity: number;
      regularPrice: number;
      discount: number;
      image: string;
  }[] = [];
  if (filter === "all") {
    displayedCabins = cabins;
  } else if (filter === "small") {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  } else if (filter === "medium") {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7);
  } else if (filter === "large") {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
  }

    // switch(filter) {
    //   case "all":
    //     displayedCabins = cabins;
    // }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
            {displayedCabins.map((cabin) => (
              <CabinCard cabin={cabin} key={cabin.id} />
            ))}
          </div>
  )
}
