import Image from "next/image";
import Link from "next/link";
import bookStackSVG from "../../public/bookStack.svg";
import { useEffect, useState } from "react";
import { useBookContext } from "@/context/bookContext";
import { useRouter } from "next/router";

const BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";

export default function BookDetails() {
  const [review, setReview] = useState("");
  const [savedReview, setSavedReview] = useState("");
  const router = useRouter();
  const routerId = router.query.bookId;

  const {
    state: {
      selectedBook: {
        id,
        volumeInfo: {
          title,
          description,
          authors = ["No authors found"],
          publishedDate,
          imageLinks: { thumbnail } = { thumbnail: bookStackSVG },
        },
      },
    },
    dispatch,
  } = useBookContext();

  const handleTextAreaEnter = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      handleReviewSubmit(event);
    }
  };

  const handleReviewSubmit = (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    localStorage.setItem(id, JSON.stringify(review));
    setReview("");
    setSavedReview(review);
  };

  const handleReviewTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReview(event.target.value);
  };

  const handleReviewDelete = () => {
    localStorage.removeItem(id);
    setSavedReview("");
  };

  useEffect(() => {
    if (localStorage.getItem(id)) {
      const previousReview = JSON.parse(localStorage.getItem(id)!);
      setSavedReview(previousReview);
    }
  }, [id]);

  useEffect(() => {
    // handle page refresh when state is lost and recommended books data
    if (routerId && !id) {
      try {
        const fetchVolumeById = async () => {
          const response = await fetch(
            `${BOOKS_API_URL}/${routerId}?key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
          );
          const data = await response.json();
          if (data) {
            // google books volume query returns description with html tags inside
            // use replace regex to remove all tags
            const descriptionWithoutTags = data.volumeInfo.description.replace(
              /<[^>]*>?/gm,
              ""
            );
            const bookData = {
              ...data,
              volumeInfo: {
                ...data.volumeInfo,
                description: descriptionWithoutTags,
              },
            };
            dispatch({ type: "SAVE_SELECTED_BOOK", payload: bookData });
          }
        };
        fetchVolumeById();
      } catch (err) {
        console.error(err);
      }
    }
  }, [routerId]);

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
          src={thumbnail || bookStackSVG}
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
            {authors.map((author) => {
              return (
                <p key={author} className="italic text-slate-600 text-2xl">
                  {author}
                </p>
              );
            })}
            <p className="text-slate-500">Published: {publishedDate}</p>
          </div>
          <p className="text-lg">{description}</p>
          <h2 className="font-semibold text-3xl">Saved Reviews</h2>
          {savedReview ? (
            <div>
              <span>{savedReview}</span>
              <button
                onClick={handleReviewDelete}
                className="text-white bg-orange-900 hover:bg-orange-950 font-medium rounded-sm text-md px-4 py-2 ml-2"
              >
                Delete
              </button>
            </div>
          ) : (
            "There are no reviews for this book."
          )}
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
              onKeyDown={handleTextAreaEnter}
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
