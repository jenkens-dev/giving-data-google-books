import Image from "next/image";
import Link from "next/link";
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
    <>
      <Link
        href="/"
        className="block text-xl underline text-orange-900 mx-6 mt-4"
      >
        Back
      </Link>
      <div className="w-2/3 my-12 mx-auto flex gap-x-8">
        <Image
          src={thumbnail as string}
          alt={`Thumbnail picture of ${title}`}
          width="250"
          height="350"
          style={{
            minWidth: 250,
            minHeight: 350,
            maxWidth: 250,
            maxHeight: 350,
          }}
        />
        <div className="flex flex-col gap-y-3.5">
          <h1 className="font-bold text-5xl">{title}</h1>
          <div>
            <p className="italic text-slate-600 text-2xl">{authors}</p>
            <p className="text-slate-500">Published: {publishedDate}</p>
          </div>
          <p className="text-lg">{description}</p>
          <h2 className="font-semibold text-3xl">Saved Reviews</h2>
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
              className="text-white bg-orange-900 hover:bg-orange-950 font-medium rounded-sm text-md px-4 py-2 mt-4"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
