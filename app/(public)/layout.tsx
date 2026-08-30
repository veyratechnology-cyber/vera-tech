import React from "react";
import Navigation from "@/components/public/Navigation";
import Footer from "@/components/public/Footer";

/**
 * Public Website Layout
 * Wraps all public pages with navigation and footer
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        {children}
      </main>
      <Footer />
    </>
  );
}
