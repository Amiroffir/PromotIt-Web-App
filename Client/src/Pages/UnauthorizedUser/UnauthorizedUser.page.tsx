import React from "react";
import { Routes, Route } from "react-router-dom";
import { UnauthorizedUserHome } from "./UnauthorizedUserHome/UnauthorizedUserHome.page";
import { ContactUs } from "../pagesIndex";

export const UnauthorizedUser = () => {
  return (
    <Routes>
      <Route path="/" element={<UnauthorizedUserHome />} />
      <Route path="/contactus" element={<ContactUs />} />
    </Routes>
  );
};
