import { Dispatch } from "@/context/bookContext";

const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";

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
      `${GOOGLE_BOOKS_API_URL}?q=${searchValue}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
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

export const fetchVolumeDataById = async (
  routerId: string | string[],
  dispatch: Dispatch
) => {
  try {
    const response = await fetch(
      `${GOOGLE_BOOKS_API_URL}/${routerId}?key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
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
  } catch (err) {
    console.error(err);
  }
};
