import axios from "axios";

class API {
  constructor() {}
}

API.BASE_URI = "http://localhost:8080/openmrs/ws/rest/v1/item/";
API.OPENMRS_API_URI = "http://localhost:8080/openmrs/ws/rest/v1/";
API.auth = {
  // username: "admin",
  // password: "Admin123",
};
API.items = () => {
  return axios.get(API.BASE_URI + "?v=full", {}, API.auth);
};
API.item = {};
API.item.delete = (uuid) => {
  return axios.delete(API.BASE_URI + "/" + uuid, {}, API.auth);
};

API.item.create = (item) => {
  return axios.post(API.BASE_URI, item, API.auth);
};

API.item.update = (item) => {
  return axios.post(API.BASE_URI + "/" + item.uuid, item, API.auth);
};
API.item.get = (uuid) => {
  return axios.get(API.BASE_URI + "/" + uuid, {}, API.auth);
};

API.checkLogin = () => {
  return axios.get(API.OPENMRS_API_URI + "session");
};

export default API;
