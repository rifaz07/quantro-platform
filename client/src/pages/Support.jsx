import React from 'react'
import PublicNavbar from "../components/layout/PublicNavbar";
import PublicFooter from "../components/layout/PublicFooter";

export default function Support() {
  return (
      <>
        <PublicNavbar />
        <div className="max-w-6xl mx-auto py-20 px-6">
          <h1 className="text-4xl font-bold">About Fintech Loop</h1>
        </div>
        <PublicFooter />
      </>
    );
}
