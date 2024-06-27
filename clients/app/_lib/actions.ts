"use server";

import { revalidatePath } from "next/cache";
import {auth ,signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateGuest(formData) {
    const session = await auth();
    if (!session) throw new Error("You must be logged in");
  
    const nationalID = formData.get("nationalID");
    const [nationality, countryFlag] = formData.get("nationality").split("%");
  
    if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
      throw new Error("Please provide a valid national ID");
  
    const updateData = { nationality, countryFlag, nationalID };
  
    const { error } = await supabase
      .from("guests")
      .update(updateData)
      .eq("id", session.user.guestId);
  
    if (error) throw new Error("Guest could not be updated");
  
    revalidatePath("/account/profile");
}

export async function updateReservation(formData) {
  const bookingId = formData.get("bookingId");

  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // 1) Authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  // Logging for debugging
  console.log("Session User Guest ID:", session.user.guestId);
  console.log("Booking ID from formData:", bookingId);
  console.log("Guest Booking IDs:", guestBookingIds);

  if (!guestBookingIds.includes(bookingId)) throw new Error("You are not allowed to update this booking");

  // 3) Building update data
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000)
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

export async function deleteReservation(bookingId) {
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
}

export async function signInAction() {
    await signIn("google", {redirectTo: "/account"});
}

export async function signOutAction() {
    await signOut({redirectTo:"/"});
}