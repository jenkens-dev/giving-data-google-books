## Tech Stack

- Next.js using [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
- [TypeScript](https://nextjs.org/docs/basic-features/typescript)
- TailwindCSS

## Getting Started

- Clone this repo to your local machine and navigate into the associated folder
- Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This app interacts with the Google Books API and in order to run it locally you will be an API key or OAuth 2.0 token. Check out the [Google Books API documentation](https://developers.google.com/books/docs/v1/using#APIKey) for more information.

## Features

- [x] The home page should display a search bar that allows the user to search for books that match a keyword.
- [x] Searching for a term should query the Google Books API to display a list of books that match the term.
- [x] The home page should display the collection of books that match the search results.
- [x] Clicking a book on the home page should open a more detailed view of the selected book.
- [x] The book details page should also include a reviews section, allowing the user to provide a review for the book. Initially, this section will be blank, but submitting a review should persist to the browser’s local storage.

### Future Iterations

- [ ] Pagination
- [ ] Expanding the search bar to specify searches like `inauthor:` or `intitle:`
- [ ] Allow star value in addition to text reviews

## Deployment

This project is deployed using Vercel. Feel free to poke around the [live site](https://giving-data-google-books.vercel.app/).

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
