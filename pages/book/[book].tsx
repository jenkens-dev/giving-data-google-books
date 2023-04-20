import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BookDetails() {
  const router = useRouter();
  const bookData = router.query;
  const { id, thumbnail, title, authors, description, publishedDate } =
    bookData;

  const [review, setReview] = useState("");

  const handleReviewSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem(id as string, review);
    setReview("");
  };

  const handleReviewTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReview(event.target.value);
  };

  useEffect(() => {
    const previousReview = localStorage.getItem(id as string);
    if (previousReview) {
      setReview(previousReview);
    }
  }, [id]);

  return (
    <div>
      <h1>{title}</h1>
      <Image
        src={thumbnail as string}
        alt={`Thumbnail picture of ${title}`}
        width="200"
        height="300"
      />
      <p>Published {publishedDate}</p>
      <p>Author(s) {authors}</p>
      <p>{description}</p>
      <div>
        <h2>Reviews</h2>
        {review}
        <form onSubmit={handleReviewSubmit}>
          <textarea
            required
            value={review}
            onChange={handleReviewTextAreaChange}
            placeholder="Review"
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-orange-900 hover:bg-orange-950 font-medium rounded-sm text-md px-4 py-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
