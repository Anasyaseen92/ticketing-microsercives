import Link from "next/link";
import { getCurrentUser } from "@/lib/get-current-user";

export default async function LandingPage() {
  const currentUser = await getCurrentUser();

  return (
    <div className="page-container py-12 sm:py-20">
      <section className="mx-auto max-w-3xl text-center">
        <p className="mb-4 inline-flex rounded-full border border-brand-200 bg-brand-50 px-4 py-1 text-sm font-medium text-brand-700">
          Your next great night out starts here
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Book tickets to the events you love
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-600">
          AYTix makes it simple to discover concerts, sports, and live shows —
          then secure your seats in seconds.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {currentUser ? (
            <div className="card w-full max-w-md text-left">
              <p className="text-sm font-medium uppercase tracking-wide text-brand-600">
                Signed in
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                Welcome back!
              </h2>
              <p className="mt-2 text-slate-600">
                You are signed in as{" "}
                <span className="font-medium text-slate-800">
                  {currentUser.email}
                </span>
                .
              </p>
            </div>
          ) : (
            <>
              <Link href="/auth/signup" className="btn-primary w-full max-w-xs">
                Create an account
              </Link>
              <Link href="/auth/signin" className="btn-secondary w-full max-w-xs">
                Sign in
              </Link>
            </>
          )}
        </div>
      </section>

      <section className="mt-16 grid gap-6 sm:grid-cols-3">
        {[
          {
            title: "Browse events",
            description: "Explore upcoming shows and find something for every taste.",
          },
          {
            title: "Secure checkout",
            description: "Fast, reliable booking so you never miss the moment.",
          },
          {
            title: "Instant access",
            description: "Your tickets are ready as soon as your order is complete.",
          },
        ].map((feature) => (
          <article key={feature.title} className="card">
            <h3 className="text-lg font-semibold text-slate-900">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {feature.description}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
