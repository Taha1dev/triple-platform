"use client"
import Link from "next/link"
import { useRouter } from "next/router"

const pages = [
  { name: "Home", path: "/" },
  { name: "Pro-Crew", path: "/pro-crew" },
  { name: "Talents", path: "/talents" },
  { name: "Operators", path: "/operators" },
  { name: "Logistics", path: "/logistics" },
  { name: "Props", path: "/props" },
  { name: "Agencies", path: "/agencies" },
  { name: "Locations", path: "/locations" },
]

export default function Navigation() {
  const router = useRouter()

  return (
    <nav className="bg-blue-600 p-4">
      <ul className="flex flex-wrap justify-center space-x-4">
        {pages.map((page) => (
          <li key={page.path}>
            <Link href={page.path}>
              <span className={`text-white hover:underline ${router.pathname === page.path ? "font-bold" : ""}`}>
                {page.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

