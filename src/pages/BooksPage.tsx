import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Book } from "../types/BookInterface";
import BookCard from "../components/BookCard";

const BooksPage = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!searchTerm) return;

    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=20&key=AIzaSyBcmNfw-bAy6NC3utMW_oijE97vthAuC44`
        );
        if (!response.ok)
          throw new Error("Något gick fel vid hämtning av böcker.");

        const data = await response.json();
        setBooks(data.items || []);
        setError("");
      } catch {
        setError("Kunde inte hämta böcker, försök igen.");
        setBooks([]);
      }
    };

    fetchBooks();
  }, [searchTerm]);

  return (
    <div>
      <h2>
        {searchTerm
          ? `Sökresultat för: "${searchTerm}"`
          : "Ange en sökning för att visa resultat"}
      </h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BooksPage;
