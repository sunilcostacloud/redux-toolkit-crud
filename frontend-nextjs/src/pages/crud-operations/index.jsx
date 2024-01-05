import { useRouter } from "next/router";

const CrudOperations = () => {
  const router = useRouter();
  return (
    <div>
      <button onClick={() => router.push("/")}>Home</button>
      <h1>CrudOperations</h1>
    </div>
  );
};

export default CrudOperations;
