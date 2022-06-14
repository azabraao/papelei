export const numberToMoney = (number: number | string): string => {
  number = Number(number);
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(number);
};
