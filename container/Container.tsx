import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";

interface ChildrenProps {
  children: React.ReactNode;
}

export default function Container({ children }: ChildrenProps) {
  return (
    <div className="flex items-center justify-between min-h-screen flex-col max-w-5xl border-r border-l mx-auto">
      <header className="w-full border-b">
        <Navbar />
      </header>
      <main className="flex-1 w-full flex items-center justify-center">
        {children}
      </main>
      <footer className="w-full border-t">
        <Footer />
      </footer>
    </div>
  );
}
