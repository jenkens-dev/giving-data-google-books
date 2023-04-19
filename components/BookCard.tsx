import Image from "next/image";

interface BookCardProps {
  thumbnail: string | undefined;
  title: string;
}

export default function BookCard({ thumbnail, title }: BookCardProps) {
  return (
    <div className="rounded-sm border border-gray-100">
      {thumbnail && (
        <Image
          src={thumbnail}
          alt={`Thumbnail picture of ${title}`}
          width="200"
          height="300"
          className="object-fill"
        />
      )}
      <p>{title}</p>
    </div>
  );
}
