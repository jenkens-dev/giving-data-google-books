import { Dispatch } from "@/context/bookContext";

const BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes?q=";

export const fetchGoogleBooksData = async (
  searchValue: string,
  dispatch: Dispatch,
  setError: (errorMessage: string) => void,
  setIsSubmitting: (isSubmitting: boolean) => void
) => {
  setIsSubmitting(true);
  setError("");
  try {
    const response = await fetch(
      `${BOOKS_API_URL}${searchValue}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
    );
    const data = await response.json();
    if (data.items) {
      dispatch({ type: "SAVE_FOUND_BOOKS", payload: data.items });
      setIsSubmitting(false);
    } else {
      // handle search not finding any results
      dispatch({ type: "SAVE_FOUND_BOOKS", payload: [] });
      setError(`No books found matching ${searchValue}`);
      setIsSubmitting(false);
    }
    console.log(data);
  } catch (err) {
    setError("An error occurred please try again.");
    setIsSubmitting(false);
    console.error(err);
  }
};
