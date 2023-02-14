import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getRoles } from "../../services/Auth0.services";
import {
  ThankYouForRegister,
  AdminDashboard,
  BizRepDashboard,
  NonProfitRepDashboard,
  SocialActDashboard,
} from "../../Pages/pagesIndex";
import { RoleContext } from "../../contexts/contexts";
import { Loading } from "../compsIndex";

export const UserNavigator = () => {
  const { user } = useAuth0();
  const [role, setRole] = useState("role");
  const handleRoles = async () => {
    let userId = user.sub;
    let roles = await getRoles(userId);
    if (roles.length === 0) {
      setRole("");
    } else {
      console.log("roles", roles[0].name);
      setRole(roles[0].name);
    }
  };

  useEffect(() => {
    handleRoles();
    console.log("UserNavigator useEffect");
  }, []);

  switch (role) {
    case "Admin":
      return <AdminDashboard />;

    case "Business Rep":
      return (
        <RoleContext.Provider value={role}>
          <BizRepDashboard />
        </RoleContext.Provider>
      );
    case "Non Profit Rep":
      return (
        <RoleContext.Provider value={role}>
          <NonProfitRepDashboard />
        </RoleContext.Provider>
      );

    case "Social Activist":
      return (
        <RoleContext.Provider value={role}>
          <SocialActDashboard />
        </RoleContext.Provider>
      );
    case "": // if this user role is not defined yet then show thank you for registering
      return <ThankYouForRegister />;

    default: // while making decisions show loading...
      return <Loading />;
  }
};
