import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface cabin {
    id?: string;
    name?: string; 
    maxCapacity?: number
    regularPrice?: number;
    discount?: number;
    image?: string;
}

export default function CabinCard({cabin}: cabin) {
    const { id, name, maxCapacity, regularPrice, discount, image } = cabin;


  return (
    <div className="flex border-primary-800 border">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          className="flex-1 border-r border-primary-800"
        />
    
    <div className="flex-grow">
        <div className="pt-5 pb-4 px-7 bg-primary-950">
            <h3 className="text-accent-500 font-semibold text-2xl mb-3">
                Cabin {name}
            </h3>
        </div>

        <div className="flex gap-3 items-center mb-2">
            <UsersIcon className="h-5 w-5 text-primary-600"/>
        </div>

    </div>
    </div>
  )
}
