"use client"

export function AddWidgetButton(setIsOpen: any) {
  return (
    <div
      className="bg-blue-500 hover:bg-blue-700
        text-white font-bold
        py-2 px-4 rounded-full
        w-[130px] flex justify-center
        cursor-pointer"
      onClick={() => setIsOpen(true)}
    >
      {" "}
      Add widget{" "}
    </div>
  );
}

