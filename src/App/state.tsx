import { proxy } from "valtio";
import { proxyMap, proxySet } from "valtio/utils";

export const appState = proxy({
    projectName: "Project",
    uniforms: [] as Array<[string, string]>,
    vertexCount: 3,
    attributes: [] as Array<[string, string]>,
    fragShader: "",
    vertexShader: "",
});