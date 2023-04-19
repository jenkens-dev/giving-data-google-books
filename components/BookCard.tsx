import Image from "next/image";

interface BookCardProps {
  thumbnail: string;
  title: string;
  authors: string[];
}

export default function BookCard({ thumbnail, title, authors }: BookCardProps) {
  return (
    <div className="rounded-sm border border-stone-600 bg-white p-4 relative">
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
