import { NextResponse } from 'next/server'

// Mock data for rooms and bookings
const rooms = [
  { id: 1, roomNumber: '101', type: 'Standard', price: 100 },
  { id: 2, roomNumber: '102', type: 'Standard', price: 100 },
  { id: 3, roomNumber: '201', type: 'Deluxe', price: 150 },
  { id: 4, roomNumber: '202', type: 'Deluxe', price: 150 },
  { id: 5, roomNumber: '301', type: 'Suite', price: 200 },
]

const bookings = [
  { id: 1, roomId: 1, checkInDate: '2023-06-01', checkOutDate: '2023-06-05' },
  { id: 2, roomId: 3, checkInDate: '2023-06-02', checkOutDate: '2023-06-07' },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const checkInDate = searchParams.get('checkIn')
  const checkOutDate = searchParams.get('checkOut')

  if (!checkInDate || !checkOutDate) {
    return NextResponse.json({ error: 'Check-in and check-out dates are required' }, { status: 400 })
  }

  const availableRooms = rooms.filter(room => {
    const conflictingBooking = bookings.find(booking => 
      booking.roomId === room.id &&
      new Date(booking.checkOutDate) > new Date(checkInDate) &&
      new Date(booking.checkInDate) < new Date(checkOutDate)
    )
    return !conflictingBooking
  })

  return NextResponse.json(availableRooms)
}

