import clsx from "clsx";
import { useState, type PropsWithChildren, type ReactNode } from "react";
import { FaChevronRight } from "react-icons/fa";
import { useSnapshot } from "valtio";
import { appState } from "./state";
import ReactCodeMirror from "@uiw/react-codemirror";
import { color } from "@uiw/codemirror-extensions-color";
import { githubDark } from "@uiw/codemirror-theme-github";
import { glsl } from "codemirror-lang-glsl";

function ControlsSection({
    title,
    children,
}: PropsWithChildren<{ title: string }>) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="collapse">
            <input type="checkbox" onChange={() => setIsOpen(!isOpen)} />
            <div className="collapse-title font-bold flex items-center">
                {title}
                <FaChevronRight
                    className={clsx(
                        "transition-transform duration-500 ml-2",
                        isOpen && "rotate-90"
                    )}
                />
            </div>
            <div className="collapse-content">
                <table className="table">
                    <tbody>{children}</tbody>
                </table>
            </div>
        </div>
    );
}
export function GeneralSection() {
    const snap = useSnapshot(appState);

    return (
        <ControlsSection title="General">
            <Row label="Project Name">
                <input
                    type="text"
                    className="input"
                    value={snap.projectName}
                    onInput={(ev) => {
                        appState.projectName = (
                            ev.target as HTMLInputElement
                        ).value;
                    }}
                />
            </Row>
            <Row label="Vertex Count">
                <input
                    type="number"
                    className="input"
                    min={0}
                    max={999}
                    value={snap.vertexCount}
                    onInput={(ev) => {
                        appState.vertexCount = Math.min(
                            +(ev.target as HTMLInputElement).value,
                            999
                        );
                    }}
                />
            </Row>
        </ControlsSection>
    );
}

function genNewName(
    namePrefix: String,
    setLike: { has: (item: string) => boolean }
) {
    let n = 0;
    while (setLike.has(namePrefix + n.toString())) {
        n++;
    }
    return namePrefix + n.toString();
}

export function UniformsSection() {
    const snap = useSnapshot(appState);

    return (
        <ControlsSection title="Uniforms">
            {[...snap.uniforms].map(([uniformName, uniformJsCode], i) => {
                return (
                    <Row
                        label={
                            <input
                                value={uniformName}
                                className="input"
                                onInput={(ev) => {
                                    let val = (ev.target as HTMLInputElement)
                                        .value;
                                    if (
                                        snap.uniforms.some(
                                            ([uniformName]) =>
                                                val === uniformName
                                        )
                                    ) {
                                        alert("Uniform already exists.");
                                    } else {
                                        appState.uniforms[i] = [
                                            val,
                                            snap.uniforms[i][1],
                                        ];
                                    }
                                }}
                            />
                        }
                        key={i}
                    >
                        <ReactCodeMirror
                            value={uniformJsCode}
                            extensions={[color, glsl()]}
                            theme={githubDark}
                            basicSetup={true}
                            lang="js"
                            className="w-full h-auto"
                            onChange={(val) => (appState.uniforms[i][1] = val)}
                        />
                    </Row>
                );
            })}
            <Row label={null}>
                <button
                    className="btn btn-wide max-w-none btn-secondary"
                    onClick={() =>
                        appState.uniforms.push([
                            genNewName("uniform", {
                                has: (val) =>
                                    snap.uniforms.some(
                                        ([uniformName]) => val === uniformName
                                    ),
                            }),
                            "0",
                        ])
                    }
                >
                    Add Uniform
                </button>
            </Row>
        </ControlsSection>
    );
}
export function AttributesSection() {
    const snap = useSnapshot(appState);

    return (
        <ControlsSection title="Attributes">
            {[...snap.attributes].map(([attributeName, attributeJsCode], i) => {
                return (
                    <Row
                        label={
                            <input
                                value={attributeName}
                                className="input"
                                onInput={(ev) => {
                                    let val = (ev.target as HTMLInputElement)
                                        .value;
                                    if (
                                        snap.attributes.some(
                                            ([attributeName]) =>
                                                val === attributeName
                                        )
                                    ) {
                                        alert("Attribute already exists.");
                                    } else {
                                        appState.attributes[i] = [
                                            val,
                                            snap.attributes[i][1],
                                        ];
                                    }
                                }}
                            />
                        }
                        key={i}
                    >
                        <ReactCodeMirror
                            value={attributeJsCode}
                            extensions={[color, glsl()]}
                            theme={githubDark}
                            basicSetup={true}
                            lang="js"
                            className="w-full h-auto"
                            onChange={(val) =>
                                (appState.attributes[i][1] = val)
                            }
                        />
                    </Row>
                );
            })}
            <Row label={null}>
                <button
                    className="btn btn-wide max-w-none btn-secondary"
                    onClick={() =>
                        appState.attributes.push([
                            genNewName("attribute", {
                                has: (val) =>
                                    snap.attributes.some(
                                        ([attributeName]) =>
                                            val === attributeName
                                    ),
                            }),
                            "0",
                        ])
                    }
                >
                    Add Attribute
                </button>
            </Row>
        </ControlsSection>
    );
}
export function VertexShaderSection() {
    const snap = useSnapshot(appState);
    return (
        <ControlsSection title="Vertex Shader">
            <Row label={null}>
                <ReactCodeMirror
                    value={snap.vertexShader}
                    extensions={[color, glsl()]}
                    theme={githubDark}
                    basicSetup={true}
                    lang="glsl"
                    className="w-full h-auto"
                    onChange={(val) => {appState.vertexShader = val}}
                />
            </Row>
        </ControlsSection>
    );
}
export function FragmentShaderSection() {
    const snap = useSnapshot(appState);
    return (
        <ControlsSection title="Fragment Shader">
            <Row label={null}>
                <ReactCodeMirror
                    value={snap.fragShader}
                    extensions={[color, glsl()]}
                    theme={githubDark}
                    basicSetup={true}
                    lang="glsl"
                    className="w-full h-auto"
                    onChange={(val) => {appState.fragShader = val}}
                />
            </Row>
        </ControlsSection>
    );
}
function Row({
    label,
    children,
}: PropsWithChildren<{ label: string | ReactNode | null }>) {
    return (
        <tr className="flex justify-between">
            {label ? <td className="w-auto">{label}</td> : null}
            <td colSpan={label ? 1 : 2} className="flex-1">
                {children}
            </td>
        </tr>
    );
}
