import React from "react";
import { ToastProvider } from "./context/ToastContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WorkoutLibrary from "./components/WorkoutLibrary";
import Dashboard from "./components/Dashboard";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

export default function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-carbon text-bone">
        <Navbar />
        <main>
          <Hero />
          <WorkoutLibrary />
          <Dashboard />
          <Pricing />
          <Testimonials />
          <Contact />
          <Newsletter />
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
}
