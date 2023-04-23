import { BookData } from "@/models/BookModel";
import { createContext, useReducer, useContext } from "react";

type Action =
  | { type: "SAVE_FOUND_BOOKS"; payload: BookData[] }
  | { type: "SAVE_SELECTED_BOOK"; payload: BookData };
export type Dispatch = (action: Action) => void;
type State = { foundBooks: BookData[] | []; selectedBook: BookData };
type BookProviderProps = { children: React.ReactNode };

const initialState = {
  foundBooks: [],
  selectedBook: {
    id: "",
    volumeInfo: {
      title: "",
      categories: [""],
      publisher: "",
      authors: [""],
      description: "",
      infoLink: "",
      imageLinks: {
        thumbnail: "",
      },
      publishedDate: "",
    },
  },
};

const BookStateContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function bookReducer(state: State, action: Action) {
  switch (action.type) {
    case "SAVE_FOUND_BOOKS": {
      return {
        ...state,
        foundBooks: action.payload,
      };
    }
    case "SAVE_SELECTED_BOOK": {
      return {
        ...state,
        selectedBook: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

function BookProvider({ children }: BookProviderProps) {
  const [state, dispatch] = useReducer(bookReducer, initialState);
  const value = { state, dispatch };
  return (
    <BookStateContext.Provider value={value}>
      {children}
    </BookStateContext.Provider>
  );
}

function useBookContext() {
  const context = useContext(BookStateContext);
  if (context === undefined) {
    throw new Error("useBookContext must be used within BookProvider");
  }
  return context;
}

export { BookProvider, useBookContext };
