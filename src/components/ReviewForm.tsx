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

  useEffect(() => {
    if (userReview) {
      // Om användaren har en recension, sätt review och rating till deras befintliga värden
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

    console.log("Data som skickas:", reviewData);

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
      setReviewError("");
      alert("Recensionen skickades!");
    } catch (err) {
      console.error(err);
      setReviewError(
        "Det gick inte att skicka recensionen. Försök igen senare."
      );
    }
  };

  return (
    <div className="review-form-container">
      <h2>Lämna en recension</h2>
      {reviewError && <p className="error-message">{reviewError}</p>}

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
              required
            />
          </div>
          <button type="submit">Skicka recension</button>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;
