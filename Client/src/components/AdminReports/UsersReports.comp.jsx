import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { notify } from "../../services/Notifications.services";
import { getUsers, getUserDetailsFromDB } from "../../services/AdminServices";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import "./style.css";

export const UsersReports = () => {
  const [users, setUsers] = useState([]);
  const [userDetails, setUserDetails] = useState();
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [IsSort, setIsSort] = useState("Default");
  const navigate = useNavigate();

  const sortReport = (sort) => {
    if (sort === "type") {
      let sorted = [];
      if (IsSort === "desc") {
        setIsSort("asc");
        sorted = users.sort((a, b) => {
          if (a.userType > b.userType) {
            return -1;
          }
          if (a.userType < b.userType) {
            return 1;
          }
          return 0;
        });
      } else {
        setIsSort("desc");
        sorted = users.sort((a, b) => {
          if (a.userType < b.userType) {
            return -1;
          }
          if (a.userType > b.userType) {
            return 1;
          }
          return 0;
        });
      }
      setUsers(sorted);
    } else if (sort === "name") {
      let sorted = [];
      if (IsSort === "desc") {
        setIsSort("asc");
        sorted = users.sort((a, b) => {
          if (a.fullName > b.fullName) {
            return -1;
          }
          if (a.fullName < b.fullName) {
            return 1;
          }
          return 0;
        });
      } else {
        setIsSort("desc");
        sorted = users.sort((a, b) => {
          if (a.fullName < b.fullName) {
            return -1;
          }
          if (a.fullName > b.fullName) {
            return 1;
          }
          return 0;
        });
      }
      setUsers(sorted);
    }
  };

  const getUserDetails = (userID) => {
    console.log(userID);
    getUserDetailsFromDB(userID).then((res) => {
      if (res === "error") {
        notify("error", "Error getting user details");
        return;
      }
      setUserDetails(res);
      setShowUserDetails(true);
    });
  };

  const getAllUsers = () => {
    getUsers().then((res) => {
      if (res === "error") {
        notify("error", "Error getting users");
        return;
      }
      setUsers(res);
    });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="admin-homepage-container">
      <div className="admin-HLS">
        <h1 className="reports">Users Report</h1>
        <div className="next-page-btn">
          <button
            className="btn btn-warning btn-sm"
            onClick={() => navigate("/admin/reports/campaigns")}
          >
            Next Report {">"}
          </button>
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">
              User Type
              <ArrowDropDownOutlinedIcon
                className="dropdown-arr"
                onClick={() => sortReport("type")}
              />
            </th>
            <th scope="col">
              Full Name
              <ArrowDropDownOutlinedIcon
                className="dropdown-arr"
                onClick={() => sortReport("name")}
              />
            </th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => {
              return (
                <tr>
                  <td>{user.userType}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => getUserDetails(user.userID)}
                    >
                      Show more details
                    </button>
                  </td>
                </tr>
              );
            })}
          {showUserDetails && (
            <div className="modal ">
              {/* Modal content */}
              <div className="modal-content user-details">
                <span
                  className="close"
                  onClick={() => setShowUserDetails(false)}
                >
                  &times;
                </span>
                <h1>User Details</h1>
                {/* loop through all the fields of the object */}
                {Object.keys(userDetails).map((key) => {
                  return (
                    <div>
                      <div className="user-HL">
                        <h6>{key.split(/(?=[A-Z])/).join(" ")}: </h6>

                        <h6> {userDetails[key]}</h6>
                      </div>
                      <h6>
                        <hr />
                      </h6>
                    </div>
                  );
                })}

                <button
                  onClick={() => setShowUserDetails(false)}
                  className="donate-back-btn"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};
