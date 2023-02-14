import React from "react";

export const NonProfitRepForm = ({ newNonProfitRep, setNonProfitRep }) => {
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
            setNonProfitRep({ ...newNonProfitRep, fullName: o.target.value });
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
            setNonProfitRep({ ...newNonProfitRep, email: o.target.value });
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
            setNonProfitRep({
              ...newNonProfitRep,
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
            setNonProfitRep({
              ...newNonProfitRep,
              organizationName: o.target.value,
            });
          }}
        />
      </div>
    </>
  );
};
