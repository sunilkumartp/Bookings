import { NextResponse } from 'next/server'

// This is a mock database. In a real application, you would use a proper database.
let rooms = [
  { id: 1, roomNumber: '101', adultsCapacity: 2, childrenCapacity: 1, basePrice: 100, amenities: ['TV', 'Air Conditioning'] },
  { id: 2, roomNumber: '102', adultsCapacity: 2, childrenCapacity: 0, basePrice: 90, amenities: ['TV'] },
]

export async function GET() {
  return NextResponse.json(rooms)
}

export async function POST(request: Request) {
  const room = await request.json()
  room.id = rooms.length + 1
  rooms.push(room)
  return NextResponse.json(room, { status: 201 })
}

