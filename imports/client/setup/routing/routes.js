import Login from '/imports/client/ui/userPages/Login.jsx';
import Logout from '/imports/client/ui/userPages/Logout.jsx';
import Register from '/imports/client/ui/userPages/Register.jsx';
import Dashboard from '/imports/client/ui/mainPages/Dashboard.jsx';

export default [
  {
    path: '/login',
    component: Login,
    requireLogIn: false,
  },
  {
    path: '/logout',
    component: Logout,
    requireLogIn: true,
  },
  {
    path: '/register',
    component: Register,
    requireLogIn: false
  },
  {
    path: '/',
    component: Dashboard,
    requireLogIn: true,
    exact: true
  },
];