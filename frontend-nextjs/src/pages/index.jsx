import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.push("/counter")}>Counter</button>
      <button onClick={() => router.push("/todo")}>Todo</button>
      <button onClick={() => router.push("/users-data")}>Users Data</button>
      <button onClick={() => router.push("/crud-operations")}>
        Crud Operations
      </button>
    </div>
  );
};

export default HomePage;
