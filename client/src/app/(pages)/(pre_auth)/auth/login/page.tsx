import type { Metadata } from "next";
import { LoginForm } from "@/components/forms/LoginForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Login to your EaseInv account to manage invoices, inventory, customers, and store operations.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { redirect } = await searchParams;
  const signupLink = redirect
    ? `/auth/signup?redirect=${encodeURIComponent(redirect as string)}`
    : "/auth/signup";

  return (
    <>
      {/* Login Form */}
      <LoginForm />

      {/* Sign Up Link */}
      <p className="text-center mt-6 text-gray-600">
        Don't have an account?{" "}
        <Link href={signupLink} className="text-primary hover:text-primary/50">
          Sign up for free
        </Link>
      </p>
    </>
  );
}
