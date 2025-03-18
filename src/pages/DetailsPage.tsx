// src/pages/DetailsPage.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Book } from "../types/BookInterface"; // Importera Book-typen
import BookDetails from "../components/BookDetails"; // Importera BookDetails-komponenten
import ReviewForm from "../components/ReviewForm"; // Importera ReviewForm-komponenten

interface Review {
  id: number;
  user_id: number;
  review: string;
  rating: number;
  created_at: string;
}

const DetailsPage = () => {
  const params = useParams();
  const { id } = params;

  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userReview, setUserReview] = useState<Review | null>(null); // För användarens egen recension
  const [error, setError] = useState<string>("");

  // Hämta bokdetaljer och recensioner
  useEffect(() => {
    if (!id) return;

    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyBcmNfw-bAy6NC3utMW_oijE97vthAuC44`
        );

        if (!response.ok) {
          throw new Error("Något gick fel vid hämtning av boken.");
        }

        const data = await response.json();
        setBook(data); // Sätt den hämtade boken
        setError(""); // Återställ eventuella tidigare fel
      } catch {
        setError("Kunde inte hämta bokens detaljer.");
        setBook(null);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:3001/reviews/${id}`);

        if (!response.ok) {
          throw new Error("Något gick fel vid hämtning av recensioner.");
        }

        const data = await response.json();
        setReviews(data); // Här sätter vi direkt datan som är en array

        // Hitta och sätt användarens egen recension om den finns
        const userReview = data.find(
          (review: Review) =>
            review.user_id === Number(localStorage.getItem("userId"))
        );
        setUserReview(userReview || null);
      } catch {
        setError("Kunde inte hämta recensioner.");
      }
    };

    fetchBookDetails();
    fetchReviews();
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  if (!book) return <p>Laddar bokens detaljer...</p>;

  return (
    <div>
      <h1>Bokdetaljer</h1>
      <BookDetails book={book} />

      <h2>Recensioner</h2>
      {reviews && reviews.length === 0 && (
        <p>Det finns inga recensioner för den här boken än.</p>
      )}

      {reviews && reviews.length > 0 && (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>
                <strong>Betyg:</strong> {review.rating}
              </p>
              <p>{review.review}</p>
              <p>
                <small>
                  {new Date(review.created_at).toLocaleDateString()}
                </small>
              </p>
            </li>
          ))}
        </ul>
      )}

      {/* Använd ReviewForm-komponenten för att lämna recension */}
      <ReviewForm bookId={id!} userReview={userReview} />
    </div>
  );
};

export default DetailsPage;
