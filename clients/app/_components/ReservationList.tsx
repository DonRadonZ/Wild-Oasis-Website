"use client";

import { useOptimistic } from "react";

import ReservationCard from "./ReservationCard";
import { deleteReservation } from "../_lib/actions";
import { Bookings } from "../_types";


export default function ReservationList({bookings}: {bookings: Bookings[]}) {
  const [optimisticBookings, optimisticDelete]  = useOptimistic(
    bookings, 
    (curBookings, bookingId: number) => {
        return curBookings.filter(booking => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId: number) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
                {optimisticBookings.map((booking: any) => (
                    <ReservationCard onDelete={handleDelete} booking= {booking} key={booking.id}/>
                ))}
            </ul>
  )
}
