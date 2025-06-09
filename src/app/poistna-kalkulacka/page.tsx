import HeroSection from "../../components/HeroSection";
import PoistnaKalkulackaCard from "../../components/PoistnaKalkulackaCard";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function PoistnaPage() {
  return (
    <main
      className="relative flex flex-col items-center justify-center min-h-screen w-full"
      style={{
        backgroundImage: "url('/images/hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Navbar />
      <div className="relative z-10 w-full flex flex-col items-center">
        <HeroSection />
        <PoistnaKalkulackaCard />
      </div>
      <Footer />
    </main>
  );
}
