"use server";

import { revalidatePath } from "next/cache";
import {auth ,signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function updateGuest(formData: FormData) {
    const session = await auth();
    if (!session) throw new Error("You must be logged in");
  
    const nationalID = z.string().min(6).max(12).regex(/^[a-zA-Z0-9]{6,12}$/,{message:"Please provide a valid national ID"}).parse(formData.get("nationalID"));

    const nationalityFormData = z.string().parse(formData.get("nationality"))

    const [nationality, countryFlag] = nationalityFormData.split("%");
  
    
  
    const updateData = { nationality, countryFlag, nationalID };
  
    const { error } = await supabase
      .from("guests")
      .update(updateData)
      .eq("id", session.user.guestId);
  
    if (error) throw new Error("Guest could not be updated");
  
    revalidatePath("/account/profile");
}

export async function updateReservation(formData: FormData) {

  
  const bookingId = Number(formData.get("bookingId"));

  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // 1) Authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);


  if (!guestBookingIds.includes(bookingId)) throw new Error("You are not allowed to update this booking");

  // 3) Building update data

  const observations = z.string().parse(formData.get("observations"))

  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: observations.slice(0, 1000)
  };

  // 4) Mutation
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  // 5) Error handling
  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }

  revalidatePath("/account/reservations");

  // 7) Redirecting
  redirect("/account/reservations");
}

export async function createReservation(bookingData:{
  startDate: Date | undefined;
  endDate: Date | undefined;
   numNights: number;
   cabinPrice: number;
   cabinId: number;
} ,formData: FormData
) {
    const session = await auth();
    if (!session) throw new Error("You must be logged in");

    const observations = formData.get("observations");

    const newBooking = {
        ...bookingData,
        guestId: session.user.guestId,
        numGuests: Number(formData.get("numGuests")),
        observations: observations?.slice(0, 1000),
        extrasPrice: 0,
        totalPrice: bookingData.cabinPrice,
        isPaid: false,
        hasBreakfast: false,
        status: "unconfirmed",
    };
    
    const { error } = await supabase
    .from("bookings").insert([newBooking]);
    
  if (error) {
    throw new Error('Booking could not be created');
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);
}

export async function deleteReservation(bookingId: number) {

    const session = await auth();
    if (!session) throw new Error("You must be logged in");
    
 const guestBookings = await getBookings(session.user.guestId);

 const guestBookingIds = guestBookings.map((booking) => booking.id);

 if(!guestBookingIds.includes(bookingId)) throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase.from('bookings').delete().eq('id', bookingId);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }

  revalidatePath("/account/reservations");

  redirect("/cabins/thankyou");
}

export async function signInAction() {
    await signIn("google", {redirectTo: "/account"});
}

export async function signOutAction() {
    await signOut({redirectTo:"/"});
}