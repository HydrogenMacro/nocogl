import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router";

export function Credits() {
    return (
        <main className="flex flex-col items-center p-8">
            <Link to="/" className="link flex gap-1 items-center"><FiArrowLeft />Back To Home</Link>
            <h1 className="font-bold text-6xl p-8">Credits</h1>
            <div>Made by <a href="https://github.com/hydrogenmacro" className="link link-info">Josh Smith</a>.</div>
            <h2 className="font-bold text-3xl p-8">Dependencies and Tools Used</h2>
            <ul className="list items-center">
                <li className="list-row">React</li>
                <li className="list-row">DaisyUI</li>
                <li className="list-row">CodeMirror</li>
                <li className="list-row">regl</li>
                <li className="list-row">react-icons</li>
                <li className="list-row">React Router</li>
            </ul>
            <h2 className="font-bold text-4xl p-8">Thank you for using us! ♥️</h2>
        </main>
    );
}
