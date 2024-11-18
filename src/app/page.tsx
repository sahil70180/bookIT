import Home from "@/components/Home";
import Image from "next/image";

const getAllRooms = async () => {
  const res = await fetch(`${process.env.localURI}/api/rooms`);
  return res.json();
};

export default async function HomePage() {
  const data = await getAllRooms();
  console.log("===============");
  console.log("Data : ", data.resPerPage);
  console.log("================");
  return (
    <div className="container">
      <Home />
    </div>
  );
}
