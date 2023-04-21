import Head from "next/head";
import { useState } from "react";
import BookCard from "@/components/BookCard";
import bookStackSVG from "../public/bookStack.svg";
import SearchBar from "@/components/SearchBar";

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
  const [foundBookData, setFoundBookData] = useState<BookData[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchSubmit = async (
    searchValue: string,
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
        if (!data.items) {
          // handle search not finding any results
          setFoundBookData([]);
          setIsSubmitting(false);
        } else {
          setFoundBookData(data.items);
          setIsSubmitting(false);
        }
      })
      .catch((err) => {
        setError(err);
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
        <SearchBar
          isSubmitting={isSubmitting}
          handleSearchSubmit={handleSearchSubmit}
        />
        <div className="grid grid-cols-2 gap-y-1.5 w-full mt-6 justify-items-center">
          {error && <div>An error occurred please try again.</div>}
          {!error && !isSubmitting && foundBookData?.length <= 0 ? (
            <div className="col-span-2">Use the search to find books!</div>
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
                  description={book.volumeInfo.description}
                  publishedDate={book.volumeInfo.publishedDate}
                />
              );
            })
          )}
        </div>
      </main>
    </>
  );
}
