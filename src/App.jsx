// import { useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Record from "./pages/Record";
import Records from "./pages/Records";
import RecordsCards from "./pages/RecordsCards";
import Template from "./pages/Template";
import Templates from "./pages/Templates";

import "./App.css";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Records />} />
        <Route path="records" element={<Records />} />
        <Route path="records/cards" element={<RecordsCards />} />
        <Route path="records/:recordId" element={<Record />} />
        <Route path="templates" element={<Templates />} />
        <Route path="templates/:templateId" element={<Template />} />
      </Route>
    )
  );

  return (
    <>
      <div>
        <h1>Hello React!</h1>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

const Root = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
