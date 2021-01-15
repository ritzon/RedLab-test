import {authRoles} from 'auth';
import store from 'store';
import {logoutUser} from 'auth/store/actions';

export const LogoutConfig = {
    auth  : authRoles.user,
    routes: [
        {
            path     : '/logout',
            component: () => {
                store.dispatch(logoutUser());
                localStorage.clear();
                return 'Logging out..'
            }
        }
    ]
};

