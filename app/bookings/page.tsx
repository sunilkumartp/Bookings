import { BookingsList } from '@/components/BookingsList'

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">All Bookings</h1>
      <BookingsList />
    </div>
  )
}

