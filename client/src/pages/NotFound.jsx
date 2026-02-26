import React from 'react'
import PublicNavbar from "../components/layout/PublicNavbar";
import PublicFooter from "../components/layout/PublicFooter";
export default function NotFound() {
  return (
    <>
      <PublicNavbar />
      <div className="max-w-6xl mx-auto py-20 px-6">
        <h1 className="text-4xl font-bold">Page Not Found</h1>
        <p className="text-gray-600">The page you are looking for does not exist.</p>
      </div>
      <PublicFooter />
    </>
  )
}
