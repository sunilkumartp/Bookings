'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Room {
  id: number
  roomNumber: string
  adultsCapacity: number
  childrenCapacity: number
  basePrice: number
  amenities: string[]
}

export function RoomList() {
  const [rooms, setRooms] = useState<Room[]>([])

  useEffect(() => {
    fetch('/api/rooms')
      .then(response => response.json())
      .then(data => setRooms(data))
      .catch(error => console.error('Error fetching rooms:', error))
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {rooms.map(room => (
        <div key={room.id} className="border rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold">Room {room.roomNumber}</h2>
          <p>Capacity: {room.adultsCapacity} adults, {room.childrenCapacity} children</p>
          <p>Base Price: ${room.basePrice}</p>
          <p>Amenities: {room.amenities.join(', ')}</p>
          <Link href={`/rooms/${room.id}`} className="text-blue-500 hover:underline">
            Edit
          </Link>
        </div>
      ))}
    </div>
  )
}

