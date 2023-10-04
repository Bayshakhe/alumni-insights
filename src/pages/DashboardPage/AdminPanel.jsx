import React from "react";
import { useGetAllStudentsQuery } from "../../redux/services/studentsService";
import CustomizeTable from "../../components/CustomizeTable";

const AdminPanel = () => {
  const { data } = useGetAllStudentsQuery();
  const adminData = data?.filter((a) => a.status === "admin");
  //   console.log(adminData);
  return (
    <div>
      <CustomizeTable adminData={adminData} />
    </div>
  );
};

export default AdminPanel;
