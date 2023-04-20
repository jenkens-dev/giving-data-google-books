import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

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

  const bookDetailsURLObject = {
    pathname: `/book/${id}`,
    query: { id, title, thumbnail, authors, description, publishedDate },
  };

  const handleClick = () => {
    router.push(bookDetailsURLObject);
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
        className=""
      />
      <div className="w-full bg-gray-50 absolute bottom-0 border-t border-stone-500 pl-4 py-2">
        <p>{title}</p>
        {authors.map((author) => {
          return <p key={author}>{author}</p>;
        })}
        <Link href={bookDetailsURLObject} className="underline">
          Book Details
        </Link>
      </div>
    </div>
  );
}
