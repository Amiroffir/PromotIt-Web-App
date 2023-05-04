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

export const NonProfitRepForm = ({ newUser, setNewUser }: FormProps) => {
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
          type="url"
          name="organizationUrl"
          placeholder="Organization Url"
          required
          onChange={(o) => {
            setNewUser({
              ...newUser,
              organizationUrl: o.target.value,
            });
          }}
        />
      </div>
      <div className="input">
        <input
          className="form-control"
          type="text"
          name="organizationName"
          placeholder="Organization Name"
          required
          onChange={(o) => {
            setNewUser({
              ...newUser,
              organizationName: o.target.value,
            });
          }}
        />
      </div>
    </>
  );
};

export const SocialActRepForm = ({ newUser, setNewUser }: FormProps) => {
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
          name="address"
          placeholder="Address"
          required
          onChange={(o) => {
            setNewUser({ ...newUser, address: o.target.value });
          }}
        />
      </div>
      <div className="input">
        <input
          className="form-control"
          type="tel"
          name="phone"
          placeholder="Phone number"
          required
          onChange={(o) => {
            setNewUser({ ...newUser, phone: o.target.value });
          }}
        />
      </div>
      <div className="input">
        <input
          className="form-control"
          type="text"
          name="twitterHandle"
          placeholder="Twitter handle"
          required
          onChange={(o) => {
            setNewUser({
              ...newUser,
              twitterHandle: o.target.value,
            });
          }}
        />
      </div>
    </>
  );
};
