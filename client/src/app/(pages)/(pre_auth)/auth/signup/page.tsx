import type { Metadata } from "next";
import { SignupForm } from "@/components/forms/SignupForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Create your EaseInv account and start managing billing, inventory, and customers in one place.",
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { redirect } = await searchParams;
  const loginLink = redirect
    ? `/auth/login?redirect=${encodeURIComponent(redirect as string)}`
    : "/auth/login";

  return (
    <>
      {/* Signup Form */}
      <SignupForm />

      {/* login Link */}
      <p className="text-center mt-6 text-gray-600">
        Already have an account?{" "}
        <Link href={loginLink} className="text-primary hover:text-primary/50">
          Login to continue!
        </Link>
      </p>
    </>
  );
}
