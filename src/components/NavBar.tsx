import { FaGithub } from "react-icons/fa";
interface NavbarProps {
  onClicked : () => void;
}
const Navbar = ({onClicked} : NavbarProps) => {
  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-800 bg-[#161b22] px-6 shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-500 font-bold text-white">
          G
        </div>

        <div>
          <h1 className="text-lg font-semibold text-white">Git Visualizer</h1>
        </div>
      </div>
      <div onClick={onClicked} className="group flex cursor-pointer items-center justify-center gap-2 rounded-md py-4 text-sm font-semibold text-white transition-all duration-200 ease-out hover:scale-[1.03] hover:bg-zinc-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5"
        >
          <path d="M4 3.5v9l8-4.5-8-4.5z" />
        </svg>
        <span>Load Demo</span>
      </div>

      <div className="flex items-center gap-6 text-sm text-gray-400">
        <a
          href="https://github.com/aayush64x/Git"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-md px-3 py-2 transition-all hover:bg-zinc-800 hover:text-white"
        >
          <FaGithub className="text-lg" />
          <span>View Source</span>
        </a>
      </div>
    </header>
  );
};

export default Navbar;
