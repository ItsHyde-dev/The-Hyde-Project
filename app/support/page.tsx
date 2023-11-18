import NavBar from "@/components/navbar";
import { GlobeAltIcon } from "@heroicons/react/24/outline";

export default function SupportPage() {

  return <div className="flex h-screen flex-col bg-gray-800">
    <NavBar currentFocus="Support" />
    <SupportPageBody />
  </div>

}

function SupportPageBody() {
  return (
    <main className="flex flex-col px-5 py-5 text-2xl font-semibold text-white h-full w-full">
      <div className="grid grid-cols-2 gap-4 h-full">
        <div className="border-slate-700 border-l-[1px] border-t-[1px] rounded-3xl p-8">
          <AboutSection />
        </div>
        <div className="bg-slate-700 bg-opacity-90 row-span-2 rounded-3xl p-8 border-slate-600 border-2">
          <ContactForm />
        </div>
      </div>
    </main>
  )
}

function ContactForm() {
  return (
    <div>
      Contact Us
      <form className="my-10">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", justifyContent: "center", alignItems: "center" }}>
          <label htmlFor="name" className="text-white font-normal text-xl">Name</label>
          <TextInput id="name" type="text" placeholder="Name" />
          <label htmlFor="email" className="text-white font-normal text-xl">Email</label>
          <TextInput id="email" type="email" placeholder="Email" />
          <label htmlFor="subject" className="text-white font-normal text-xl">Subject</label>
          <TextInput id="subject" type="text" placeholder="Subject" />
        </div>
        <textarea className="text-white font-light text-xl w-full bg-transparent outline-none border-b-[0.7px] border-slate-800 p-2 my-5" placeholder="Message" />
      </form>
    </div>
  )
}

function AboutSection() {
  return (
    <>
      <div className="font-normal">
        Support the Developer

        <div className="text-sm">
          possible payment integration
        </div>



      </div>
      <div className="my-5 font-normal">
        About
        <div className="text-base my-3 mx-2">
          You can check out my other work at my
          <br />
          <div className="ml-2 text-blue-400 inline">
            <GlobeAltIcon className="h-5 w-5 inline mr-2" />
            <a href="https://himanshu-joshi.netlify.app">Portfolio Website</a>
          </div>
        </div>
      </div >
    </>
  )
}

function TextInput({ type, placeholder, id }: any) {
  return <input className="
    text-black font-light text-lg
    bg-white bg-opacity-80
    rounded-3xl
    outline-none border-b-[0.7px] border-slate-800
    py-2 px-5 my-2" type={type} placeholder={placeholder} id={id} />
}
