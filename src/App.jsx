import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div className="flex min-h-screen w-full">
      <Analytics />
      <Sidebar />
      <Main />
    </div>
  );
}

export default App;
