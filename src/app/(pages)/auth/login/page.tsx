import { LoginForm } from '@/components/forms/LoginForm'
import { Receipt } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function LoginPage() {
    return (
        <>
            {/* Login Form */}
            <LoginForm />

            {/* Sign Up Link */}
            <p className="text-center mt-6 text-gray-600">
                Don't have an account?{' '}
                <Link href={"/auth/signup"} className="text-primary hover:text-primary/50">
                    Sign up for free
                </Link>
            </p>
        </>
    )
}
