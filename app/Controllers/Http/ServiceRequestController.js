"use strict";

/*
 * This is a demo controller!
 * What may be classified as business logic may end up here.
 * Ideally, you need to move these to a service and include the services here.
 */

const ServiceRequest = use("App/Models/ServiceRequest");

const ResourceNotExistException = use(
  "App/Exceptions/ResourceNotExistException"
);
const InvalidAccessException = use("App/Exceptions/InvalidAccessException");

/**
 * Resourceful controller for interacting with servicerequests
 */
class ServiceRequestController {
  async index({ request, auth }, authMode) {
    const user = await auth.getUser();

    let { query, page } = request.all();
    page = page ? page : 1;

    const serviceQuery = ServiceRequest.query().with("owner");

    switch (authMode) {
      case "my":
        serviceQuery.where("owner_id", user.id);
        break;

      default:
        break;
    }

    if (query) {
      // you can use sanitisor logic here
      query = query
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/'/g, "&#x27;")
        .replace(/\//g, "&#x2F;");
      let queryObj = JSON.parse(query);

      if (queryObj) serviceQuery.where(queryObj);
    }

    // main query w/ pagination by default
    return await serviceQuery
      .orderBy("id", "desc")
      .paginate(page ? page : 1, 10);
  }

  async indexMy({ request, auth }) {
    return await this.index({ request, auth }, "my");
  }

  async create({ request, auth }) {
    const user = await auth.getUser();
    const data = request.all();

    // this overrides any userid sent in request
    // can be more sophisticated by allowing only certain roles to change userids
    data["owner_id"] = user["id"];

    const sr = new ServiceRequest();

    sr.fill(data);

    await sr.save();

    return sr;
  }

  async update({ params, request, auth }) {
    const user = await auth.getUser();
    const data = request.all();
    const { id } = params;

    if (!id) throw new ResourceNotExistException();

    const sr = await ServiceRequest.findOrFail(id);

    if (
      user.id != sr.owner_id &&
      (!user.role_cd || user.role_cd.toLowerCase().indexOf("admin") < 0)
    )
      throw new InvalidAccessException();

    // can be made more elegant by allowing certain roles to change owner_id
    // or even throwing an exception if invalid data is sent here.
    delete data["owner_id"];

    sr.merge(data);
    await sr.save();

    return sr;
  }

  async destroy({ params, request, response }) {
    /*
     * This is not implemented :)
     */
  }
}

module.exports = ServiceRequestController;
