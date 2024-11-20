import Search from "@/components/Search";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Rooms || BookIT",
  description: "Search According to the Need",
};

export default function SearchPage() {
  return (
    <div>
      <Search />
    </div>
  );
}
