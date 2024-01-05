import { useRouter } from "next/router";

const EmployeesProfile = () => {
  const router = useRouter();
  const id = router.query.employee;
  console.log(id);
  return <div>EmployeesProfile</div>;
};

export default EmployeesProfile;
