const maskMoney = (value: string): string => {
  return value
    .replace(/[\D]+/g, "")
    .replace(/(\d{2})$/g, ",$1")
    .replace(/(\d{3}),(\d{2})$/g, "$1,$2")
    .replace(/(\d{3}).(\d{3})/g, "$1.$2")
    .replace(/(\d{3}).(\d{3})/g, "$1.$2");
};

export default maskMoney;
