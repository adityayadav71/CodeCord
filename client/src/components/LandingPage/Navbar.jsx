import logo from "../../assets/svg/logo.svg";

const Navbar = (props) => {
  return (
    <nav className="flex flex-row items-center py-11 px-9">
      <img className="" src={logo} alt="codecord_logo" />
      <div className="flex flex-row items-center gap-x-6 ml-auto">
        <input className="px-4 py-3 w-80 bg-secondary text-grey1 hover:shadow-lg transition-shadow duration-300 hover:shadow-sky-900 focus:outline focus:outline-2 focus:outline-accent1 rounded-full" type="text" name="search" id="search" placeholder="Search problems, contests, users..." />
        <button className="p-3 w-36 text-xl transition-all ease-in-out duration-300 hover:cursor-pointer hover:scale-110 bg-accent1 text-white font-bold rounded-xl hover:shadow-signUp hover:shadow">Sign up</button>
      </div>
    </nav>
  );
};

export default Navbar;
