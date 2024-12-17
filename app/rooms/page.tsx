import Link from 'next/link'
import { RoomList } from '@/components/RoomList'

export default function RoomsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Rooms</h1>
        <Link href="/rooms/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add New Room
        </Link>
      </div>
      <RoomList />
    </div>
  )
}

