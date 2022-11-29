export const moneyToNumber = (money: string): number => {
  const cleanMoney = money.replace("R$", "").trim();
  const number = parseFloat(cleanMoney.replaceAll(".", "").replace(",", "."));
  return number;
};
