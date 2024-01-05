import { useGetUsersListQuery } from "@/redux/features/usersSlice";
import { useRouter } from "next/router";

const UsersRtk = () => {
  const router = useRouter();
  const { data, isFetching, isSuccess, isError, error, refetch } =
    useGetUsersListQuery();

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
      <button onClick={() => router.push("/")}>Home</button>
      <h1>Users RTK</h1>
      <div>
        {isFetching ? (
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            Loading...
          </div>
        ) : isError ? (
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <h4>{error}</h4>
          </div>
        ) : data?.data?.length == 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <h1>No Data Found</h1>
          </div>
        ) : isSuccess ? (
          <>
            <div style={gridContainerStyle}>
              {data?.data?.map((user) => (
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
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default UsersRtk;
