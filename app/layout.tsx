import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Bookings Application',
  description: 'Hotel room management and booking services',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Bookings Application</h1>
            <nav>
              <ul className="flex space-x-4">
                <li><Link href="/" className="hover:underline">Home</Link></li>
                <li><Link href="/rooms" className="hover:underline">Rooms</Link></li>
                <li><Link href="/bookings" className="hover:underline">Bookings</Link></li>
                <li><Link href="/book" className="hover:underline">Book a Room</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="container mx-auto p-4">
          {children}
        </main>
        <footer className="bg-gray-200 p-4 text-center">
          <p>&copy; 2023 Bookings Application. All rights reserved.</p>
        </footer>
      </body>
    </html>
  )
}

