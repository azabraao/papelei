import { memo } from "react";

const Navbar = () => {
  return (
    <div className="bg-danger w-full flex justify-center items-center p-4 shadow-elevation-1">
      <img src="./budget-generator.svg" alt="AMD Gesso" />
    </div>
  );
};

export default memo(Navbar);
