import HeroHomepage from "@/components/hero-homepage";
import NavBar from "@/components/navbar";

export default function Home() {
  return <div className="flex flex-col h-screen bg-gray-800 text-white">
    <NavBar currentFocus="Home"/>

    <HeroHomepage />

  </div>;
}
