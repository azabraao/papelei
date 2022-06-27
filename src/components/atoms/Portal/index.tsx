import clsx from "clsx";
import { memo } from "react";

interface PortalProps {
  isActive: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  transitionDuration?: number;
}

const Portal = ({ transitionDuration, isActive, onClick }: PortalProps) => (
  <div
    onClick={onClick}
    data-testid="portal"
    className={clsx(
      "bg-black-transparent absolute top-0 right-0 bottom-0 left-0 transition-opacity z-10",
      {
        "duration-1000": transitionDuration === 1000,
        "duration-500": transitionDuration === 500,
        "duration-300": transitionDuration === 300,
        "opacity-0 pointer-events-none": !isActive,
        "opacity-100 pointer-events-auto": isActive,
      }
    )}
  />
);

Portal.defaultProps = {
  transitionDuration: 300,
};

export default memo(Portal);
