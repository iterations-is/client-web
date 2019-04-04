/**
 * @file Permissions validator
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

export const haveAtLeastOneOfPermissions = (jwtPermissions, requiredPermissions) => {
   // We dont need permissions
   if (requiredPermissions.length === 0) return true;

   // Some permissions are required
   for (let requiredPermission of requiredPermissions) {
      if (jwtPermissions.indexOf(requiredPermission) > -1) return true;
   }
   return false;
};

export const haveAllOfPermissions = (jwtPermissions, requiredPermissions) => {
   // We dont need permissions
   if (requiredPermissions.length === 0) return true;

   // Some permissions are required
   for (let permission of requiredPermissions) {
      if (jwtPermissions.indexOf(permission) === -1) return false;
   }
   return true;
};
