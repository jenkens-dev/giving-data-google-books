import Head from "next/head";
import { useState } from "react";
import BookCard from "@/components/BookCard";
import bookStackSVG from "../public/bookStack.svg";
import SearchBar from "@/components/SearchBar";
import { useBookContext } from "@/context/bookContext";

const BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes?q=";

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const {
    state: { foundBooks, selectedBook },
    dispatch,
  } = useBookContext();

  const handleSearchSubmit = async (
    searchValue: string,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsSubmitting(true);
    await fetch(
      `${BOOKS_API_URL}${searchValue}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.items) {
          // handle search not finding any results
          dispatch({ type: "SAVE_FOUND_BOOKS", payload: [] });
          setError(`No books found matching ${searchValue}`);
          setIsSubmitting(false);
        } else {
          dispatch({ type: "SAVE_FOUND_BOOKS", payload: data.items });
          setIsSubmitting(false);
        }
      })
      .catch((err) => {
        setError("An error occurred please try again.");
        console.error(err);
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <Head>
        <title>GivingData Book App</title>
        <meta
          name="description"
          content="Book app that let's you search for books and leave reviews"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center py-24 px-8">
        <h1>GettingBooks</h1>
        <SearchBar
          isSubmitting={isSubmitting}
          handleSearchSubmit={handleSearchSubmit}
        />
        <div>
          <h2 className="inline">My recommended books</h2>
          <span>Haikyuu</span>
          <span>The Martian</span>
          <span>Golden Kamuy</span>
          <span>Gideon the Ninth</span>
        </div>
        <div className="grid grid-cols-2 gap-y-1.5 w-full mt-6 justify-items-center">
          {error && error}
          {!error && !isSubmitting && foundBooks?.length <= 0 ? (
            <div className="col-span-2">Use the search to find books!</div>
          ) : (
            foundBooks.map((book) => {
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
