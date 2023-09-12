import AuthForm from "@/components/tailwind-auth-form";

export default function AuthPage() {
  return (
    <div className='flex h-screen backdrop-filter backdrop-grayscale-[70%] backdrop-blur-[20px]'>
      <AuthForm />
    </div>
  )
}
