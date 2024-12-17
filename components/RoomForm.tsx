'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface RoomFormProps {
  roomId?: number
}

interface Room {
  id?: number
  roomNumber: string
  adultsCapacity: number
  childrenCapacity: number
  basePrice: number
  amenities: string[]
}

const initialRoom: Room = {
  roomNumber: '',
  adultsCapacity: 1,
  childrenCapacity: 0,
  basePrice: 0,
  amenities: []
}

export function RoomForm({ roomId }: RoomFormProps) {
  const [room, setRoom] = useState<Room>(initialRoom)
  const router = useRouter()

  useEffect(() => {
    if (roomId) {
      fetch(`/api/rooms/${roomId}`)
        .then(response => response.json())
        .then(data => setRoom(data))
        .catch(error => console.error('Error fetching room:', error))
    }
  }, [roomId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRoom(prev => ({ ...prev, [name]: value }))
  }

  const handleAmenitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target
    setRoom(prev => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, value]
        : prev.amenities.filter(amenity => amenity !== value)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = roomId ? `/api/rooms/${roomId}` : '/api/rooms'
    const method = roomId ? 'PUT' : 'POST'

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(room)
      })

      if (response.ok) {
        router.push('/rooms')
      } else {
        console.error('Error saving room:', await response.text())
      }
    } catch (error) {
      console.error('Error saving room:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700">Room Number</label>
        <input
          type="text"
          id="roomNumber"
          name="roomNumber"
          value={room.roomNumber}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="adultsCapacity" className="block text-sm font-medium text-gray-700">Adults Capacity</label>
        <input
          type="number"
          id="adultsCapacity"
          name="adultsCapacity"
          value={room.adultsCapacity}
          onChange={handleChange}
          required
          min="1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="childrenCapacity" className="block text-sm font-medium text-gray-700">Children Capacity</label>
        <input
          type="number"
          id="childrenCapacity"
          name="childrenCapacity"
          value={room.childrenCapacity}
          onChange={handleChange}
          required
          min="0"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="basePrice" className="block text-sm font-medium text-gray-700">Base Price</label>
        <input
          type="number"
          id="basePrice"
          name="basePrice"
          value={room.basePrice}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <span className="block text-sm font-medium text-gray-700">Amenities</span>
        {['TV', 'Crib', 'Air Conditioning', 'Mini Bar'].map(amenity => (
          <div key={amenity} className="flex items-center">
            <input
              type="checkbox"
              id={amenity}
              name="amenities"
              value={amenity}
              checked={room.amenities.includes(amenity)}
              onChange={handleAmenitiesChange}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <label htmlFor={amenity} className="ml-2 block text-sm text-gray-900">
              {amenity}
            </label>
          </div>
        ))}
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        {roomId ? 'Update Room' : 'Add Room'}
      </button>
    </form>
  )
}

