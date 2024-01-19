import Test from "@/components/data-grid/Test";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import AccountTable from "@/components/data-grid/DataGridWithSearchAndPaginationFrontend";

const DataGridTable = dynamic(
  () => import("../../components/data-grid/DataGridTable"),
  {
    ssr: false,
    loading: () => (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    ),
  }
);

const Index = () => {
  const router = useRouter();
  return (
    <div>
      <button onClick={() => router.push("/")}>Home</button>
      <h1>Data Grid</h1>
      {/* <DataGridTable /> */}
      {/* <Test /> */}
      <AccountTable />
    </div>
  );
};

export default Index;
