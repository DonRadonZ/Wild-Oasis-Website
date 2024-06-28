export interface CabinType {
    id: number;
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description?: string;
    image: string;
}

export type Cabins = {
    id: number | string;
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    image: string;
}

export interface Bookings {
    id: number;
    created_at: string;
    startDate: string;
    endDate: string;
    numGuests: number;
    numNights: number;
    totalPrice: number;
    cabinId: number;
    guestId: number;
    cabins: {
        name: string;
        image: string;
    }[]
}

export interface Guest {
    fullName: string;
    email: string;
    nationality: string;
    nationalID: number;
    countryFlag: string;
}

export interface ParamsProps {
    params: { id: string };
}

export interface SettingsType {
    id: number;
    minBookingLength: number;
    maxBookingLength: number;
    maxGuestPerBooking: number;
    breakfastPrice: number;
}

export interface DateRangeType {
    from: Date | undefined;
    to?: Date | undefined;
}