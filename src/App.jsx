
import "./App.css";
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MasterLayout from "./modules/SharedModule/MasterLayout/MasterLayout";
import Home from "./modules/SharedModule/Home/Home.jsx";
import LogIn from "./modules/AuthModule/LogIn/LogIn.jsx"
import SignUp from "./modules/AuthModule/SignUp/SignUp.jsx";
import ViewProperties from "./modules/PropertiesModule/ViewProperties/ViewProperties.jsx";
import AddProperty from "./modules/PropertiesModule/AddProperty/AddProperty.jsx";
import NotFound from "./modules/SharedModule/NotFound/NotFound.jsx";
import EditProperty from "./modules/PropertiesModule/EditProperty/EditProperty.jsx";
import DeleteProperty from "./modules/PropertiesModule/DeleteProperty/DeleteProperty.jsx";
import SignUpAgent from "./modules/AuthModule/SignUpAgent/SignUpAgent.jsx";
import AuthContextProvider from "./modules/AuthModule/context/AuthContext.jsx";
import NavBar from "./modules/SharedModule/NavBar/NavBar.jsx";
import ProtectedRoute from "./modules/SharedModule/ProtectedRoute/ProtectedRoute.jsx";


import MultiStepForm from "./modules/AuthModule/AgentRegProccess/MultiStepForm.jsx"
import Step1 from "./modules/AuthModule/AgentRegProccess/Step1.jsx";
import Step2 from "./modules/AuthModule/AgentRegProccess/Step2.jsx";
import Step3 from "./modules/AuthModule/AgentRegProccess/Step3.jsx";
import Review from "./modules/AuthModule/AgentRegProccess/Review.jsx";
import AgentPannel from "./modules/UsersModule/RealEstateAgents/AgentPannel/AgentPannel.jsx";
import SideBar from "./modules/UsersModule/RealEstateAgents/SideBar/SideBar.jsx";
import AgentList from "./modules/UsersModule/RealEstateAgents/AgentList/AgentList.jsx";
import Join from "./modules/AuthModule/Join/Join.jsx";
import AuthRight from "./modules/AuthModule/AuthRight/AuthRight.jsx";
import PropertyLayout from "./modules/SharedModule/PropertyLayout/PropertyLayout.jsx";
import PropertyMultiStepForm from "./modules/PropertiesModule/AddProperty/PropertyMultiStepForm.jsx"
import Location from "./modules/PropertiesModule/AddProperty/Location.jsx"
import AreaandDesc from "./modules/PropertiesModule/AddProperty/AreaandDesc.jsx"
import PhotosandVideos from "./modules/PropertiesModule/AddProperty/PhotosandVideos.jsx"
import PropertyReview from "./modules/PropertiesModule/AddProperty/PropertyReview.jsx"
function App() {
  
 
  const routes = createBrowserRouter([
    {
      path: "",
      element:
         <MasterLayout />
      ,
      errorElement: <NotFound />,
      children: [
        { index: "true", element: <Home /> },
        { path: "home", element:  <Home /> },
      ],
    },
    {
      path: "auth",
      errorElement: <NotFound />,
      element: <MasterLayout />,
      children: [
        { index: "true", element: <LogIn /> },
        { path: "login", element: <LogIn /> },
      
        { path: "join" , element: <Join/>,
          children: [
            
                  { path: "", element: <AuthRight /> },
                  { path: "signup", element: <SignUp /> },
                  { path: "signupagent", element: <SignUpAgent /> },
          ]
        },
      
        
  
        
        { path: "multistepform", element: <MultiStepForm /> },
        { path: "step1", element: <Step1 /> },
        { path: "step2", element: <Step2 /> },
        { path: "step3", element: <Step3 /> },
        { path: "review", element: <Review /> },
      ],
    },
     {
      path: "agentLayout",
      errorElement: <NotFound />,
      element: 
      <ProtectedRoute>
        <AgentPannel />
      </ProtectedRoute> ,
      children: [
        { index: "true", element: <AgentPannel /> },
        { path: "sidebar", element: <SideBar /> },
        { path: "agentlist", element: <AgentList /> },
      ],
    },
    {
      path: "properties",
      errorElement: <NotFound />,
      element:  <PropertyLayout />,
      children: [
        { index: "true", element: <ViewProperties /> },
        { path: "viewproperties", element: <ViewProperties /> },
        { path: "editProperty", element: <EditProperty /> },
        { path: "deleteProperty", element: <DeleteProperty /> },
        { path: "addproperty", element: <AddProperty />,
          children: [
            
        { index: "propertymultistepform", element: <PropertyMultiStepForm /> },
        { index: "location", element: <Location /> },
        { index: "areaanddescrp", element: <AreaandDesc /> },
        { index: "photosandvideos", element: <PhotosandVideos /> },
        { index: "propertyreview", element: <PropertyReview /> },
          ]
         },
      ],
    },
    
    {
      path: "",
      errorElement: <NotFound />,
      element: <MasterLayout />,
      children: [
      ],
    },
  ]);

  return (
  <>

  <AuthContextProvider>
      <ToastContainer />
      <RouterProvider router = {routes}>
    <NavBar/>
    </RouterProvider>
  </AuthContextProvider>
  </>);
}

export default App;
