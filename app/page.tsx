import { TodaysBookings } from '@/components/TodaysBookings'
import { OccupancyChart } from '@/components/OccupancyChart'

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="bg-blue-100 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Welcome to the Bookings Application</h2>
        <p>Manage your hotel rooms and bookings efficiently.</p>
      </section>
      
      <TodaysBookings />
      
      <OccupancyChart />
    </div>
  )
}

