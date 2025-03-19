import { useEffect, useState } from "react";
import { ReviewInterface } from "../types/ReviewInterface";

interface ReviewProps {
  review: ReviewInterface;
}

const Review = ({ review }: ReviewProps) => {
  const [username, setUsername] = useState<string>();
  console.log("review: ", review);

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
    <li key={review.id}>
      <p>
        <strong>Betyg:</strong> {review.rating}
      </p>
      <p>{review.review}</p>
      <p>{username}</p>
      <p>
        <small>{new Date(review.created_at).toLocaleDateString()}</small>
      </p>
    </li>
  );
};

export default Review;
