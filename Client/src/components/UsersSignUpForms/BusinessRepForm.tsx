import React from "react";
import { FormProps } from "./SignUpForms.interfaces";

export const BusinessRepForm = ({ newUser, setNewUser }: FormProps) => {
  return (
    <>
      <div className="input">
        <input
          className="form-control"
          type="text"
          name="FullName"
          placeholder="Full name"
          required
          onChange={(o) => {
            setNewUser({ ...newUser, fullName: o.target.value });
          }}
        />
      </div>
      <div className="input">
        <input
          className="form-control"
          type="email"
          name="Email"
          placeholder="Email address"
          required
          onChange={(o) => {
            setNewUser({ ...newUser, email: o.target.value });
          }}
        />
      </div>
      <div className="input">
        <input
          className="form-control"
          type="text"
          name="Company"
          placeholder="Company name"
          required
          onChange={(o) => {
            setNewUser({ ...newUser, company: o.target.value });
          }}
        />
      </div>
    </>
  );
};
