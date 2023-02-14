import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getDeliveries,
  updateDelivered,
} from "../../services/BusinessRep.services";
import { ToastContainer } from "react-toastify";
import { notify } from "../../services/Notifications.services";
import "./style.css";

export const PendingDeliveries = () => {
  const { user } = useAuth0();
  const [pendingDeliveries, setPendingDeliveries] = useState([]);

  const getPendingDeliveries = (email) => {
    getDeliveries(email).then((res) => {
      if (res === null) {
        notify("error", "Server Error, please try again later");
      }
      setPendingDeliveries(res);
    });
  };

  const handleDelivered = (id) => {
    console.log(id);
    updateDelivered(id).then((isUpdated) => {
      if (isUpdated) {
        notify("success", "Delivery updated successfully");
        getPendingDeliveries(user.email);
      } else {
        notify("error", "Server Error, please try again later");
      }
    });
  };

  useEffect(() => {
    getPendingDeliveries(user.email);
  }, []);

  return (
    <div className="admin-homepage-container prd-tbl">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Product ID</th>
            <th scope="col">Full Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        <tbody>
          {pendingDeliveries &&
            pendingDeliveries.map((delivery) => {
              return (
                <tr>
                  <td>{delivery.PID}</td>
                  <td>{delivery.FullName}</td>
                  <td>{delivery.Email}</td>
                  <td>{delivery.Address}</td>
                  <td>{delivery.Phone}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleDelivered(delivery.ProductSerialNumber)
                      }
                      className="btn btn-outline-success btn-sm"
                    >
                      Delivered
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};
