"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const accountLinks = [
  { href: "/my-account-orders", label: "Pedidos" },

  // { href: "/my-account-edit", label: "Detalhes da Conta" },
];

export default function DashboardNav() {
  const pathname = usePathname();

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };
  return (
    <ul className="my-account-nav">
      {accountLinks.map((link, index) => (
        <li key={index}>
          <Link
            href={link.href}
            className={`my-account-nav-item ${
              pathname == link.href ? "active" : ""
            }`}
          >
            {link.label}
          </Link>
        </li>
      ))}
      <li>
        <Link href="/" onClick={handleLogout} className="my-account-nav-item">
          Sair
        </Link>
      </li>
    </ul>
  );
}
