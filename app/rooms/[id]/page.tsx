import { RoomForm } from '@/components/RoomForm'

export default function EditRoomPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Room</h1>
      <RoomForm roomId={parseInt(params.id)} />
    </div>
  )
}

