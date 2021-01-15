/**
 * Authorization Roles
 */
const authRoles = {
    admin    : ['admin'],
    patient  : ['admin','patient'],
    staff    : ['admin', 'staff'],
    user     : ['admin', 'staff', 'user'],
    onlyGuest: ['guest']
};

export default authRoles;