import Link from "next/link";

export default function Header({ currentUser }: { currentUser: any }) {

    const links = [
        !currentUser && { label: "Sign Up", href: "/auth/signup" },
        !currentUser && { label: "Sign In", href: "/auth/signin" },
        currentUser && { label: "Sign Out", href: "/auth/signout" },
    ].filter(link => link).map(({ label, href }) => {
        return (
            <li key={href}>
             <Link href={href}>
                <a> {label}</a>
             </Link>
            </li>
        );
    });
    return (
        <nav>
            <Link href="/">
                <a>AYTix</a>
            </Link>

            <div>
                <ul>{currentUser ? <li>Welcome, {currentUser.name}!</li> : <li>Please log in.</li>}</ul>
                </div>
        </nav>
    );
}