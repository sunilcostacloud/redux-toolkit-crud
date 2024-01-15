import "@/styles/globals.css";

// ** Redux Import
import { Provider } from "react-redux";
import { store } from "@/redux/store";

// ** Third Party Import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  console.log("checkRouter", router.pathname.split("/")[1]);
  useEffect(() => {
    if (router.pathname.split("/")[1] != "crud-operations") {
      sessionStorage.removeItem("search");
      sessionStorage.removeItem("sort");
      sessionStorage.removeItem("status");
      sessionStorage.removeItem("gender");
      sessionStorage.removeItem("page");
    }
    if (router.pathname.split("/")[1] != "data-grid") {
      sessionStorage.removeItem("datagrid_search");
      sessionStorage.removeItem("datagrid_sort");
      sessionStorage.removeItem("datagrid_status");
      sessionStorage.removeItem("datagrid_gender");
      sessionStorage.removeItem("datagrid_page");
    }
  }, [router.pathname]);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer />
    </Provider>
  );
}
