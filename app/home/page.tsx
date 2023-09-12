import NavBar from "@/components/navbar";

export default function Home() {
  return <div className="flex flex-col h-screen bg-gray-800">
    <NavBar currentFocus="Home"/>

    <div className="grid grid-cols-2 gap-2 p-10">
      <div className="border-[1px] border-slate-700 rounded text-white p-4">Home</div>
      <div className="border-[1px] border-slate-700 rounded text-white p-4">Home</div>
      <div className="col-span-2 border-[1px] border-slate-700 rounded text-white p-4">Home</div>
    </div>
  </div>;
}
