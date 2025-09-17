import { SignupForm } from "@/components/auth/SignupForm";

export default function Signup() {
  return (
    <div className="relative z-[1] min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>
        <SignupForm />
      </div>
    </div>
  );
} 