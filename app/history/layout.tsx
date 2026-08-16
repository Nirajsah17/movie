import type { Metadata } from "next";
import NavBar from "../components/Navbar";

export const metadata: Metadata = {
  title: "History",
  description: "Watch History",
};

export default function HistoryLayout({ children }: LayoutProps<"/">) {
  return (
    <div >
      <NavBar isSearch={false}/>
      {children}
    </div>
  );
}
