import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Book } from "../types/BookInterface";
import BookCard from "../components/BookCard";

const HomePage = () => {
  const [popularBooks, setPopularBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopularBooks = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=bestsellers&maxResults=20&key=AIzaSyBcmNfw-bAy6NC3utMW_oijE97vthAuC44`
        );
        if (!response.ok)
          throw new Error("Något gick fel vid hämtning av böcker.");

        const data = await response.json();
        setPopularBooks(data.items || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPopularBooks();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div>
      <h1>Välkommen till Bokrecensioner!</h1>

      <input
        type="text"
        placeholder="Sök efter en bok..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Sök</button>

      <h2>Populära böcker</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {popularBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
