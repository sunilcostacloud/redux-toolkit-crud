import { getUsersDataAction } from "@/redux/features/usersDataSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UsersData = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const usersData = useSelector((state) => state.userData.usersData);
  const usersDataIsLoading = useSelector(
    (state) => state.userData.usersDataIsLoading
  );
  const usersDataIsError = useSelector(
    (state) => state.userData.usersDataIsError
  );
  const usersDataError = useSelector((state) => state.userData.usersDataError);
  const usersDataIsSuccess = useSelector(
    (state) => state.userData.usersDataIsSuccess
  );

  useEffect(() => {
    dispatch(getUsersDataAction());
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
      <button onClick={() => router.push("/")}>Home</button>
      <h1>UsersData</h1>
      <div>
        {usersDataIsLoading ? (
          <div>Loading...</div>
        ) : usersDataIsError ? (
          <div>{usersDataError}</div>
        ) : usersDataIsSuccess && usersData.data.length === 0 ? (
          <div>Data not found</div>
        ) : usersDataIsSuccess ? (
          <div>
            <div style={gridContainerStyle}>
              {usersData?.data?.map((user) => (
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
  );
};

export default UsersData;
