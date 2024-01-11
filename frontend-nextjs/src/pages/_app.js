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

  useEffect(() => {
    if (router.pathname != "/crud-operations") {
      sessionStorage.removeItem("search");
      sessionStorage.removeItem("sort");
      sessionStorage.removeItem("status");
      sessionStorage.removeItem("gender");
      sessionStorage.removeItem("page");
    } else if (router.pathname != "/data-grid") {
      sessionStorage.removeItem("search");
      sessionStorage.removeItem("sort");
      sessionStorage.removeItem("status");
      sessionStorage.removeItem("gender");
      sessionStorage.removeItem("page");
    }
  }, [router.pathname]);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer />
    </Provider>
  );
}
