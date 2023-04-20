import Image from "next/image";
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

  const handleClick = () => {
    router.push({
      pathname: `/book/${id}`,
      query: { title, thumbnail, authors, description, publishedDate },
    });
  };

  return (
    <div
      className="w-1/2 rounded-sm border border-stone-500 hover:border-stone-900 bg-white p-4 cursor-pointer"
      onClick={handleClick}
    >
      <Image
        src={thumbnail}
        alt={`Thumbnail picture of ${title}`}
        width="200"
        height="300"
      />
      <p>{title}</p>
      {authors.map((author) => {
        return <p key={author}>{author}</p>;
      })}
    </div>
  );
}
