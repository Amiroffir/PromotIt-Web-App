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

export const SocialActRepForm = ({ newSocialActRep, setSocialActRep }) => {
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
            setSocialActRep({ ...newSocialActRep, fullName: o.target.value });
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
            setSocialActRep({ ...newSocialActRep, email: o.target.value });
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
            setSocialActRep({ ...newSocialActRep, address: o.target.value });
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
            setSocialActRep({ ...newSocialActRep, phone: o.target.value });
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
            setSocialActRep({
              ...newSocialActRep,
              twitterHandle: o.target.value,
            });
          }}
        />
      </div>
    </>
  );
};
