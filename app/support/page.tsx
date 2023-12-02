import NavBar from "@/components/navbar";
import { EnvelopeIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support - The Hyde Project",
};

export default function SupportPage() {
  return (
    <div className="flex h-screen flex-col bg-gray-800">
      <NavBar currentFocus="Support" />
      <SupportPageBody />
    </div>
  );
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
  );
}

function ContactForm() {
  return (
    <div>
      <span className="ml-2 flex flex-row items-center border-b-[1px] border-gray-500 pb-5">
        <EnvelopeIcon className="h-8 w-8 inline mr-2 text-blue-400" />
        Contact Us
      </span>
      <form className="my-8 ml-2">
        <div className="flex flex-col">
          <label className="text-gray-300 font-light text-sm mt-2">Name</label>
          <TextInput id="name" type="text" placeholder="Name" />
          <label className="text-gray-300 font-light text-sm mt-2">Email</label>
          <TextInput id="email" type="email" placeholder="Email" />
          <label className="text-gray-300 font-light text-sm mt-2">
            Subject
          </label>
          <TextInput id="subject" type="text" placeholder="Subject" />
          <label className="text-gray-300 font-light text-sm mt-2">
            Message
          </label>
          <textarea
            className="
              text-gray-300 font-light text-base
              w-full
              bg-white bg-opacity-10
              rounded-lg
              outline-none
              border-[1px] border-transparent
              focus:border-gray-300
              p-2 px-4 my-2
            "
            placeholder="Message"
          />
        </div>
        <div className="flex justify-end">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}

function SubmitButton() {
  return (
    <button
      className="
        text-white font-light text-base
        bg-blue-500
        rounded-lg
        outline-none
        border-[1px] border-transparent
        focus:border-gray-300
        p-2 px-4 my-2
      "
      type="submit"
    >
      Submit
    </button>
  );
}

function AboutSection() {
  return (
    <>
      <div className="font-semibold">
        <div className="flex flex-row items-center mb-5 border-b-[1px] border-gray-500 pb-5">
          <UserCircleIcon className="h-8 w-8 inline mr-2 text-blue-400" />
          About
        </div>
        <section className="mx-2">
          <span className="text-2xl font-semibold">
            Welcome to my corner of the internet!
          </span>
          <div className="text-base font-normal inline-block leading-7">
            <br />
              I&apos;m Himanshu Joshi, a passionate full-stack developer.
            <br />
            <div className="inline-block">
              Feel free to explore my
              <a
                href="https://himanshu-joshi.netlify.app"
                className="text-blue-400 inline-block cursor-pointer mx-2 font-semibold"
              >
                Portfolio Website
              </a>
              and discover the exciting projects I&apos;ve worked on.
            </div>
            <div className="inline-block align-bottom mt-2">
              You can find the code for many of these projects on my
              <a
                href="https://github.com/ItsHyde-dev"
                className="text-blue-400 inline-block cursor-pointer mx-2 gap-2 font-semibold"
              >
                <GithubIcon className="h-5 w-5 inline-block mr-2 align-text-bottom" />{" "}
                GitHub
              </a>
              profile
            </div>
            <br />
            providing a deeper dive into the behind-the-scenes magic.
          </div>
        </section>
      </div>
    </>
  );
}

function GithubIcon({ className }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function TextInput({ type, placeholder, id }: any) {
  return (
    <input
      className="
    text-gray-300 font-light text-base
    bg-white bg-opacity-10
    rounded-lg
    outline-none
    border-[1px] border-transparent
    focus:border-gray-300
    py-2 px-4 my-2"
      type={type}
      placeholder={placeholder}
      id={id}
    />
  );
}
