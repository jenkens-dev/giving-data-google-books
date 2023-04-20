import { useRouter } from "next/router";

export default function BookDetails() {
  const router = useRouter();
  const data = router.query;
  console.log(data);
  return <div>Book Details</div>;
}
