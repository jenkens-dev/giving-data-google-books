import { useState } from "react"

const BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes?q=";

interface BookData {
  id: string;
  volumeInfo: {
    title: string;
    categories?: string[];
    publisher?: string;
    authors: string[];
    description: string;
    infoLink: string;
    imageLinks?: {
      thumbnail: string;
    }
    publishedDate: string;
  }
}

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [bookData, setBookData] = useState<BookData[]>([])

  const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await fetch(`${BOOKS_API_URL}${searchValue}&key=${process.env.NEXT_PUBLIC_API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
      setBookData(data.items)
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
      <div>
        {bookData.map((book) => {
          return (
              <div key={book.id}>{book.volumeInfo.title}</div>
            );
          })
        }
      </div>
    </main>
  )
}
