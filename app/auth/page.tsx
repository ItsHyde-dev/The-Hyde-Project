import AuthForm from "@/components/tailwind-auth-form";
import "./auth.style.css";
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

export default function AuthPage() {

  return (
      <div className='flex h-screen relative background overflow-hidden'>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <AuthForm />
      </div>
  )
}
