import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BookDetails() {
  const [review, setReview] = useState("");
  const [savedReview, setSavedReview] = useState("");
  const router = useRouter();
  const bookData = router.query;
  const { id, thumbnail, title, authors, description, publishedDate } =
    bookData;

  const handleReviewSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem(id as string, review);
    setReview("");
    setSavedReview(review);
  };

  const handleReviewTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReview(event.target.value);
  };

  useEffect(() => {
    const previousReview = localStorage.getItem(id as string);
    if (previousReview) {
      setSavedReview(previousReview);
    }
  }, [id]);

  return (
    <div className="w-2/3 my-12 mx-24 flex gap-x-6">
      <Image
        src={thumbnail as string}
        alt={`Thumbnail picture of ${title}`}
        width="250"
        height="350"
        style={{ minWidth: 250, minHeight: 350, maxWidth: 250, maxHeight: 350 }}
      />
      <div className="flex flex-col gap-y-4">
        <h1 className="font-bold text-2xl">{title}</h1>
        <p>Published: {publishedDate}</p>
        <p>{authors}</p>
        <p>{description}</p>
        <h2 className="font-bold text-xl">Saved Reviews</h2>
        {savedReview || "There are no reviews for this book."}
        <form onSubmit={handleReviewSubmit}>
          <label htmlFor="bookReview" className="sr-only">
            Enter your review
          </label>
          <textarea
            id="bookReview"
            required
            value={review}
            onChange={handleReviewTextAreaChange}
            placeholder="Enter your review"
            rows={8}
            className="block w-full rounded-sm"
          />
          <button
            type="submit"
            className="text-white bg-orange-900 hover:bg-orange-950 font-medium rounded-sm text-md px-4 py-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
