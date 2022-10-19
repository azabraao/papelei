import clsx from "clsx";
import { ImageIcon } from "components/atoms";
import fetchJson from "lib/fetchJson";
import useUser from "lib/useUser";
import { memo, useMemo, useRef, useState } from "react";
import { useSWRConfig } from "swr";

const LogoUploader = () => {
  const [photo, setPhoto] = useState<string>(null);
  const inputUploadRef = useRef(null);
  const { user } = useUser();
  const { mutate } = useSWRConfig();

  const onPhotoChange = (event) => {
    const input = event.target;
    const uploadWasCanceled = !input?.files[0];
    if (uploadWasCanceled) return;

    const reader = new FileReader();
    reader.onload = function () {
      const dataURL = reader.result as string;

      setPhoto(dataURL);

      fetchJson("/api/business/photo", {
        method: "PUT",
        body: JSON.stringify({
          data_image: dataURL,
          business_id: user.business[0].id,
        }),
      }).then(() => {
        mutate("/api/user");
      });
    };

    const imageFile = input.files[0];
    const hasImage = !!imageFile;

    if (hasImage) reader.readAsDataURL(input.files[0]);
  };

  const openImageSelector = () => inputUploadRef.current.click();

  const hasPhoto = useMemo(() => {
    return user?.business?.[0]?.picture || photo;
  }, [user?.business?.[0]?.picture, photo]);

  return (
    <div className="flex flex-col gap-2">
      <p>Logo</p>
      <div
        className="relative flex p-4 gap-4 text-gray-700 border border-gray-700 rounded-lg w-fit bg-gray-100 cursor-pointer bg-cover bg-center "
        style={{
          backgroundImage: `url(${photo || user?.business?.[0]?.picture})`,
        }}
      >
        <input
          className="opacity-0 cursor-pointer absolute top-0 right-0 bottom-0 left-0 w-full"
          type="file"
          accept="image/*"
          ref={inputUploadRef}
          onChange={onPhotoChange}
        />

        <ImageIcon className={clsx(hasPhoto && "opacity-0")} />
        <p className={clsx(hasPhoto && "opacity-0")}>Adicione seu logo</p>
        {hasPhoto && (
          <div
            onClick={openImageSelector}
            className="absolute left-0 -bottom-8 flex gap-2 items-center text-gray-700"
          >
            <ImageIcon />
            <p>Update logo</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(LogoUploader);
