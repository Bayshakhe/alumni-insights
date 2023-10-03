import React from "react";
import {
  useMakeAdminMutation,
  useRemoveAdminMutation,
} from "../redux/services/studentsService";
import Swal from "sweetalert2";

const useAdminOperation = () => {
  const [makeAdmin] = useMakeAdminMutation();
  const [removeAdmin] = useRemoveAdminMutation();

  const handleAdminOperation = async (id, name, operationType, refetch) => {
    const operationAsync = async () => {
      try {
        let res;
        let addAdminText = `${name} is now an Admin.`;
        let removeAdminText = `${name} is remove from admin panel.`;
        if (operationType === "makeAdmin") {
          res = await makeAdmin(id);
        } else if (operationType === "removeAdmin") {
          res = await removeAdmin(id);
        }
        console.log(res);
        if (res?.data?.modifiedCount > 0) {
          Swal.fire(
            "Done!",
            `${operationType === "makeAdmin" ? addAdminText : removeAdminText}`,
            "success"
          );
          refetch();
        }
      } catch (error) {
        console.error(error);
        Swal.fire(
          "Error",
          `An error occurred while ${
            operationType === "makeAdmin" ? "making" : "removing"
          } the student an admin`,
          "error"
        );
      }
    };

    const confirmText =
      operationType === "makeAdmin" ? "Yes, make it!" : "Yes, remove it!";
    const title =
      operationType === "makeAdmin"
        ? "Make this student Admin?"
        : "Remove from admin panel?";

    Swal.fire({
      title,
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        operationAsync();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "", "error");
      }
    });
  };
  return handleAdminOperation;
};

export default useAdminOperation;
