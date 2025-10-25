import { Authorization } from "./Validations";



const baseURL = "https://realstate.niledevelopers.com";

export const USERS_URLs = {
  Login: `${baseURL}/api/account/login`,
  Register: `${baseURL}/Api/Account/Register`,
  Update: `${baseURL}/Api/Account/UpdateProfilePhoto`,
  AgentRegister :  `${baseURL}/Api/Agent/Register`,
  Profile : `${baseURL}/Api/Agent/Profile`
};

export const PROPERTIES_URLS = {
  addproperty: `${baseURL}/api/agent/property/add`,
};

export const LOCATIONS_URLs = {
  Countries: `${baseURL}/Api/Locations/Countries`,
  Cities: `${baseURL}/Api/Locations/Cities?id=`,
  
};
