import Head from "next/head";
import { useState } from "react";
import BookCard from "@/components/BookCard";
import bookStackSVG from "../public/bookStack.svg";
import SearchBar from "@/components/SearchBar";
import { starterSelectedBook, useBookContext } from "@/context/bookContext";
import { fetchGoogleBooksData } from "@/utils";
import { useRouter } from "next/router";

const RECOMMENDED_BOOKS = [
  { bookTitle: "Golden Kamuy", bookId: "5z4lvgAACAAJ" },
  { bookTitle: "The Martian", bookId: "OPAgEAAAQBAJ" },
  { bookTitle: "The Unbroken", bookId: "E5HvDwAAQBAJ" },
  { bookTitle: "The Jasmine Throne", bookId: "cAz1DwAAQBAJ" },
];

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const {
    state: { foundBooks },
    dispatch,
  } = useBookContext();
  const router = useRouter();

  const handleSearchSubmit = async (
    searchValue: string,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    fetchGoogleBooksData(searchValue, dispatch, setError, setIsSubmitting);
  };

  const handleRecommendedClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    const bookId = event.currentTarget.id;
    dispatch({ type: "RESET_SELECTED_BOOK", payload: starterSelectedBook });
    router.push({ pathname: `/book/${bookId}` });
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
          {RECOMMENDED_BOOKS.map(({ bookTitle, bookId }) => {
            return (
              <span
                key={bookId}
                id={bookId}
                onClick={(event) => handleRecommendedClick(event)}
                className="ml-2 text-orange-900 underline cursor-pointer"
              >
                {bookTitle}
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
                  key={book.etag}
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
