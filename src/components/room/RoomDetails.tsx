import { IRoom } from "@/backend/models/room";

interface Props {
  data: {
    room: IRoom;
  };
}

export default function RoomDetails({ data }: Props) {
  const { room } = data;
  // console.log("===============");
  // console.log(data);
  // console.log("================");
  return (
    <div>
      <h1>Room Details</h1>
      <p>Room ID : {data?.room?._id}</p>
      <p>Name : {data?.room?.name}</p>
    </div>
  );
}
