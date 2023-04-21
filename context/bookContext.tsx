import { createContext, useReducer, useContext } from "react";

type Action = { type: "SAVE_FOUND_BOOKS" } | { type: "SAVE_SELECTED_BOOK" };
type Dispatch = (action: Action) => void;
type State = { foundBooks: []; selectedBook: {} };
type BookProviderProps = { children: React.ReactNode };

const BookStateContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function bookReducer(state: State, action: Action) {
  switch (action.type) {
    case "SAVE_FOUND_BOOKS": {
      return state;
    }
    case "SAVE_SELECTED_BOOK": {
      return state;
    }
    default: {
      return state;
    }
  }
}

function BookProvider({ children }: BookProviderProps) {
  const [state, dispatch] = useReducer(bookReducer, {
    foundBooks: [],
    selectedBook: {},
  });
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
