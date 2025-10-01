import React from "react";
import { Sidebar } from "./(components)/sidebar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden lg:flex w-64 h-full sticky top-0 ">
        <Sidebar />
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;
