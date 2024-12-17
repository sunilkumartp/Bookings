import { NextResponse } from 'next/server'

// This is a mock database. In a real application, you would use a proper database.
const bookings = [
  { id: 1, guestName: 'John Doe', roomNumber: '101', checkInDate: '2023-06-01', checkOutDate: '2023-06-05', status: 'upcoming' },
  { id: 2, guestName: 'Jane Smith', roomNumber: '202', checkInDate: '2023-05-28', checkOutDate: '2023-06-02', status: 'active' },
  { id: 3, guestName: 'Bob Johnson', roomNumber: '303', checkInDate: '2023-05-25', checkOutDate: '2023-05-30', status: 'completed' },
  { id: 4, guestName: 'Alice Brown', roomNumber: '404', checkInDate: '2023-06-10', checkOutDate: '2023-06-15', status: 'upcoming' },
  { id: 5, guestName: 'Charlie Davis', roomNumber: '505', checkInDate: '2023-05-29', checkOutDate: '2023-06-03', status: 'active' },
]

const totalRooms = 10 // Assuming we have 10 rooms in total

export async function GET() {
  const today = new Date()
  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    return date.toISOString().split('T')[0]
  })

  const occupancyData = next7Days.map(date => {
    const occupiedRooms = bookings.filter(booking => {
      const checkIn = new Date(booking.checkInDate)
      const checkOut = new Date(booking.checkOutDate)
      const currentDate = new Date(date)
      return checkIn <= currentDate && checkOut > currentDate
    }).length

    const occupancyRate = (occupiedRooms / totalRooms) * 100

    return {
      date,
      occupancy: Math.round(occupancyRate)
    }
  })

  return NextResponse.json(occupancyData)
}

