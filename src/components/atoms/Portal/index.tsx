import { memo } from "react";

interface PortalProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Portal = ({ onClick }: PortalProps) => (
  <div
    onClick={onClick}
    data-testid="portal"
    className="bg-black-transparent fixed top-0 right-0 bottom-0 left-0 z-10"
  />
);

export default memo(Portal);
