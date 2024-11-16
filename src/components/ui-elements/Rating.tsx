"use client";
import StarRatings from "react-star-ratings";
export default function Rating() {
  return (
    <StarRatings
      rating={5}
      starRatedColor="#e61e4d"
      numberOfStars={6}
      starDimension="18px"
      starSpacing="1px"
      name="rating"
    />
  );
}
