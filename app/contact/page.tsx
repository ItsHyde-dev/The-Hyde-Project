import NavBar from "@/components/navbar"

export default function Contact() {
  return <div className="flex h-screen flex-col bg-gray-800">
    <NavBar currentFocus="Contact" />
    <ContactPageBody />
  </div>
}

function ContactPageBody() {
  return (
    <main className="flex flex-col px-5 py-5 text-2xl font-semibold text-white">
      <div>Hello Visitor! </div>
      <div className="text-xl font-normal">
        You can contact me at:
      </div>
    </main>
  )
}
