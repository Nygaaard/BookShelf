import { useEffect, useState } from "react";
import { ReviewInterface } from "../types/ReviewInterface";
import { CiStar } from "react-icons/ci";

interface ReviewProps {
  review: ReviewInterface;
}

const Review = ({ review }: ReviewProps) => {
  const [username, setUsername] = useState<string>();

  const getUsername = async (id: number) => {
    const response = await fetch(`http://localhost:3002/users/${id}`);

    if (!response.ok) {
      throw new Error("Fel vid hämtning...");
    }

    const data = await response.json();
    setUsername(data.username);
  };

  useEffect(() => {
    getUsername(review.user_id);
  }, [review]);
  return (
    <li className="review-card" key={review.id}>
      <p className="rating">
        <strong>Betyg:</strong> <CiStar className="star" /> {review.rating} / 5
      </p>
      <p className="review-text">"{review.review}"</p>
      <p className="review-author">– {username}</p>
      <p className="review-date">
        <small>{new Date(review.created_at).toLocaleDateString()}</small>
      </p>
    </li>
  );
};

export default Review;
