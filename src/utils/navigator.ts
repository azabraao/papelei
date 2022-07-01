interface shareFileProps {
  fileName: string;
  blob: Blob;
  url: string;
}

export const shareFile = async ({ blob, fileName, url }: shareFileProps) => {
  const pdf = new File([blob], fileName, {
    type: blob.type,
  });

  const files = [pdf];

  try {
    await navigator.share({ files, title: fileName, text: fileName });
  } catch (e) {
    if (e.toString().includes("AbortError")) return;
    else window.open(url);
  }
};

export const vibrate = () => {
  if ("navigator" in window) {
    "vibrate" in navigator ? navigator.vibrate(100) : null;
  }
};
