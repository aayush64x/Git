const Navbar = () => {
  return (
    <nav className="flex h-screen w-16 flex-col items-center border-r border-zinc-800 bg-zinc-950 py-4">
      {/* Logo */}
      <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-lg bg-green-500 font-bold text-black">
        G
      </div>

      {/* Navigation */}
      <div className="flex flex-1 flex-col items-center gap-4">
        <button className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white">
          🏠
        </button>

        <button className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white">
          🌳
        </button>

        <button className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white">
          📄
        </button>

        <button className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white">
          ⚙️
        </button>
      </div>

      {/* Bottom */}
      <button className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white">
        ❓
      </button>
    </nav>
  );
};

export default Navbar;