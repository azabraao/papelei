export const moneyToNumber = (money: string): number => {
  const [, number] = money.split(" ");
  return Number(number);
};
