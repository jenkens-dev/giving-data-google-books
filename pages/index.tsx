import { useState } from "react";

const BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes?q=";

interface BookData {
  id: string;
  volumeInfo: {
    title: string;
    categories?: string[];
    publisher?: string;
    authors: string[];
    description: string;
    infoLink: string;
    imageLinks?: {
      thumbnail: string;
    };
    publishedDate: string;
  };
}

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [bookData, setBookData] = useState<BookData[]>([]);

  const handleSearchSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    await fetch(
      `${BOOKS_API_URL}${searchValue}&key=${process.env.NEXT_PUBLIC_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setBookData(data.items);
      });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={handleSearchSubmit}>
        <div>
          <label className="sr-only" htmlFor="bookSearch">
            Search books:
          </label>
          <input
            type="search"
            id="bookSearch"
            value={searchValue || ""}
            required
            placeholder="Search books..."
            onChange={handleInputChange}
          />
          <button type="submit">Search</button>
        </div>
      </form>
      <div>
        {bookData.length > 0 ? (
          bookData.map((book) => {
            return <div key={book.id}>{book.volumeInfo.title}</div>;
          })
        ) : (
          <div>Search to find books</div>
        )}
      </div>
    </main>
  );
}
