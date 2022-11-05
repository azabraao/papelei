import clsx from "clsx";
import { ImageIcon } from "components/atoms";
import { memo, useRef, useState } from "react";

interface ImageUploaderProps {
  onImageChange: (dataImage: string) => void;
  defaultImage?: string;
}

const ImageUploader = ({ onImageChange, defaultImage }: ImageUploaderProps) => {
  const [image, setImage] = useState<string>(defaultImage);
  const inputUploadRef = useRef(null);

  const onChange = (event) => {
    const input = event.target;
    const uploadWasCanceled = !input?.files[0];
    if (uploadWasCanceled) return;

    const reader = new FileReader();
    reader.onload = function () {
      const dataURL = reader.result as string;

      setImage(dataURL);
      onImageChange(dataURL);
    };

    const imageFile = input.files[0];
    const hasImage = !!imageFile;

    if (hasImage) reader.readAsDataURL(input.files[0]);
  };

  const openImageSelector = () => inputUploadRef.current.click();

  return (
    <div className="flex flex-col gap-2">
      <div
        className="relative items-center flex p-4 gap-4 text-gray-700 border border-gray-700 rounded-lg w-fit bg-gray-100 cursor-pointer bg-cover bg-center "
        style={{
          height: 97,
          backgroundImage: `url(${image})`,
        }}
      >
        <input
          className="opacity-0 cursor-pointer absolute top-0 right-0 bottom-0 left-0 w-full"
          type="file"
          accept="image/*"
          ref={inputUploadRef}
          onChange={onChange}
        />

        <ImageIcon className={clsx(image && "opacity-0")} />
        <p className={clsx(image && "opacity-0")}>Carregue</p>
        {image && (
          <div
            onClick={openImageSelector}
            className="absolute left-0 underline -bottom-7 flex gap-2 items-center text-gray-700"
          >
            <ImageIcon />
            <p>Atualizar</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ImageUploader);
