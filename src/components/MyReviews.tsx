import { useEffect, useState } from "react";
import { ReviewInterface } from "../types/ReviewInterface";
import EditableReview from "./EditableReview";

const MyReviews = () => {
  const [reviews, setReviews] = useState<ReviewInterface[]>([]);
  const token = localStorage.getItem("token");

  const fetchMyReviews = async () => {
    const response = await fetch("http://localhost:3002/my-reviews", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();
    setReviews(data);
  };

  const deleteReview = async (id: number) => {
    const response = await fetch(`http://localhost:3002/reviews/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Kunde inte hämta recension");
    }

    const data = await response.json();
    console.log("data: ", data);
  };
  const editReview = async (id: number, rating: number, review: string) => {
    const response = await fetch(`http://localhost:3002/reviews/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        review,
        rating,
      }),
    });

    if (!response.ok) {
      throw new Error("Kunde inte ändra recension");
    }

    const data = await response.json();
    console.log("data", data);
  };

  useEffect(() => {
    fetchMyReviews();
  }, [deleteReview]);

  return (
    <div>
      {reviews.map((review) => (
        <EditableReview
          review={review}
          key={review.id}
          onDelete={deleteReview}
          onEdit={editReview}
        />
      ))}
    </div>
  );
};

export default MyReviews;
