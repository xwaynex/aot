// import { useSelector } from "react-redux"
// import { selectCurrentToken } from "./authSlice"

// const RequireAuth = () => {
//     const token = useSelector(selectCurrentToken)
//     const location = useLocation()

//     return (
//         token
//             ? <Outlet />
//             : <Navigate to="/login" state={{ from: location }} replace />
//     )
// }
// export default RequireAuth

import { useRouter } from 'next/navigation';

import { useSelector } from 'react-redux';
import { selectCurrentToken } from './authSlice';

const RequireAuth = ({ children }) => {
  const router = useRouter();
  const token = useSelector(selectCurrentToken);

  if (!token) {
    router.replace(`/dash/login?from=${encodeURIComponent(router.asPath)}`);
    return null; 
  }

  return children;
};

export default RequireAuth;
