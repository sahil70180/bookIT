import { IImage } from "@/backend/models/room";
import Image from "next/image";
import React from "react";
import { Carousel } from "react-bootstrap";

interface Props {
  images: IImage[];
}
const RoomImageSlider = ({ images }: Props) => {
  return (
    <Carousel>
      {images?.length > 0 ? (
        images.map((img) => (
          <Carousel.Item key={img?.public_id}>
            <div style={{ widows: "100%", height: "460px" }}>
              <Image
                src={img?.url}
                alt={img?.url}
                className="d-block m-auto"
                layout="fill"
              />
            </div>
          </Carousel.Item>
        ))
      ) : (
        <Carousel.Item>
          <div style={{ widows: "100%", height: "460px" }}>
            <Image
              src={"/images/default_room_image.jpg"}
              alt={"Image"}
              className="d-block m-auto"
              layout="fill"
            />
          </div>
        </Carousel.Item>
      )}
    </Carousel>
  );
};

export default RoomImageSlider;
