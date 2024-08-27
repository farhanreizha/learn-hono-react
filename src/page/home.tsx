import { useGetQuery } from "@/query/get";

export default function Home() {
  const { data: get } = useGetQuery();

  return (
    <div className="flex flex-col">
      <span>{get?.data.title}</span>
      <span>{get?.data.desc}</span>
    </div>
  );
}
