import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useBookContext } from "@/context/bookContext";

interface BookCardProps {
  thumbnail: string;
  title: string;
  authors: string[];
  id: string;
  description: string;
  publishedDate: string;
}

export default function BookCard({
  thumbnail,
  title,
  authors,
  id,
  description,
  publishedDate,
}: BookCardProps) {
  const router = useRouter();
  const {
    state: { foundBooks },
    dispatch,
  } = useBookContext();

  const bookDetailsURLObject = {
    pathname: `/book/${id}`,
    // query: { id },
  };

  const handleClick = () => {
    const selectedBook = foundBooks.find((book) => {
      return book.id === id;
    });
    if (selectedBook) {
      dispatch({ type: "SAVE_SELECTED_BOOK", payload: selectedBook });
      // router.push(`/book/${id}`);
      router.push(bookDetailsURLObject);
    }
  };

  return (
    <div
      className="relative flex flex-col items-center w-1/2 rounded-sm border border-stone-500 hover:border-stone-900 bg-white cursor-pointer p-2"
      onClick={handleClick}
    >
      <Image
        src={thumbnail}
        alt={`Thumbnail picture of ${title}`}
        width="200"
        height="300"
      />
      <div className="w-full bg-gray-50 absolute bottom-0 border-t border-stone-500 px-4 py-2">
        <p className="font-semibold text-lg">{title}</p>
        {authors.map((author) => {
          return (
            <p className="text-sm text-slate-500" key={author}>
              {author}
            </p>
          );
        })}
        <Link href={bookDetailsURLObject} className="text-orange-900 underline">
          Book Details
        </Link>
      </div>
    </div>
  );
}
