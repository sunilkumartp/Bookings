import { NextResponse } from 'next/server'

// Mock data for rooms (this should match the data in the available rooms API)
const rooms = [
  { id: 1, roomNumber: '101', type: 'Standard', price: 100 },
  { id: 2, roomNumber: '102', type: 'Standard', price: 100 },
  { id: 3, roomNumber: '201', type: 'Deluxe', price: 150 },
  { id: 4, roomNumber: '202', type: 'Deluxe', price: 150 },
  { id: 5, roomNumber: '301', type: 'Suite', price: 200 },
]

// Mock data for bookings (this should match the data in the available rooms API)
let bookings = [
  { id: 1, roomId: 1, checkInDate: '2023-06-01', checkOutDate: '2023-06-05' },
  { id: 2, roomId: 3, checkInDate: '2023-06-02', checkOutDate: '2023-06-07' },
]

export async function GET() {
  return NextResponse.json(bookings)
}

export async function POST(request: Request) {
  const booking = await request.json()

  // Validate the booking
  if (!booking.guestName || !booking.checkInDate || !booking.checkOutDate || !booking.roomId) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
  }

  // Check if the room is available
  const conflictingBooking = bookings.find(b => 
    b.roomId === parseInt(booking.roomId) &&
    new Date(b.checkOutDate) > new Date(booking.checkInDate) &&
    new Date(b.checkInDate) < new Date(booking.checkOutDate)
  )

  if (conflictingBooking) {
    return NextResponse.json({ message: 'This room is not available for the selected dates' }, { status: 400 })
  }

  // Create the new booking
  const newBooking = {
    id: bookings.length + 1,
    roomId: parseInt(booking.roomId),
    guestName: booking.guestName,
    checkInDate: booking.checkInDate,
    checkOutDate: booking.checkOutDate,
    adults: booking.adults,
    children: booking.children
  }

  // In a real application, you would save this booking to a database
  bookings.push(newBooking)

  return NextResponse.json({ message: 'Booking successful', booking: newBooking }, { status: 201 })
}

