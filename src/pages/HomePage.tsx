import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Book } from "../types/BookInterface";

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
      <ul>
        {popularBooks.map((book) => (
          <li key={book.id}>
            <h3>{book.volumeInfo.title}</h3>
            {book.volumeInfo.imageLinks?.thumbnail && (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
