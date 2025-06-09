"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import CalculatorCard from "../components/CalculatorCard";
import Kalkulacka from "../components/Kalkulacka";

export default function Home() {
  const [pos, setPos] = useState({ left: 0, top: 0 });
  const direction = useRef({ x: 1, y: 1 });
  const speed = 3;
  const kalkWidth = 240;
  const kalkHeight = 330;

  // Animácia pohybu SVG kalkulačky
  useEffect(() => {
    function move() {
      setPos(prev => {
        let newLeft = prev.left + speed * direction.current.x;
        let newTop = prev.top + speed * direction.current.y;
        const winW = window.innerWidth;
        const winH = window.innerHeight;

        if (newLeft + kalkWidth > winW) {
          newLeft = winW - kalkWidth;
          direction.current.x = -1;
        }
        if (newTop + kalkHeight > winH) {
          newTop = winH - kalkHeight;
          direction.current.y = -1;
        }
        if (newLeft < 0) {
          newLeft = 0;
          direction.current.x = 1;
        }
        if (newTop < 0) {
          newTop = 0;
          direction.current.y = 1;
        }
        return { left: newLeft, top: newTop };
      });
    }
    const interval = setInterval(move, 16); // cca 60fps
    return () => clearInterval(interval);
  }, []);

  // Pri zmene veľkosti okna upraví pozíciu SVG kalkulačky
  useEffect(() => {
    function handleResize() {
      setPos(prev => {
        const winW = window.innerWidth;
        const winH = window.innerHeight;
        let left = prev.left;
        let top = prev.top;
        if (left + kalkWidth > winW) left = winW - kalkWidth;
        if (top + kalkHeight > winH) top = winH - kalkHeight;
        if (left < 0) left = 0;
        if (top < 0) top = 0;
        return { left, top };
      });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main
      className="relative flex flex-col items-center justify-center min-h-screen w-full"
      style={{
        backgroundImage: "url('images/hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Navbar />
      {/* SVG kalkulačka v pozadí */}
      <div
        className="pointer-events-none fixed top-0 left-0 w-screen h-screen z-0"
        style={{ overflow: "hidden" }}
        aria-hidden="true"
      >
        <Kalkulacka left={pos.left} top={pos.top} />
      </div>
      {/* Obsah */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <HeroSection />
        <CalculatorCard />
      </div>
      <Footer />
    </main>
  );
}


