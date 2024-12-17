'use client'

import { useState, useEffect } from 'react'

interface Booking {
  id: number
  guestName: string
  roomNumber: string
  checkInDate: string
  checkOutDate: string
  status: string
}

export function BookingsList() {
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    fetch('/api/bookings')
      .then(response => response.json())
      .then(data => setBookings(data))
      .catch(error => console.error('Error fetching bookings:', error))
  }, [])

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">Guest Name</th>
            <th className="py-2 px-4 text-left">Room Number</th>
            <th className="py-2 px-4 text-left">Check-in Date</th>
            <th className="py-2 px-4 text-left">Check-out Date</th>
            <th className="py-2 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.id} className="border-b">
              <td className="py-2 px-4">{booking.guestName}</td>
              <td className="py-2 px-4">{booking.roomNumber}</td>
              <td className="py-2 px-4">{booking.checkInDate}</td>
              <td className="py-2 px-4">{booking.checkOutDate}</td>
              <td className="py-2 px-4">
                <span className={`px-2 py-1 rounded text-sm ${
                  booking.status === 'upcoming' ? 'bg-yellow-200 text-yellow-800' :
                  booking.status === 'active' ? 'bg-green-200 text-green-800' :
                  'bg-gray-200 text-gray-800'
                }`}>
                  {booking.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

