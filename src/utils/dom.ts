export const lockBodyScroll = () => {
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.top = "0";
  document.body.style.right = "0";
  document.body.style.bottom = "0";
  document.body.style.left = "0";
};

export const unlockBodyScroll = () => {
  document.body.style.overflow = "auto";
  document.body.style.position = "static";
  document.body.style.top = "auto";
  document.body.style.right = "auto";
  document.body.style.bottom = "auto";
  document.body.style.left = "auto";
};
