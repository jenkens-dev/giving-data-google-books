import Head from "next/head";
import { useState } from "react";
import BookCard from "@/components/BookCard";
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
  const [foundBookData, setFoundBookData] = useState<BookData[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    setFoundBookData([]);
    event.preventDefault();
    setIsSubmitting(true);
    await fetch(
      `${BOOKS_API_URL}${searchValue}&key=${process.env.NEXT_PUBLIC_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFoundBookData(data.items);
        setIsSubmitting(false);
        setSearchValue("");
      })
      .catch((err) => {
        setError(err);
        setIsSubmitting(false);
      });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta
          name="description"
          content="Book app that let's you search for books and leave reviews"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
              {isSubmitting ? "Loading" : "Search"}
            </button>
          </div>
        </form>
        <div className="grid grid-cols-2 gap-y-1.5 w-full mt-6">
          {error && <div>An error occurred please try again.</div>}
          {!error && foundBookData?.length <= 0 ? (
            <div>Use the search to find books!</div>
          ) : (
            foundBookData.map((book) => {
              return (
                <BookCard
                  key={book.id}
                  thumbnail={
                    book.volumeInfo.imageLinks?.thumbnail ?? bookStackSVG
                  }
                  title={book.volumeInfo.title}
                  authors={book.volumeInfo.authors ?? ["No author found"]}
                  id={book.id}
                />
              );
            })
          )}
        </div>
      </main>
    </>
  );
}
