import HomepageWidgets from "@/components/homepage-widgets";
import NavBar from "@/components/navbar";

export default function Home() {
  return <div className="flex flex-col min-h-screen bg-gray-800 text-white">
    <NavBar currentFocus="Home"/>

    <HomepageWidgets />

  </div>;
}
