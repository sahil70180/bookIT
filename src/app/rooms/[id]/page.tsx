import Error from "@/app/error";
import RoomDetails from "@/components/room/RoomDetails";

interface Props {
  params: { id: string };
}

const getRoomDetails = async (id: string) => {
  const result = await fetch(`${process.env.API_URL}/api/rooms/${id}`);

  return result.json();
};

export default async function RoomDetailsPage({ params }: Props) {
  const { id } = await params; // Extract id from params directly

  const data = await getRoomDetails(id);

  console.log("===============");
  console.log(data);
  console.log("================");

  if (data?.errorMessage) {
    return <Error error={data} />;
  }

  return <RoomDetails data={data} />;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  const data = await getRoomDetails(id);

  return {
    title: data?.room?.name,
    description: "test Metadata description for this page",
    keywords: "Hotel, Room, Twins, Luxury",
  };
}
