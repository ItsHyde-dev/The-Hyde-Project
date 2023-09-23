export default function WidgetWrapper({ children, title }: any) {
  return (
    <div className="border-[1px] border-slate-700 rounded text-white py-5 px-5">
      <div className="flex flex-row justify-between">
        <span className="text-l font-light underline underline-offset-4 decoration-slate-700">
          {title}
        </span>
        <div>...</div>
      </div>
      <div className="py-5 px-5 text-l font-normal">
        {children}
      </div>
    </div>
  )
}
