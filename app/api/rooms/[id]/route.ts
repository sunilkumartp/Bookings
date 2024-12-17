import { NextResponse } from 'next/server'

// This is a mock database. In a real application, you would use a proper database.
let rooms = [
  { id: 1, roomNumber: '101', adultsCapacity: 2, childrenCapacity: 1, basePrice: 100, amenities: ['TV', 'Air Conditioning'] },
  { id: 2, roomNumber: '102', adultsCapacity: 2, childrenCapacity: 0, basePrice: 90, amenities: ['TV'] },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const room = rooms.find(r => r.id === parseInt(params.id))
  if (room) {
    return NextResponse.json(room)
  } else {
    return NextResponse.json({ error: 'Room not found' }, { status: 404 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const updatedRoom = await request.json()
  const index = rooms.findIndex(r => r.id === parseInt(params.id))
  if (index !== -1) {
    rooms[index] = { ...rooms[index], ...updatedRoom }
    return NextResponse.json(rooms[index])
  } else {
    return NextResponse.json({ error: 'Room not found' }, { status: 404 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const index = rooms.findIndex(r => r.id === parseInt(params.id))
  if (index !== -1) {
    rooms.splice(index, 1)
    return NextResponse.json({ message: 'Room deleted successfully' })
  } else {
    return NextResponse.json({ error: 'Room not found' }, { status: 404 })
  }
}

