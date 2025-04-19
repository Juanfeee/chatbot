
import { Outlet } from "react-router";
import './App.css';

const App = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <Outlet />
      </div>
    </>
  );
};

export default App;
