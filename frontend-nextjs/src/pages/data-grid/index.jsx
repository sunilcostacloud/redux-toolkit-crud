import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  return (
    <div>
      <button onClick={() => router.push("/")}>Home</button>
      <h1>Data Grid</h1>
    </div>
  );
};

export default Index;
