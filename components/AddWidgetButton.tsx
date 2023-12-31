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
        w-[130px] flex justify-center
        cursor-pointer"
      onClick={() => setIsOpen(true)}
    >
      Add Widget
    </div>
  );
}


