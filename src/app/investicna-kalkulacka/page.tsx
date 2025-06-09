import HeroSection from "../../components/HeroSection";
import InvesticnaKalkulackaCard from "../../components/InvesticnaKalkulackaCard";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function InvesticnaPage() {
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
        <InvesticnaKalkulackaCard />
      </div>
      <Footer />
    </main>
  );
}
