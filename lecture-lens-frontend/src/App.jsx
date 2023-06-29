import { React } from "react";
import './App.css';
import { SyllabusPage } from "./components/SyllabusPage";
import { SyllabusSearch } from "./components/SyllabusSearch/SyllabusSearch";
import { BrowserRouter, Routes, Route } from "react-router-dom"

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<SyllabusSearch />}></Route>
          <Route path={`/test`} element={<SyllabusPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
};
