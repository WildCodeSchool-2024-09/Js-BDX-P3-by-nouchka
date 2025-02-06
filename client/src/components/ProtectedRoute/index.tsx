import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Login/login_persistance/persistance";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const { isLogged, userRole } = useAuth();
  const location = useLocation();

  if (!isLogged) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (requireAdmin && userRole !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
