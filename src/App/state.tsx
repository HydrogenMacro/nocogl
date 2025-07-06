import { proxy } from "valtio";

export const appState = proxy({
    projectName: "Untitled-" + String(Math.random()).slice(2,8),
    uniforms: [["color", `[(Date.now() / 1000) % 1, .3, .4, 1]`]] as Array<[string, string]>,
    vertexCount: 3,
    attributes: [["position", `[[-2, -2], [-2, 4], [4, 4]]`]] as Array<[string, string]>,
    fragShader: `\
precision mediump float;
uniform vec4 color;
void main() {
gl_FragColor = color;
}\
`,
    vertexShader: `\
precision mediump float;
attribute vec2 position;
void main() {
    gl_Position = vec4(position, 0, 1);
}\
`,
    _n: 0
});