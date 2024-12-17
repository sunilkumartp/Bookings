'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Room {
  id: number
  roomNumber: string
  type: string
  price: number
}

export function BookingForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    guestName: '',
    checkInDate: '',
    checkOutDate: '',
    adults: 1,
    children: 0,
    roomId: '',
  })
  const [availableRooms, setAvailableRooms] = useState<Room[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (formData.checkInDate && formData.checkOutDate) {
      fetch(`/api/rooms/available?checkIn=${formData.checkInDate}&checkOut=${formData.checkOutDate}`)
        .then(response => response.json())
        .then(data => setAvailableRooms(data))
        .catch(error => console.error('Error fetching available rooms:', error))
    }
  }, [formData.checkInDate, formData.checkOutDate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (new Date(formData.checkOutDate) <= new Date(formData.checkInDate)) {
      setError('Check-out date must be after check-in date')
      return
    }

    if (!formData.roomId) {
      setError('Please select a room')
      return
    }

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        router.push('/booking-confirmation')
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'An error occurred while booking the room')
      }
    } catch (error) {
      setError('An error occurred while booking the room')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="guestName" className="block text-sm font-medium text-gray-700">Guest Name</label>
        <input
          type="text"
          id="guestName"
          name="guestName"
          value={formData.guestName}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700">Check-in Date</label>
        <input
          type="date"
          id="checkInDate"
          name="checkInDate"
          value={formData.checkInDate}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700">Check-out Date</label>
        <input
          type="date"
          id="checkOutDate"
          name="checkOutDate"
          value={formData.checkOutDate}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="adults" className="block text-sm font-medium text-gray-700">Number of Adults</label>
        <input
          type="number"
          id="adults"
          name="adults"
          value={formData.adults}
          onChange={handleChange}
          required
          min="1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="children" className="block text-sm font-medium text-gray-700">Number of Children</label>
        <input
          type="number"
          id="children"
          name="children"
          value={formData.children}
          onChange={handleChange}
          required
          min="0"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="roomId" className="block text-sm font-medium text-gray-700">Select Room</label>
        <select
          id="roomId"
          name="roomId"
          value={formData.roomId}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select a room</option>
          {availableRooms.map(room => (
            <option key={room.id} value={room.id}>
              Room {room.roomNumber} - {room.type} (${room.price}/night)
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Book Room
      </button>
    </form>
  )
}

