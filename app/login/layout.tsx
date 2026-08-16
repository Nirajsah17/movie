import type { Metadata } from "next";
import NavBar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Login",
  description: "Login",
};

export default function LoginLayout({ children }: LayoutProps<"/">) {
  return (
    <div >
      <NavBar isSearch={false}/>
      {children}
    </div>
  );
}
