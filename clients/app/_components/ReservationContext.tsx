"use client";

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface Range {
    from?: Date | undefined;
    to?: Date | undefined;
}

interface ReservationContextType {
    range: Range;
    setRange: Dispatch<SetStateAction<Range>>;
    resetRange: () => void;
}


const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

const initialState = { from: undefined, to: undefined };

function ReservationProvider({children}: {children: ReactNode}){
    const [range, setRange] = useState<Range>(initialState);
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