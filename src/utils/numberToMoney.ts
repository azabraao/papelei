export const numberToMoney = (
  number: number | string,
  showMoneySign = true
): string => {
  number = Number(number);
  return Intl.NumberFormat("pt-BR", {
    style: showMoneySign ? "currency" : undefined,
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(number);
};
