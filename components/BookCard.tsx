import Image from "next/image";
import { useRouter } from "next/router";

interface BookCardProps {
  thumbnail: string;
  title: string;
  authors: string[];
  id: string;
}

export default function BookCard({
  thumbnail,
  title,
  authors,
  id,
}: BookCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push({
      pathname: `/book/${id}`,
      query: { title, thumbnail, authors },
    });
  };

  return (
    <div
      className="w-1/2 rounded-sm border border-stone-500 hover:border-stone-900 bg-white p-4 relative cursor-pointer"
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
        return (
          <p key={author} className="absolute bottom-0">
            {author}
          </p>
        );
      })}
    </div>
  );
}
