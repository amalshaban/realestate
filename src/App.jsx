import "./App.css";
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { createHashRouter, RouterProvider, Outlet } from "react-router-dom";
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
import ProtectedRoute from "./modules/SharedModule/ProtectedRoute/ProtectedRoute.jsx";

import MultiStepForm from "./modules/AuthModule/AgentRegProccess/MultiStepForm.jsx"
import Step1 from "./modules/AuthModule/AgentRegProccess/Step1.jsx";
import Step2 from "./modules/AuthModule/AgentRegProccess/Step2.jsx";
import Step3 from "./modules/AuthModule/AgentRegProccess/Step3.jsx";
import Review from "./modules/AuthModule/AgentRegProccess/Review.jsx";
import Overview from "./modules/UsersModule/RealEstateAgents/Overview/Overview.jsx";
import AgentPannel from "./modules/UsersModule/RealEstateAgents/AgentPannel/AgentPannel.jsx";
import SideBar from "./modules/UsersModule/RealEstateAgents/SideBar/SideBar.jsx";
import PropertiesList from "./modules/UsersModule/RealEstateAgents/PropertiesList/PropertiesList.jsx";
import Join from "./modules/AuthModule/Join/Join.jsx";
import AuthRight from "./modules/AuthModule/AuthRight/AuthRight.jsx";
import PropertyLayout from "./modules/SharedModule/PropertyLayout/PropertyLayout.jsx";
import PropertyMultiStepForm from "./modules/PropertiesModule/AddProperty/PropertyMultiStepForm.jsx"
import Location from "./modules/PropertiesModule/AddProperty/Location.jsx"
import AreaandDesc from "./modules/PropertiesModule/AddProperty/AreaandDesc.jsx"
import PhotosandVideos from "./modules/PropertiesModule/AddProperty/PhotosandVideos.jsx"
import PropertyReview from "./modules/PropertiesModule/AddProperty/PropertyReview.jsx"
import PropertyDetails from "./modules/PropertiesModule/PropertyDetails/PropertyDetails.jsx";
import VisitRequestAgent from "./modules/UsersModule/RealEstateAgents/visitRequestAgent/visitRequestAgent.jsx";
import HomeSeekerPannel from "./modules/UsersModule/HomeSeekers/HomeSeekerPannel/HomeSeekerPannel.jsx";
import VisitRequestUser from "./modules/UsersModule/HomeSeekers/VisitRequestUser/VisitRequestUser.jsx";
import HomeSeekerLayout from "./modules/SharedModule/HomeSeekerLayout/HomeSeekerLayout.jsx";
import AgentLayout from "./modules/SharedModule/AgentLayout/AgentLayout.jsx";

function App() {
  console.log('App component loaded');
  const routes = createHashRouter([
    // 1. مسارات المستخدم العادي (الموقع الرئيسي)
    {
      path: "/",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
      ],
    },
    // 2. مسارات الـ Agent (مستقلة تماماً)
    {
      path: "/agentLayout",
      element: (
        <ProtectedRoute>
          <AgentLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Overview /> },
        { path: "overview", element: <Overview /> },
        { path: "visitrequestagent", element: <VisitRequestAgent /> },
        { path: "propertieslist", element: <PropertiesList /> },
      ],
    },
    // 3. مسارات الـ Home Seeker (مستقلة تماماً)
    {
      path: "/homeSeekerLayout",
      element: (
        <ProtectedRoute>
          <HomeSeekerLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <HomeSeekerPannel /> },
        { path: "visitrequestuser", element: <VisitRequestUser /> },
      ],
    },
    // 4. مسارات الـ Auth
    {
      path: "/auth",
      element: <Outlet />, // No layout for auth pages
      errorElement: <NotFound />,
      children: [
        { index: true, element: <LogIn /> },
        { path: "login", element: <LogIn /> },
        { 
          path: "join", 
          element: <Join />,
          children: [
            { index: true, element: <AuthRight /> },
            { path: "signup", element: <SignUp /> },
            { path: "signupagent", element: <SignUpAgent /> },
          ]
        },
        { path: "multistepform", element: <MultiStepForm /> },
      ],
    },
    // 5. مسارات الخصائص (Properties)
    {
      path: "/properties",
      element: <PropertyLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <ViewProperties /> },
        { path: "viewproperties", element: <ViewProperties /> },
        { path: "property/:id", element: <PropertyDetails /> },
        { 
          path: "addproperty", 
          element: <AddProperty />,
          children: [
            { index: true, element: <PropertyMultiStepForm /> },
            { path: "location", element: <Location /> },
            { path: "areaanddescrp", element: <AreaandDesc /> },
          ]
        },
      ],
    },
    // مسار الـ 404 النهائي
    { path: "*", element: <NotFound /> }
  ]);

  return (
    <>
      <AuthContextProvider>
        <ToastContainer />
        {console.log('About to render RouterProvider')}
        <RouterProvider router={routes} />
      </AuthContextProvider>
    </>
  );
}

export default App;