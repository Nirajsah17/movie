import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movies",
  description: "List of movies and shows",
};

export default function MovietLayout({ children }: LayoutProps<"/">) {
  return (
    <div >
      {children}
    </div>
  );
}
