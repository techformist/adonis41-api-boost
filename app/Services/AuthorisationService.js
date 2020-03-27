const InvalidAccessException = use("App/Exceptions/InvalidAccessException");
const ResourceNotExistException = use(
  "App/Exceptions/ResourceNotExistException"
);

class AuthorizationService {
  /*
    Rather simple authorisation service.
    */
  verifyOwner(resource, user, validateFlags) {
    if (!resource) throw new ResourceNotExistException();

    if (owner && resource.owner_id !== user.id)
      throw new InvalidAccessException();
  }

  verifyAdmin(user) {
    if (!user.role_cd || user.role_cd.indexOf("admin") < 0)
      throw new InvalidAccessException();
  }

  getPrivileges(user) {
    const role = user.role_cd;

    const privilege = {};
    if (role) {
      privilege["isAdmin"] = role.indexOf("admin") >= 0;
      privilege["isGroupAdmin"] =
        role.toLowerCase().indexOf("group admin") >= 0;
      privilege["isSectorAdmin"] =
        role.toLowerCase().indexOf("sector admin") >= 0;
      privilege["isSuperAdmin"] = role.toLowerCase().indexOf("admin int") >= 0;
    }
    return privilege;
  }
}

module.exports = new AuthorizationService();
