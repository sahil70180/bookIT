"use client";
import StarRatings from "react-star-ratings";

interface RatingProps {
  rating: number;
}

export default function Rating({ rating }: RatingProps) {
  return (
    <StarRatings
      rating={rating}
      starRatedColor="#e61e4d"
      numberOfStars={6}
      starDimension="18px"
      starSpacing="1px"
      name="rating"
    />
  );
}
