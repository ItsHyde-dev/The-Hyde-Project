import AuthForm from "@/components/tailwind-auth-form";
import "./auth.style.css";

export default function AuthPage() {

  return (
    <div className='flex h-screen relative background overflow-hidden'>
      <AuthForm />
    </div>
  )
}
