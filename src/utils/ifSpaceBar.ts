export const ifSpaceBar = (
  event: React.KeyboardEvent<HTMLDivElement>,
  callback: () => void
) => {
  if (event.key === " ") {
    callback();
  }
};
