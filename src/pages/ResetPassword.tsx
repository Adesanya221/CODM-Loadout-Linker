import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import Layout from "@/components/layout/Layout";

export default function ResetPassword() {
  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Reset Password</h1>
        <ResetPasswordForm />
      </div>
    </Layout>
  );
} 