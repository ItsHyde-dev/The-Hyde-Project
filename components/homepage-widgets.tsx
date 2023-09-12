import GraphProvider from "@/providers/graphProvider";
import Tile1 from "./tile1";
import Tile2 from "./tile2";

export default function HomepageWidgets() {
  return <div className="flex flex-col p-10">
    <div className="text-2xl font-semibold py-5">Hello User</div>
    <div className="grid grid-cols-2 gap-2">
      <GraphProvider>
        <Tile1 />
        <Tile2 />
        <div className="col-span-2 border-[1px] border-slate-700 rounded text-white p-4">Home</div>
      </GraphProvider>
    </div>
  </div>
}

