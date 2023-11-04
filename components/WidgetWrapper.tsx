export default function WidgetWrapper({ children, title }: any) {

  const openWidgetActions = () => {

  }

  return (
    <div className="border-[1px] border-slate-700 rounded text-white py-5 px-5 flex flex-col h-full overflow-hidden">
      <div className="flex flex-row justify-between">
        <span className="text-l font-light underline underline-offset-4 decoration-slate-700">
          {title}
        </span>
        <button
          className="rounded-full"
          onClick={openWidgetActions}
        >...</button>
      </div>
      <div className="py-5 px-5 text-l font-normal flex flex-col h-full">
        {children}
      </div>
    </div>
  )
}
