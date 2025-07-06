import regl, { type Cancellable, type Regl } from "regl";
import { useEffect, useRef } from "react";
import { subscribe } from "valtio";
import { appState } from "./state";

export function Display() {
    const canvasRef = useRef<HTMLCanvasElement>(null!);
    const reglRef = useRef<Regl>(null!);
    useEffect(() => {
        reglRef.current = regl(canvasRef.current);
        const canvasResizeObserver = new ResizeObserver(() => {
            canvasRef.current.width = canvasRef.current.clientWidth;
            canvasRef.current.height = canvasRef.current.clientHeight;
        });
        canvasResizeObserver.observe(canvasRef.current);
        let currentFrameLoop: Cancellable;
        {
            const regl = reglRef.current;
            subscribe(appState, () => {
                try {
                    currentFrameLoop?.cancel?.();
                    const draw = regl<any, any, any, any, any>({
                        frag: appState.fragShader,
                        vert: appState.vertexShader,
                        attributes: appState.attributes.reduce(
                            (obj, [attrName, attrJs]) => {
                                obj[attrName] = regl.buffer(eval(attrJs));
                                return obj;
                            },
                            {} as Record<string, ReturnType<Regl["buffer"]>>
                        ),
                        uniforms: appState.uniforms.reduce(
                            (obj, [uniformName]) => {
                                obj[uniformName] = regl.prop(
                                    uniformName as any as never
                                ); // idfk
                                return obj;
                            },
                            {} as Record<string, any>
                        ),
                        count: appState.vertexCount,
                    });
                    currentFrameLoop = regl.frame(() => {
                        regl.clear({
                            color: [0, 0, 0, 0],
                            depth: 1,
                        });
                        draw(
                            appState.uniforms.reduce(
                                (obj, [uniformName, uniformJs]) => {
                                    obj[uniformName] = eval(uniformJs);
                                    return obj;
                                },
                                {} as Record<string, any>
                            )
                        );
                    });
                } catch (e) {
                    console.error(e);
                }
            });
            appState._n += 1;
            /*
            // Calling regl() creates a new partially evaluated draw command
            const drawTriangle = regl({
                // Shaders in regl are just strings.  You can use glslify or whatever you want
                // to define them.  No need to manually create shader objects.
                frag: `
                precision mediump float;
                uniform vec4 color;
                void main() {
                    gl_FragColor = color;
                }`,

                            vert: `
                precision mediump float;
                attribute vec2 position;
                void main() {
                gl_Position = vec4(position, 0, 1);
                }`,

                // Here we define the vertex attributes for the above shader
                attributes: {
                    // regl.buffer creates a new array buffer object
                    position: regl.buffer([
                        [-2, -2], // no need to flatten nested arrays, regl automatically
                        [4, -2], // unrolls them into a typedarray (default Float32)
                        [4, 4],
                    ]),
                    // regl automatically infers sane defaults for the vertex attribute pointers
                },

                uniforms: {
                    // This defines the color of the triangle to be a dynamic variable
                    color: regl.prop("color"),
                },

                // This tells regl the number of vertices to draw in this command
                count: 3,
            });

            // regl.frame() wraps requestAnimationFrame and also handles viewport changes
            regl.frame(({ time, drawingBufferWidth, drawingBufferHeight }) => {
                // clear contents of the drawing buffer
                regl.clear({
                    color: [0, 0, 0, 0],
                    depth: 1,
                });
                // draw a triangle using the command defined above
                drawTriangle({
                    color: [
                        Math.cos(time),
                        Math.sin(time),
                        Math.cos(time),
                        1,
                    ],
                });
            });*/
        }
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full"></canvas>;
}
