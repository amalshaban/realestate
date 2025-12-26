import { Authorization } from "./Validations";



const baseURL = "https://realstate.niledevelopers.com";

export const USERS_URLs = {
  Login: `${baseURL}/Account/Login`,
  Register: `${baseURL}/Account/Register`,
  Update: `${baseURL}/Account/UpdateProfilePhoto`,
  AgentRegister :  `${baseURL}/Agent/Register`,
  Profile : `${baseURL}/Agent/Profile`
};

export const PROPERTIES_URLS = {
  addproperty: `${baseURL}/agent/property/add`,
  allProperties: `${baseURL}/Agent/properties`,
  // propertyDetails: `${baseURL}/api/agent/property/${propertyId}`,
};

export const LOCATIONS_URLs = {
  Countries: `${baseURL}/Locations/Countries`,
  Cities: `${baseURL}/Locations/Cities?id=`,
  
};
