'use client'

import { useState, useEffect } from 'react'

type Booking = {
  id: number
  guestName: string
  roomNumber: string
}

type BookingsData = {
  checkIns: Booking[]
  checkOuts: Booking[]
}

export function TodaysBookings() {
  const [bookings, setBookings] = useState<BookingsData>({ checkIns: [], checkOuts: [] })

  useEffect(() => {
    fetch('/api/bookings/today')
      .then(response => response.json())
      .then(data => setBookings(data))
      .catch(error => console.error('Error fetching today\'s bookings:', error))
  }, [])

  const handleAction = (id: number, action: 'checkIn' | 'checkOut') => {
    // In a real application, you would call an API to update the booking status
    console.log(`${action} action for booking ${id}`)
    
    setBookings(prev => ({
      checkIns: prev.checkIns.filter(booking => booking.id !== id),
      checkOuts: prev.checkOuts.filter(booking => booking.id !== id)
    }))
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Today's Bookings</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-medium mb-2">Check-ins</h4>
          <ul className="space-y-2">
            {bookings.checkIns.map(booking => (
              <li key={booking.id} className="flex items-center justify-between bg-gray-100 p-3 rounded">
                <div>
                  <p className="font-semibold">{booking.guestName}</p>
                  <p className="text-sm text-gray-600">Room {booking.roomNumber}</p>
                </div>
                <button
                  onClick={() => handleAction(booking.id, 'checkIn')}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Check-in
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-medium mb-2">Check-outs</h4>
          <ul className="space-y-2">
            {bookings.checkOuts.map(booking => (
              <li key={booking.id} className="flex items-center justify-between bg-gray-100 p-3 rounded">
                <div>
                  <p className="font-semibold">{booking.guestName}</p>
                  <p className="text-sm text-gray-600">Room {booking.roomNumber}</p>
                </div>
                <button
                  onClick={() => handleAction(booking.id, 'checkOut')}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Check-out
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

