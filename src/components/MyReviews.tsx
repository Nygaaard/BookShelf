import { useEffect, useState } from "react";
import { ReviewInterface } from "../types/ReviewInterface";
import EditableReview from "./EditableReview";

const MyReviews = () => {
  const [reviews, setReviews] = useState<ReviewInterface[]>([]);
  const [message, setMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const token = localStorage.getItem("token");

  const fetchMyReviews = async () => {
    try {
      const response = await fetch("http://localhost:3002/my-reviews", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Kunde inte hämta recensioner.");
      }

      const data = await response.json();
      setReviews(data);
    } catch {
      setErrorMessage("Fel vid hämtning av recensioner.");
    }
  };

  const deleteReview = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3002/reviews/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Kunde inte ta bort recension.");
      }

      setMessage("Recension borttagen.");
      setErrorMessage("");
      fetchMyReviews();
    } catch {
      setErrorMessage("Fel vid borttagning av recension.");
    }
  };

  const editReview = async (id: number, rating: number, review: string) => {
    try {
      const response = await fetch(`http://localhost:3002/reviews/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ review, rating }),
      });

      if (!response.ok) {
        throw new Error("Kunde inte ändra recension");
      }

      setMessage("Recensionen uppdaterades!");
      setErrorMessage("");
      fetchMyReviews();
    } catch {
      setErrorMessage("Fel vid uppdatering av recension.");
      setMessage("");
    }
  };

  useEffect(() => {
    fetchMyReviews();
  }, []);

  return (
    <div className="my-reviews">
      <h3>Mina Recensioner</h3>

      {errorMessage && <p className="error">{errorMessage}</p>}
      {message && <p className="error">{message}</p>}

      {reviews.length > 0 ? (
        <ul className="reviews-list">
          {reviews.map((review) => (
            <EditableReview
              review={review}
              key={review.id}
              onDelete={deleteReview}
              onEdit={editReview}
            />
          ))}
        </ul>
      ) : (
        <p className="no-reviews">Du har inga recensioner ännu.</p>
      )}
    </div>
  );
};

export default MyReviews;
