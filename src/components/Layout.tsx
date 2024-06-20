import Link from "next/link";
import React, { ReactElement, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props): ReactElement {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-purple-600 text-white p-4">
        <nav>
          <Link href="/" passHref>
            <div className="mr-4">Главная</div>
          </Link>
          <Link href="/users" passHref>
            <div>Список пользователей</div>
          </Link>
        </nav>
      </header>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
