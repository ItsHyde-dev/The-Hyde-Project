export default function GhostInput(props: any) {

  const { placeholder, action } = props

  return (
    <input
      onBlur={action}
      onKeyDown={handleKeyDown}
      type="text"
      placeholder={placeholder}
      className="flex flex-row items-center
        w-full
        px-2 py-1
        border border-dashed border-slate-600 border-y-1 border-x-0
        focus:outline-none
        bg-transparent
        ">
    </input>
  )
}

export function handleKeyDown(e: any) {
  if (e.key !== "Enter") return;
  e.target.blur();
}

