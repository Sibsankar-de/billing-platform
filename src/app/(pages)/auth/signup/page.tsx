import { SignupForm } from '@/components/forms/SignupForm'
import Link from 'next/link'

export default function SignupPage() {
    return (
        <>
            {/* Signup Form */}
            <SignupForm />

            {/* login Link */}
            <p className="text-center mt-6 text-gray-600">
                Already have an account?{' '}
                <Link href={"/auth/login"} className="text-primary hover:text-primary/50">
                    Login to continue!
                </Link>
            </p>
        </>
    )
}
