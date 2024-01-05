import { useRouter } from "next/router";

const UsersData = () => {
  const router = useRouter();
  return (
    <div>
      <button onClick={() => router.push("/")}>Home</button>
      <h1>UsersData</h1>
    </div>
  );
};

export default UsersData;
