import DataGridTable from "@/components/data-grid/DataGridTable";
import Test from "@/components/data-grid/Test";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  return (
    <div>
      <button onClick={() => router.push("/")}>Home</button>
      <h1>Data Grid</h1>
      <DataGridTable />
      <Test />
    </div>
  );
};

export default Index;
