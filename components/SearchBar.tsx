import { useState } from "react";

interface SearchBarProps {
  isSubmitting: boolean;
  handleSearchSubmit: (
    searchValue: string,
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
}

export default function SearchBar({
  isSubmitting,
  handleSearchSubmit,
}: SearchBarProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    handleSearchSubmit(searchValue, event);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <form onSubmit={handleFormSubmit} className="w-9/12">
      <label className="sr-only" htmlFor="bookSearch">
        Search books
      </label>
      <div className="relative">
        <input
          type="search"
          id="bookSearch"
          value={searchValue || ""}
          required
          placeholder="Search books..."
          onChange={handleInputChange}
          autoComplete="off"
          className="block w-full p-4 text-md text-gray-900 placeholder-gray-600 border border-stone-600 rounded-sm"
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-orange-900 hover:bg-orange-950 font-medium rounded-sm text-md px-4 py-2"
        >
          {isSubmitting ? "Loading" : "Search"}
        </button>
      </div>
    </form>
  );
}
