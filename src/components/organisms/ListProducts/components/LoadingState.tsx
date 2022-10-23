import { memo } from "react";
import Skeleton from "react-loading-skeleton";

const Card = () => (
  <div className="flex p-4 items-center gap-6 w-full border border-b-[1px] border-t-0 border-x-0 border-black-20 bg-white shadow-card-effect-soft rounded-lg">
    <Skeleton width={67} height={67} />
    <div className="flex flex-col w-full">
      <Skeleton width="100%" height={16} borderRadius={4} />
      <Skeleton width="80%" height={16} borderRadius={4} />
      <Skeleton width={57} height={16} borderRadius={4} />
    </div>
  </div>
);

const LoadingState = () => {
  return (
    <div className="flex flex-col gap-2">
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default memo(LoadingState);
