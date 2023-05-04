import React, { useState, useEffect } from "react";
import { User, useAuth0 } from "@auth0/auth0-react";
import {
  getDeliveries,
  updateDelivered,
} from "../../services/BusinessRep.services";
import { ToastContainer } from "react-toastify";
import { notify } from "../../services/Notifications.services";
import "./style.css";
import { Delivery } from "../../interfaces/interfaces";
import { Notify } from "../../interfaces/enums";

export const PendingDeliveries = () => {
  const { user }: User | undefined = useAuth0();
  const [pendingDeliveries, setPendingDeliveries] = useState<Delivery[]>([]);

  const getPendingDeliveries = (email: string) => {
    getDeliveries(email).then((res: Delivery[]) => {
      if (res === null) {
        notify(Notify.Error, "Server Error, please try again later");
      }
      console.log(res);
      setPendingDeliveries(res);
    });
  };

  const handleDelivered = (id: string) => {
    console.log(id);
    updateDelivered(id).then((isUpdated: boolean) => {
      if (isUpdated) {
        notify(Notify.Success, "Delivery updated successfully");
        getPendingDeliveries(user.email);
      } else {
        notify(Notify.Error, "Server Error, please try again later");
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
