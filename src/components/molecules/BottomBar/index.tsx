import { memo } from "react";
import { ActiveLink, ConfigIcon, HomeIcon, UserIcon } from "components/atoms";

const BottomBar = () => {
  return (
    <div className="fixed bottom-0 right-0 left-0 mx-auto p-4 w-full">
      <div className="flex bg-white text-gray-700 justify-between items-center shadow-elevation-1 px-5 rounded-full">
        <ActiveLink activeClassName="text-success" href="/">
          <div className="p-3 flex justify-center items-center">
            <HomeIcon />
          </div>
        </ActiveLink>
        <ActiveLink activeClassName="text-success" href="/profile">
          <div className="p-3 flex justify-center items-center">
            <UserIcon />
          </div>
        </ActiveLink>
        <ActiveLink activeClassName="text-success" href="/config">
          <div className="p-3 flex justify-center items-center">
            <ConfigIcon />
          </div>
        </ActiveLink>
      </div>
    </div>
  );
};

export default memo(BottomBar);
