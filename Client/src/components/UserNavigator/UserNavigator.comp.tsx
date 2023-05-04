import React, { useEffect, useState } from "react";
import { User, useAuth0 } from "@auth0/auth0-react";
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
import { Auth0Role } from "../../interfaces/interfaces";
import { SystemRole } from "../../interfaces/enums";

export const UserNavigator = () => {
  const { user }: User = useAuth0<User>();
  const [role, setRole] = useState<string>();
  const handleRoles = async (): Promise<void> => {
    let userId: string = user.sub;
    await getRoles(userId).then((role: Auth0Role) => {
      if (role === undefined || role.name === SystemRole.Undefined) {
        console.log("I'm undefined");
        setRole(SystemRole.Undefined);
      } else {
        console.log("role", role.name);
        setRole(role.name);
      }
    });
  };

  useEffect(() => {
    handleRoles();
    console.log("UserNavigator useEffect");
  }, []);

  switch (role) {
    case SystemRole.Admin:
      return <AdminDashboard />;

    case SystemRole.BusinessRep:
      return (
        <RoleContext.Provider value={role}>
          <BizRepDashboard />
        </RoleContext.Provider>
      );
    case SystemRole.NonProfitRep:
      return (
        <RoleContext.Provider value={role}>
          <NonProfitRepDashboard />
        </RoleContext.Provider>
      );

    case SystemRole.SocialActivist:
      return (
        <RoleContext.Provider value={role}>
          <SocialActDashboard />
        </RoleContext.Provider>
      );
    case SystemRole.Undefined: // if this user role is not defined yet then show thank you for registering
      return <ThankYouForRegister />;

    default: // while making decisions show loading...
      return <Loading />;
  }
};
