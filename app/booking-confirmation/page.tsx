import Link from 'next/link'

export default function BookingConfirmationPage() {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Booking Confirmed</h1>
      <p className="mb-4">Thank you for your booking. We look forward to your stay!</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Return to Home
      </Link>
    </div>
  )
}

