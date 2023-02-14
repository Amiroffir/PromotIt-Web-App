import React from "react";

export const BusinessRepForm = ({ newBusinessRep, setBusinessRep }) => {
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
            setBusinessRep({ ...newBusinessRep, fullName: o.target.value });
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
            setBusinessRep({ ...newBusinessRep, email: o.target.value });
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
            setBusinessRep({ ...newBusinessRep, company: o.target.value });
          }}
        />
      </div>
    </>
  );
};
