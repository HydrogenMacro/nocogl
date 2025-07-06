import {
    createContext,
    useRef,
    useState,
    type PropsWithChildren,
    type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { Link, Outlet, Route, useNavigate } from "react-router";
import { Display } from "./display";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import clsx from "clsx";
import {
    AttributesSection,
    FragmentShaderSection,
    GeneralSection,
    UniformsSection,
    VertexShaderSection,
} from "./controlSections";

export const AppRoutes = (
    <Route path="/app" element={<App />}>
        <Route path="new"></Route>
        <Route path="export"></Route>
    </Route>
);

function App() {
    return (
        <div className="w-dvw h-dvh flex flex-col">
            <Header></Header>
            <main className="flex-1 flex">
                <div className="flex-1 flex flex-col">
                    <div className="flex-1">
                        <Display></Display>
                    </div>
                    <div className="flex-1">
                        <h2 className="p-4 text-2xl">Console</h2>
                        <div className="divider m-0 h-0"></div>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <GeneralSection></GeneralSection>
                    <div className="divider m-0 h-0"></div>
                    <UniformsSection></UniformsSection>
                    <div className="divider m-0 h-0"></div>
                    <AttributesSection></AttributesSection>
                    <div className="divider m-0 h-0"></div>
                    <VertexShaderSection></VertexShaderSection>
                    <div className="divider m-0 h-0"></div>
                    <FragmentShaderSection></FragmentShaderSection>
                    <div className="divider m-0 h-0"></div>
                </div>
            </main>
            <Outlet />
        </div>
    );
}
function Header() {
    let navigate = useNavigate();
    const headerMenus = {
        File: {
            New: () => navigate("/app/new"),
            Share: () => {},
        },
    };
    return (
        <header className="flex items-center gap-4 px-4 py-2 bg-accent">
            <Link to="/" className="font-bold">
                NocoGL
            </Link>
            {Object.entries(headerMenus).map(
                ([headerType, headerOptions], i) => {
                    return (
                        <HeaderDropdown
                            text={headerType}
                            options={headerOptions}
                            key={i}
                        ></HeaderDropdown>
                    );
                }
            )}
        </header>
    );
}

function HeaderDropdown({
    text,
    options,
}: {
    text: string;
    options: Record<string, () => void>;
}) {
    return (
        <details className="dropdown">
            <summary className="btn btn-soft h-auto min-h-0">{text}</summary>
            <ul className="menu dropdown-content bg-base-soft rounded-lg p-1">
                {Object.entries(options).map(([optName, optCb], i) => (
                    <li key={i}>
                        <button
                            className="btn btn-soft h-auto min-h-0"
                            onClick={optCb}
                        >
                            {optName}
                        </button>
                    </li>
                ))}
            </ul>
        </details>
    );
}

export default App;
