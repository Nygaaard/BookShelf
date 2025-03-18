import { Book } from "../types/BookInterface";

interface BookDetailsProps {
  book: Book;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book }) => {
  return (
    <div className="book-details">
      <h2>{book.volumeInfo.title}</h2>

      {book.volumeInfo.imageLinks?.thumbnail && (
        <img
          src={book.volumeInfo.imageLinks.thumbnail}
          alt={book.volumeInfo.title}
        />
      )}

      <p>
        <strong>Författare:</strong> {book.volumeInfo.authors?.join(", ")}
      </p>

      <p>
        <strong>Beskrivning:</strong> {book.volumeInfo.description}
      </p>

      <p>
        <strong>Publicerad:</strong> {book.volumeInfo.publishedDate}
      </p>

      <p>
        <strong>Språk:</strong> {book.volumeInfo.language}
      </p>

      <div className="book-details__isbn">
        <strong>ISBN:</strong>
        {book.volumeInfo.industryIdentifiers?.map((id) => (
          <span key={id.identifier}>{id.identifier}</span>
        ))}
      </div>
    </div>
  );
};

export default BookDetails;
