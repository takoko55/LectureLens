import { React } from "react";
import './App.css';
// import { SyllabusPage } from "./components/SyllabusPage";
import { SyllabusSearch } from "./components/SyllabusSearch/SyllabusSearch";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Auth } from "./components/Auth/Auth";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<SyllabusSearch />}></Route>
          <Route path={`/Auth`} element={<Auth />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
};
