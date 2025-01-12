const Navbar = () => {
  return (
    <nav className="w-full bg-black py-4 px-10  flex items-center justify-between">
      <div>
        <h1 className="text-white text-3xl font-bold ">CryptKey</h1>
      </div>
      <div className="flex gap-8">
        <h1 className="text-white text-2xl bg-gray-900 px-10 py-1 font-bold border border-white rounded-lg">
          Home
        </h1>
        <h1 className="text-white text-2xl  bg-gray-900 px-10 py-1 font-bold border border-white rounded-lg">
          About
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;
