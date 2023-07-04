import AuthForm from "./components/AuthForm"
import LogoImage from "@/app/components/LogoImage"

export default function Home() {
  return (
    <div
        className="
            flex
            min-h-full
            flex-col
            justify-center
            py-12
            sm:px-6
            lg:px-8
            bg-gray-100
            dark:bg-stone-950
        "
    >
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <LogoImage />
            <h2
                className="
                    mt-6
                    text-center
                    text-3xl
                    font-bold
                    tracking-tight
                    text-gray-900
                    dark:text-white
                "
            >
                Sign in to your account
            </h2>
        </div>
        <AuthForm />
    </div>
  )
}