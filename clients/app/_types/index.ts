export interface CabinType {
    id: number;
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description?: string;
    image: string;
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