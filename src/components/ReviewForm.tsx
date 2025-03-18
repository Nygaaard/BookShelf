// src/components/ReviewForm.tsx
import { useState } from "react";

interface ReviewFormProps {
  bookId: string;
  userReview: { review: string; rating: number } | null; // För användarens redan lämnade recension
}

const ReviewForm: React.FC<ReviewFormProps> = ({ bookId, userReview }) => {
  const [review, setReview] = useState<string>(
    userReview ? userReview.review : ""
  ); // Om användaren har lämnat en recension, sätt den här
  const [rating, setRating] = useState<number>(
    userReview ? userReview.rating : 1
  ); // Om användaren har lämnat ett betyg, sätt det här
  const [reviewError, setReviewError] = useState<string>("");

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!review.trim()) {
      setReviewError("Recensionen får inte vara tom.");
      return;
    }

    const reviewData = {
      book_id: bookId,
      review: review,
      rating: rating,
    };

    try {
      const token = localStorage.getItem("token"); // Hämta token från localStorage

      if (!token) {
        throw new Error("Du måste vara inloggad för att lämna en recension.");
      }

      const response = await fetch("http://localhost:3001/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Lägg till token i headern
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error("Kunde inte skicka recensionen.");
      }

      setReview(""); // Rensa recensionstexten
      setRating(1); // Rensa betyg
      setReviewError(""); // Återställ eventuella fel
      alert("Recensionen skickades!");
    } catch (err) {
      console.error(err);
      setReviewError(
        "Det gick inte att skicka recensionen. Försök igen senare."
      );
    }
  };

  return (
    <div>
      <h2>Lämna en recension</h2>
      {reviewError && <p style={{ color: "red" }}>{reviewError}</p>}
      <form onSubmit={handleReviewSubmit}>
        <div>
          <label htmlFor="rating">Betyg (1-5):</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="review">Recension:</label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </div>
        <button type="submit">Skicka recension</button>
      </form>
    </div>
  );
};

export default ReviewForm;
