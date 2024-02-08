"use client"

export function AddWidgetButton({ setIsOpen }: any) {

  return (
    <div
      className="
        transition-colors
        duration-150
        bg-blue-500
        hover:bg-blue-700
        text-white
        text-sm
        font-normal
        py-2 px-4 rounded-full
        w-[4rem] flex justify-center
        mx-4
        cursor-pointer"
      onClick={() => setIsOpen(true)}
    >
      Add
    </div>
  );
}


