import Link from "next/link";

interface CurrentUser {
  id?: string;
  email?: string;
}

export default function Header({ currentUser }: { currentUser: CurrentUser | null }) {
  const navLinks = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ].filter((link): link is { label: string; href: string } => Boolean(link));

  const links = navLinks.map((link) => (
      <li key={link.href}>
        <Link
          href={link.href}
          className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-brand-50 hover:text-brand-700"
        >
          {link.label}
        </Link>
      </li>
    ));

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <nav className="page-container flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900 transition hover:text-brand-700"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
            A
          </span>
          AYTix
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <p className="hidden text-sm text-slate-500 sm:block">
            {currentUser ? (
              <>
                Welcome,{" "}
                <span className="font-medium text-slate-800">
                  {currentUser.email}
                </span>
              </>
            ) : (
              "Please log in to book tickets."
            )}
          </p>
          <ul className="flex items-center gap-1">{links}</ul>
        </div>
      </nav>
    </header>
  );
}
