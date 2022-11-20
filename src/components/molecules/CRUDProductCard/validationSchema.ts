export const validationSchema = {
  name: {
    required: {
      value: true,
      message: "Qual é o nome do produto?",
    },
    maxLength: 200,
  },
  price: {
    required: {
      value: true,
      message: "Qual o valor deste produto?",
    },
    maxLength: 80,
  },
};
