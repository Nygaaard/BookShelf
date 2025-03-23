import { useEffect, useState } from "react";
import { ReviewInterface } from "../types/ReviewInterface";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

interface ReviewProps {
  review: ReviewInterface;
  onDelete: (id: number) => void;
  onEdit: (id: number, rating: number, review: string) => void;
}

const EditableReview = ({ review, onDelete, onEdit }: ReviewProps) => {
  const [username, setUsername] = useState<string>();
  const [rating, setRating] = useState<number>(review.rating);
  const [editReview, setEditReview] = useState<string>(review.review);

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
    <div className="review-container">
      <ul>
        <li key={review.id}>
          <input
            type="number"
            value={rating}
            onChange={(event) => setRating(+event.target.value)}
            className="review-rating"
          />
          <input
            type="textarea"
            value={editReview}
            onChange={(event) => setEditReview(event.target.value)}
            className="review-text"
          />
          <p className="review-username">{username}</p>
          <p className="review-date">
            <small>{new Date(review.created_at).toLocaleDateString()}</small>
          </p>
        </li>
      </ul>
      <div className="review-actions">
        <MdDelete onClick={() => onDelete(review.id)} />
        <FaCheck onClick={() => onEdit(review.id, rating, editReview)} />
      </div>
    </div>
  );
};

export default EditableReview;
