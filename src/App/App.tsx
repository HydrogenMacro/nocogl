import { Link, Outlet, Route, useNavigate } from "react-router";
import { Display } from "./Display";
import {
    AttributesSection,
    FragmentShaderSection,
    GeneralSection,
    UniformsSection,
    VertexShaderSection,
} from "./controlSections";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { appState } from "./state";

export const AppRoutes = (
    <Route path="/app" element={<App />}>
        <Route path="share" element={
            <ShareModal></ShareModal>
        }></Route>
    </Route>
);

function App() {
    useEffect(() => {
        const url = new URL(window.location.href);
        let sharedProjectName = url.searchParams.get("project");
        if (sharedProjectName) {
            fetch(`https://vex--fab878585a0211f0b397f69ea79377d9.web.val.run/${sharedProjectName}`).then(res => res.json()).then(data => {
                Object.assign(appState, data);
            }, () => {
                appState.projectName = "Error loading project";
            });
        }
    }, []);
    return (
        <>
            <div className="w-dvw h-dvh flex flex-col">
                <Header></Header>
                <main className="flex-1 flex overflow-hidden">
                    <div className="flex-1 flex flex-col">
                        <div className="flex-1">
                            <Display></Display>
                        </div>
                        <div className="flex-1">
                            <h2 className="p-4 text-2xl">Console</h2>
                            <div className="divider m-0 h-0"></div>
                            <div className="p-4">No logs yet.</div>
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
            </div>
            <Outlet />
        </>
    );
}
function ShareModal() {
    const [shareLink, setShareLink] = useState("Loading...");
    const snap = useSnapshot(appState);
    useEffect(() => {
        fetch(`https://vex--fab878585a0211f0b397f69ea79377d9.web.val.run/${snap.projectName}`, {
            method: "POST",
            body: JSON.stringify(snap)
        }).then(() => setShareLink(`https://hydrogenmacro.github.io/nocogl/?project=${snap.projectName}#/app`), () => setShareLink("An error occurred"));
    });

    return <dialog className="modal" open>
        <div className="modal-box">
            <h3 className="font-bold text-lg">Share</h3>
            <div>{shareLink}</div>
            <div className="modal-action">
                <Link to="/app" className="btn">Close</Link>
            </div>
        </div>
    </dialog>
}
function Header() {
    let navigate = useNavigate();
    const headerMenus = {
        File: {
            New: () => location.reload(),
            Share: () => navigate("/app/share"),
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
