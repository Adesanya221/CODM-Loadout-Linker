import { LoginForm } from "@/components/auth/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
      {/* Brand / Visual Panel */}
      <div className="hidden md:flex relative items-center justify-center overflow-hidden bg-gradient-to-br from-primary/15 via-primary/5 to-background">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-codm-orange/20 blur-3xl" />
        </div>
        <div className="relative px-10 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-primary mb-3">
            CoDM Loadout Linker
          </h1>
          <p className="text-sm lg:text-base text-muted-foreground max-w-md mx-auto">
            Build, save, and share your Call of Duty: Mobile loadouts with ease.
          </p>
        </div>
      </div>

      {/* Auth Panel */}
      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-2xl font-semibold tracking-tight">Welcome back</h2>
            <p className="text-sm text-muted-foreground">Sign in to continue to your dashboard</p>
          </div>

          <LoginForm />

          <p className="mt-8 text-[11px] text-center text-muted-foreground">
            Protected by industry-standard authentication. We never post without permission.
          </p>
        </div>
      </div>
    </div>
  );
}