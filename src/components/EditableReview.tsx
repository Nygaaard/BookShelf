import { useEffect, useState } from "react";
import { ReviewInterface } from "../types/ReviewInterface";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

interface ReviewProps {
  review: ReviewInterface;
  onDelete: (id: number) => void;
  onEdit: (id: number, rating: number, review: string) => void;
}

const EditableReview = ({ review, onDelete, onEdit }: ReviewProps) => {
  const [username, setUsername] = useState<string>();
  const [rating, setRating] = useState<number>(review.rating);
  const [editReview, setEditReview] = useState<string>(review.review);
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
    <div>
      <ul>
        <li key={review.id}>
          <input
            type="number"
            value={rating}
            onChange={(event) => setRating(+event.target.value)}
          />
          <input
            type="textarea"
            value={editReview}
            onChange={(event) => setEditReview(event.target.value)}
          />
          <p>{username}</p>
          <p>
            <small>{new Date(review.created_at).toLocaleDateString()}</small>
          </p>
        </li>
      </ul>
      <MdDelete onClick={() => onDelete(review.id)} />
      <MdEdit onClick={() => onEdit(review.id, rating, editReview)} />
    </div>
  );
};

export default EditableReview;
