import { ImageIcon } from "components/atoms";
import { memo } from "react";

const LogoUploader = () => {
  return (
    <div className="flex flex-col gap-2">
      <p>Logo</p>
      <div className="flex p-4 gap-4 text-gray-700 border border-gray-700 rounded-lg w-fit bg-gray-100 cursor-pointer">
        <ImageIcon />
        <p>Adicione seu logo</p>
      </div>
    </div>
  );
};

export default memo(LogoUploader);
