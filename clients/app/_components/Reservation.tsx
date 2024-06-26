import React from 'react'
import DateSelector from './DateSelector'
import ReservationForm from './ReservationForm'
import { getBookedDatesByCabinId, getCabin, getSettings } from '../_lib/data-service'

async function Reservation({cabin}: any) {
    const [settings, bookedDates] = await Promise.all([ 
        await getSettings(),
        getBookedDatesByCabinId(cabin.id)
      ])

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
            <DateSelector 
            settings={settings} 
            bookedDates={bookedDates} 
            cabin={cabin}/>
            <ReservationForm cabin={cabin} />
          </div>
  )
}

export default Reservation
