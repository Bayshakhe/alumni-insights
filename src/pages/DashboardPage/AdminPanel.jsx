import React from "react";
import { useGetAllStudentsQuery } from "../../redux/services/studentsService";
import CustomizeTable from "../../components/CustomizeTable";
import useLoggedUser from "../../hooks/useLoggedUser";

const AdminPanel = () => {
  const { data } = useGetAllStudentsQuery();
  const { loggedUser } = useLoggedUser();
  const adminData = data?.filter((a) => a.status === "admin");
  //   console.log(adminData);
  return (
    <div>
      <CustomizeTable adminData={adminData} />
    </div>
  );
};

export default AdminPanel;
