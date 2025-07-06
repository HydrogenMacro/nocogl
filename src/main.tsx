import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppRoutes } from "./App/App.tsx";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router";
import { Home } from "./Home.tsx";
import { Credits } from "./Credits.tsx";
import { FaGithub } from "react-icons/fa";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <div className="font-body [font-feature-settings:'lnum'_1] min-h-dvh flex flex-col">
            <BrowserRouter>
                <Routes>
                    <Route element={<FooterLayout />}>
                        <Route index element={<Home />}></Route>
                        <Route path="/credits" element={<Credits />}></Route>
                    </Route>
                    {AppRoutes}
                </Routes>
            </BrowserRouter>
        </div>
    </StrictMode>
);

function FooterLayout() {
    return (
        <>
            <div className="flex-1">
                <Outlet />
            </div>
            
            <div className="footer bg-base-200 p-10 flex justify-between items-center text-nowrap">
                <p className="flex-1">
                    Copyright &copy; {new Date().getFullYear()} - All rights
                    reserved
                </p>
                <nav className="flex-1 flex gap-2 justify-center text-nowrap">
                    <Link className="link" to="/">Home</Link>
                    <Link className="link" to="/app">Editor</Link>
                    <Link className="link" to="/credits">Credits</Link>
                </nav>
                <nav className="flex-1 flex justify-end">
                    <a href="https://www.github.com/hydrogenmacro/nocogl"><FaGithub size="24"/></a>
                </nav>
            </div>
        </>
    );
}
