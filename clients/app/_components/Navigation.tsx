import Link from 'next/link';
import {auth} from "../_lib/auth";
import Image from 'next/image';

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className='z-10 text-xl'>
      <ul className="flex gap-16 items-center">     
        <li>
          <Link href="/cabins" className="hover:text-accent-400 transition-colors">Cabins</Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-accent-400 transition-colors">About</Link>
        </li>
        <li>
          {session?.user?.image && session.user.name ? (
            <Link href="/account" className="hover:text-accent-400 transition-colors flex items-center gap-4">
              <div className="relative h-8 w-8">
              <Image
              fill 
              className="rounded-full" 
              src={session.user.image} 
              alt={session.user.name}
              referrerPolicy="no-referrer"
              />
              </div>
              <span>Guest area</span>
              </Link>
            ) : (
            <Link href="/account" className="hover:text-accent-400 transition-colors">
              Guest area
              </Link>
            )}
        </li>
      </ul>
    </nav>
  )
}
