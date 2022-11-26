import clsx from "clsx";
import { EditIcon, ImageIcon } from "components/atoms";
import { memo, useEffect, useRef, useState } from "react";

interface ImageUploaderProps {
  onImageChange: (dataImage: string) => void;
  defaultImage?: string;
  shouldReset?: boolean;
}

const ImageUploader = ({
  onImageChange,
  defaultImage,
  shouldReset,
}: ImageUploaderProps) => {
  const [image, setImage] = useState<string>(defaultImage);
  const [imageOverLimit, setImageOverLimit] = useState<boolean>(false);

  const inputUploadRef = useRef(null);

  useEffect(() => {
    if (shouldReset) setImage(null);
  }, [shouldReset]);

  const onChange = (event) => {
    setImage(null);
    setImageOverLimit(false);
    onImageChange(null);

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

    const fileSize = input.files[0].size / 1024 / 1024;
    const isOver1MB = fileSize > 1;

    if (isOver1MB) return setImageOverLimit(true);

    const hasImage = !!imageFile;

    if (hasImage) reader.readAsDataURL(input.files[0]);
  };

  const openImageSelector = () => inputUploadRef.current.click();

  return (
    <div className="flex flex-col gap-2 text-gray-700">
      <p className={clsx(image && "opacity-0")}>Carregue uma imagem</p>
      <div
        className="relative items-center justify-center flex p-4 gap-4 text-gray-700 border border-gray-700 rounded-lg w-fit bg-gray-100 cursor-pointer bg-cover bg-center "
        style={{
          height: 97,
          width: 97,
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

        {image && (
          <div
            onClick={openImageSelector}
            className="absolute -right-8 underline my-auto top-0 bottom-0 flex gap-2 items-center text-gray-700"
          >
            <EditIcon />
          </div>
        )}
      </div>
      {imageOverLimit && (
        <p className="text-danger">
          Imagem muito pesada. Use uma com menos de 1Mb.
        </p>
      )}
    </div>
  );
};

export default memo(ImageUploader);
