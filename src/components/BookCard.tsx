import { Book } from "../types/BookInterface";
import { Link } from "react-router-dom";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  console.log(book.id);
  return (
    <div className="book-card">
      {book.volumeInfo.imageLinks?.thumbnail && (
        <img
          src={book.volumeInfo.imageLinks.thumbnail}
          alt={book.volumeInfo.title}
        />
      )}
      <div className="book-info">
        <h3>{book.volumeInfo.title}</h3>
        <Link to={`/details/${book.id}`} className="show-more">
          Visa mer
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
