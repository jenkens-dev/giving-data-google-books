import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { BookProvider } from "../context/bookContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BookProvider>
      <Component {...pageProps} />
    </BookProvider>
  );
}
