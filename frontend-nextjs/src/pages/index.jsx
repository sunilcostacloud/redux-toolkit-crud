import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const HomePage = () => {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("https://reqres.in/api/users?page=2");
      setData(data?.data);
      setIsSuccess(true);
      setIsError(false);
      setError("");
    } catch (error) {
      setIsError(true);
      setError(error.response.data.message);
      setIsSuccess(false);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const gridContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "16px",
  };

  const userCardStyle = {
    border: "1px solid #ccc",
    padding: "16px",
    textAlign: "center",
  };

  const userImageStyle = {
    maxWidth: "100%",
    borderRadius: "50%",
  };

  return (
    <div>
      <button onClick={() => router.push("/counter")}>Counter</button>
      <button onClick={() => router.push("/todo")}>Todo</button>
      <button onClick={() => router.push("/users-data")}>Users Data</button>
      <button onClick={() => router.push("/users-rtk")}>Users RTK</button>
      <button onClick={() => router.push("/crud-operations")}>
        Crud Operations
      </button>
      <button onClick={() => router.push("/data-grid")}>Data Grid</button>
      <div>
        <h1>Direct Api Call</h1>
        <div>
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>{error}</div>
          ) : isSuccess && data.length === 0 ? (
            <div>Data not found</div>
          ) : isSuccess ? (
            <div>
              <div style={gridContainerStyle}>
                {data?.map((user) => (
                  <div key={user.id} style={userCardStyle}>
                    <img
                      src={user.avatar}
                      alt={`${user.first_name} ${user.last_name}`}
                      style={userImageStyle}
                    />
                    <div>
                      <p>{`${user.first_name} ${user.last_name}`}</p>
                      <p>Email: {user.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
