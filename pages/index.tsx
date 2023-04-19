import { useState } from "react"

const BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes?q=";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const results = await fetch(`${BOOKS_API_URL}${searchValue}&key=${process.env.NEXT_PUBLIC_API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
    })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={handleSearchSubmit}>
        <label>Search:
          <input type="search" value={searchValue || ""} required placeholder="Book keyword" onChange={handleInputChange}/>
        </label>
        <button type="submit">Search</button>
      </form>
    </main>
  )
}
