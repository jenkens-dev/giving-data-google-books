import BookCard from "@/components/BookCard";
import { useState } from "react";
import bookStackSVG from "../public/bookStack.svg";

const BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes?q=";

interface BookData {
  id: string;
  volumeInfo: {
    title: string;
    categories?: string[];
    publisher?: string;
    authors?: string[];
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
        console.log(data.items);
        setBookData(data.items);
      });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-8">
      <form onSubmit={handleSearchSubmit} className="w-9/12">
        <label className="sr-only" htmlFor="bookSearch">
          Search books
        </label>
        <div className="relative">
          <input
            type="search"
            id="bookSearch"
            value={searchValue || ""}
            required
            placeholder="Search books..."
            onChange={handleInputChange}
            autoComplete="off"
            className="block w-full p-4 text-md text-gray-900 placeholder-gray-600 border border-stone-600 rounded-sm"
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-orange-900 hover:bg-orange-950 font-medium rounded-sm text-md px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>
      <div className="grid grid-cols-2 gap-y-1.5 w-full mt-6">
        {bookData.length > 0 ? (
          bookData.map((book) => {
            return (
              <BookCard
                key={book.id}
                thumbnail={
                  book.volumeInfo.imageLinks?.thumbnail ?? bookStackSVG
                }
                title={book.volumeInfo.title}
                authors={book.volumeInfo.authors ?? []}
              />
            );
          })
        ) : (
          <div>No books found yet!</div>
        )}
      </div>
    </main>
  );
}
