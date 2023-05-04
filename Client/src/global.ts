import { RedirectLoginOptions } from "@auth0/auth0-react";

export const ServerURL: string = "http://localhost:7222/api";
export const PromotItHomePage: string = "http://localhost:3000";
export const Auth0Domain: string = "dev-ikv1ghu4jj70xyif.us.auth0.com";
export const Auth0ClientID: string = "drOe6IzOIDzJ1iZbFV2YMefIHCVKdVZP";

export const optionsToRedirect: RedirectLoginOptions = {
  PromotItHomePage: "http://localhost:3000",
};
