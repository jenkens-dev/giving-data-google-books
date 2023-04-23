import { Dispatch } from "@/context/bookContext";

const BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes?q=";

export const fetchGoogleBooksData = async (
  searchValue: string,
  dispatch: Dispatch,
  setError: (errorMessage: string) => void,
  setIsSubmitting: (isSubmitting: boolean) => void
) => {
  setIsSubmitting(true);
  return fetch(
    `${BOOKS_API_URL}${searchValue}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (!data.items) {
        // handle search not finding any results
        dispatch({ type: "SAVE_FOUND_BOOKS", payload: [] });
        setError(`No books found matching ${searchValue}`);
        setIsSubmitting(false);
      } else {
        dispatch({ type: "SAVE_FOUND_BOOKS", payload: data.items });
        setIsSubmitting(false);
      }
    })
    .catch((err) => {
      setError("An error occurred please try again.");
      console.error(err);
      setIsSubmitting(false);
    });
};
