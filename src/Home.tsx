import { FiArrowDown } from "react-icons/fi";
import { Link } from "react-router";
import screenshotUrl from "./assets/screenshot.png";
import { useRef, type RefObject } from "react";

function TitleCard({ bodyElRef }: { bodyElRef: RefObject<HTMLElement> }) {
    return (
        <div className="hero relative h-svh">
            <div className="absolute w-full h-full bg-gradient-to-t from-secondary to-primary"></div>
            <div className="hero-content text-center p-12 relative flex flex-col">
                <h1 className="text-8xl font-bold pt-6">NocoGL</h1>
                <p className=" text-2xl">WebGL made intuitive.</p>
                <div className="flex justify-center items-center py-4 gap-4">
                    <Link to="/app" className="btn btn-primary">Open Editor</Link>
                    <div
                        onClick={() => bodyElRef.current.scrollIntoView({ behavior: "smooth", block: "start" })}
                        className="link flex items-center gap-1"
                    >
                        Browse Features
                        <FiArrowDown />
                    </div>
                </div>
            </div>
        </div>
    );
}
export function Home() {
    const bodyElRef = useRef<HTMLDivElement>(null!);
    return (
        <main className="">
            <TitleCard bodyElRef={bodyElRef}/>
            <div className="flex flex-col items-center px-8 pb-8" ref={bodyElRef}>
                <h2 id="visual-webgl-editor" className="text-4xl pt-8">
                    Visual WebGL Editor
                </h2>
                <div className="w-full flex">
                    <div className="my-12 w-8/12 aspect-[23/10] bg-green-500 transform-3d rotate-x-15 rotate-y-20" style={{ backgroundImage: `url(${screenshotUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                        
                    </div>
                </div>
            </div>
        </main>
    );
}
