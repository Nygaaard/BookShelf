// src/pages/DetailsPage.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Book } from "../types/BookInterface"; // Importera Book-typen
import BookDetails from "../components/BookDetails"; // Importera BookDetails-komponenten

const DetailsPage = () => {
  const params = useParams();
  const { id } = params;
  console.log("Book ID in BookDetail:", id); // Loggar id direkt här

  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyBcmNfw-bAy6NC3utMW_oijE97vthAuC44`
        );

        if (!response.ok) {
          throw new Error("Något gick fel vid hämtning av boken.");
        }

        const data = await response.json();
        console.log("Fetched Book Data:", data);
        setBook(data); // Sätt den hämtade boken
        setError(""); // Återställ eventuella tidigare fel
      } catch {
        setError("Kunde inte hämta bokens detaljer.");
        setBook(null);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  if (!book) return <p>Laddar bokens detaljer...</p>;

  return (
    <div>
      <h1>Bokdetaljer</h1>
      {/* Använd BookDetails-komponenten för att visa boken */}
      <BookDetails book={book} />
    </div>
  );
};

export default DetailsPage;
