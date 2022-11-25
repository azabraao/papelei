import { memo } from "react";
import {
  ActiveLink,
  PackageIcon,
  Container,
  HomeIcon,
  UserIcon,
} from "components/atoms";

const BottomBar = () => {
  return (
    <div className="fixed z-10 bottom-0 right-0 left-0 mx-auto py-4 w-full">
      <Container>
        <div className="flex bg-white text-[8px] text-gray-700 justify-between items-center shadow-elevation-1 px-5 rounded-full">
          <ActiveLink activeClassName="text-success" href="/">
            <div className="p-3 flex flex-col justify-center items-center">
              <HomeIcon />
              <span>HOME</span>
            </div>
          </ActiveLink>
          <ActiveLink activeClassName="text-success" href="/profile">
            <div className="p-3 flex flex-col justify-center items-center">
              <UserIcon />
              <span>NEGÓCIO</span>
            </div>
          </ActiveLink>
          <ActiveLink activeClassName="text-success" href="/products">
            <div className="p-3 flex flex-col justify-center items-center">
              <PackageIcon />
              <span>NEGÓCIO</span>
            </div>
          </ActiveLink>
        </div>
      </Container>
    </div>
  );
};

export default memo(BottomBar);
