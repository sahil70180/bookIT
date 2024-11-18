import Home from "@/components/Home";
import Image from "next/image";
import Error from "./error";

const getAllRooms = async () => {
  const res = await fetch(`${process.env.API_URL}/api/rooms`);
  return res.json();
};

export default async function HomePage() {
  const data = await getAllRooms();

  if (data?.errorMessage) {
    return <Error error={data} />;
  }

  return (
    <div className="container">
      <Home data={data} />
    </div>
  );
}
