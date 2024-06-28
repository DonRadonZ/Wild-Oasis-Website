"use client";

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { DateRange } from "react-day-picker";

interface Range {
    from: Date | undefined;
    to?: Date | undefined;
}

interface ReservationContextType {
    range: DateRange | undefined;
    setRange: (d: DateRange | undefined) => void;
    resetRange: () => void;
}


const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

const initialState = { from: undefined, to: undefined };

function ReservationProvider({children}: {children: ReactNode}){
    const [range, setRange] = useState<DateRange | undefined>(initialState);
    const resetRange = () => setRange(initialState);

        return(
            <ReservationContext.Provider value={{range, setRange, resetRange}}>
                {children}
            </ReservationContext.Provider>
        )
}

function useReservation() {
    const context = useContext(ReservationContext);
    if(context === undefined) throw new Error("Context was used outside provider");
    return context;
}

export {ReservationProvider, useReservation}