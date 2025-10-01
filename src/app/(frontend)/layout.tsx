import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      <div className="mt-14">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
