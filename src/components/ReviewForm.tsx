import { useState, useEffect } from "react";

interface ReviewFormProps {
  book_id: string;
  userReview: { review: string; rating: number } | null; // För användarens redan lämnade recension
}

const ReviewForm: React.FC<ReviewFormProps> = ({ book_id, userReview }) => {
  const [review, setReview] = useState<string>(
    userReview ? userReview.review : ""
  );
  const [rating, setRating] = useState<number>(
    userReview ? userReview.rating : 1
  );
  const [reviewError, setReviewError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    if (userReview) {
      // Sätt befintliga värden för review och rating om de finns
      setReview(userReview.review);
      setRating(userReview.rating);
    }
  }, [userReview]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!review.trim()) {
      setReviewError("Recensionen får inte vara tom.");
      return;
    }

    const reviewData = {
      book_id: book_id,
      review: review,
      rating: rating,
    };

    try {
      const token = localStorage.getItem("token"); // Hämta token från localStorage

      if (!token) {
        throw new Error("Du måste vara inloggad för att lämna en recension.");
      }

      const response = await fetch("http://localhost:3002/reviews", {
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

      // Visa framgångsmeddelande och uppdatera sidan
      setSuccessMessage("Recensionen skickades!");
      setReview(""); // Rensa recensionstexten
      setRating(1); // Rensa betyg
      setReviewError("");

      // Uppdatera sidan efter en kort paus
      setTimeout(() => {
        window.location.reload();
      }, 1500); // Uppdatera sidan efter 2 sekunder
    } catch (err) {
      console.error(err);
      setReviewError(
        "Kunde inte skicka recensionen. Kontrollera att du är inloggad."
      );
    }
  };

  return (
    <div className="review-form-container">
      <h2>Lämna en recension</h2>
      {reviewError && <p className="error-message">{reviewError}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {userReview ? (
        <div>
          <h3>Din recension:</h3>
          <p>
            <strong>Betyg:</strong> {userReview.rating}
          </p>
          <p>{userReview.review}</p>
        </div>
      ) : (
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
            />
          </div>
          <button type="submit">Skicka recension</button>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;
