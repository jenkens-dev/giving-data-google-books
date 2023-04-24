import Head from "next/head";
import { useState } from "react";
import BookCard from "@/components/BookCard";
import bookStackSVG from "../public/bookStack.svg";
import SearchBar from "@/components/SearchBar";
import { useBookContext } from "@/context/bookContext";
import { fetchGoogleBooksData } from "@/utils";

const RECOMMENDED_BOOKS = [
  "Haikyuu",
  "The Martian",
  "Golden Kamuy",
  "Gideon the Ninth",
];

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const {
    state: { foundBooks },
    dispatch,
  } = useBookContext();

  const handleSearchSubmit = async (
    searchValue: string,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    fetchGoogleBooksData(searchValue, dispatch, setError, setIsSubmitting);
  };

  const handleRecommendedClick = async (
    event: React.MouseEvent<HTMLSpanElement>
  ) => {
    const searchValue = event.currentTarget.innerText;
    fetchGoogleBooksData(searchValue, dispatch, setError, setIsSubmitting);
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
        <h1 className="font-bold text-5xl mb-6 text-[#03518f]">
          Getting{" "}
          <span className="relative">
            <span
              className="block absolute -inset-1 -skew-y-3 bg-[#e67e2233]"
              aria-hidden="true"
            ></span>
            <span className="relative text-[#e67e22]">Books</span>
          </span>
        </h1>
        <SearchBar
          isSubmitting={isSubmitting}
          handleSearchSubmit={handleSearchSubmit}
        />
        <div>
          <h2 className="font-semibold text-lg inline">
            My recommended books:
          </h2>
          {RECOMMENDED_BOOKS.map((book) => {
            return (
              <span
                key={book}
                onClick={(event) => handleRecommendedClick(event)}
                className="ml-2 text-orange-900 underline"
              >
                {book}
              </span>
            );
          })}
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
