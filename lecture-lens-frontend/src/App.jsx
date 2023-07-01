import { React, useEffect } from "react";
import './App.css';
import axios from "axios";
// import { SyllabusPage } from "./components/SyllabusPage";
import { SyllabusSearch } from "./components/SyllabusSearch/SyllabusSearch";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Auth } from "./components/Auth/Auth";
import { LoginLectureSearch } from "./components/LoginPage/LoginLectureSearch";

export const App = () => {
  useEffect(() => {
    axios.defaults.withCredentials = true
    const getCsrfToken = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/csrf`
      )
      axios.defaults.headers.common['X-CSRF-Token'] = data.csrf_token
    }
    getCsrfToken()
  }, [])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<SyllabusSearch />}></Route>
          <Route path={`/Auth`} element={<Auth />}></Route>
          <Route path={`/LoginLectureSearch`} element={<LoginLectureSearch />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
};
