import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuthentication from "../hook/useAuthentication";
export default function RequiredAuthentication({ allowedRoles }) {
  const { authentication } = useAuthentication();
  const location = useLocation();
  return authentication?.role &&
    allowedRoles.indexOf(authentication.role) !== -1 ? (
    <Outlet />
  ) : authentication?.username ? (
    <Navigate to="/prohibition" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
