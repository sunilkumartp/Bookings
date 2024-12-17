import { NextResponse } from 'next/server'

// This is a mock database. In a real application, you would use a proper database.
const bookings = [
  { id: 1, guestName: 'John Doe', roomNumber: '101', status: 'checkIn' },
  { id: 2, guestName: 'Jane Smith', roomNumber: '202', status: 'checkOut' },
  { id: 3, guestName: 'Bob Johnson', roomNumber: '303', status: 'checkIn' },
  { id: 4, guestName: 'Alice Brown', roomNumber: '404', status: 'checkOut' },
  { id: 5, guestName: 'Charlie Davis', roomNumber: '505', status: 'checkIn' },
]

export async function GET() {
  const checkIns = bookings.filter(booking => booking.status === 'checkIn')
  const checkOuts = bookings.filter(booking => booking.status === 'checkOut')

  return NextResponse.json({ checkIns, checkOuts })
}

