import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <header className="bg-black  text-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">

        <Link href="/" className="text-2xl font-bold tracking-tight text-white hover:text-gray-300 transition">
          Evento
        </Link>

        <ul className="flex items-center gap-6">
          <li><Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition">Home</Link></li>
          <li><Link href="/events" className="text-sm font-medium text-gray-300 hover:text-white transition">Events</Link></li>
          {/* <li>
            <Link href="/create-event" className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200 transition">
              Create Event
            </Link>
          </li> */}
        </ul>

      </nav>
    </header>
  )
}

export default Navbar