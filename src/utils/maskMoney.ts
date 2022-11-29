export const moneyMask = (value: string) => {
  if (!value) return;

  value = value.replace(".", "").replace(",", "").replace(/\D/g, "");

  const options = { minimumFractionDigits: 2 };
  const result = new Intl.NumberFormat("pt-BR", options).format(
    parseFloat(value) / 100
  );

  console.log("result>>", result);

  return result;
};

export default moneyMask;
