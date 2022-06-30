export const validationSchema = {
  customerAddress: {
    required: {
      value: true,
      message: "Qual é o endereço do cliente?",
    },
    maxLength: 80,
  },
  customerName: {
    required: {
      value: true,
      message: "Qual é o nome do cliente?",
    },
    maxLength: 80,
  },
  budgetComments: { required: false },
};
