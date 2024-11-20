import Home from "@/components/Home";
import Error from "./error";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HomePage - BookIT",
};

const getAllRooms = async (searchParams: string) => {
  const params = await searchParams;
  const urlParams = new URLSearchParams(params);
  const queryStr = urlParams.toString();

  const res = await fetch(`${process.env.API_URL}/api/rooms?${queryStr}`);
  return res.json();
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: string;
}) {
  const data = await getAllRooms(searchParams);

  // console.log("Search Params : ", searchParams);

  if (data?.errorMessage) {
    return <Error error={data} />;
  }

  return (
    <div className="container">
      <Home data={data} />
    </div>
  );
}
