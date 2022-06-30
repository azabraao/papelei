interface shareFileProps {
  fileName: string;
  blob: Blob;
  url: string;
}

export const shareFile = async ({ blob, fileName, url }: shareFileProps) => {
  const buffer = await blob.arrayBuffer();

  const pdf = new File([buffer], `${fileName}.pdf`, {
    type: "application/pdf",
  });

  const files = [pdf];

  try {
    await navigator.share({ files });
  } catch (e) {
    if (e.toString().includes("AbortError")) return;
    else window.open(url);
  }
};
