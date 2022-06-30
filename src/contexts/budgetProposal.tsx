import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useCart } from "./cart";

interface BudgetProposalContextValues {
  isFinishing: boolean;
  shouldFinishBudget: boolean;
  openBudgetProposal: VoidFunction;
  closeBudgetProposal: VoidFunction;
  addComments: (comments: string) => void;
  addClientName: (clientName: string) => void;
  addClientAddress: (clientAddress: string) => void;
  tryToFinishBudget: VoidFunction;
  client: Client;
  comments: string;
}

export const BudgetProposalContext = createContext(
  {} as BudgetProposalContextValues
);

interface BudgetProposalProps {
  children: React.ReactNode;
}

export const BudgetProposalProvider = ({ children }: BudgetProposalProps) => {
  const [isFinishing, setIsFinishing] = useState<boolean>(false);
  const [client, setClient] = useState<Client>({} as Client);
  const [comments, setComments] = useState<string>("");
  const [shouldFinishBudget, setShouldFinishBudget] = useState<boolean>(false);
  const { cartProducts } = useCart();

  const cartItemsAreValid = useMemo(() => {
    return cartProducts.every((product) => product.isValid);
  }, [cartProducts]);

  useEffect(() => {
    if (shouldFinishBudget && cartItemsAreValid) setIsFinishing(true);
  }, [shouldFinishBudget, cartItemsAreValid]);

  const tryToFinishBudget = useCallback(() => {
    setShouldFinishBudget(true);
    setTimeout(() => {
      setShouldFinishBudget(false);
    }, 500);
  }, []);

  const addComments = useCallback(
    (comments) => {
      setComments(comments);
    },
    [comments]
  );

  const addClientName = useCallback(
    (name) => {
      setClient((current) => ({ ...current, name }));
    },
    [client]
  );

  const addClientAddress = useCallback(
    (address) => {
      setClient((current) => ({ ...current, address }));
    },
    [client]
  );

  const openBudgetProposal = useCallback(() => setIsFinishing(true), []);
  const closeBudgetProposal = useCallback(() => setIsFinishing(false), []);

  return (
    <BudgetProposalContext.Provider
      value={{
        isFinishing,
        shouldFinishBudget,
        client,
        comments,
        tryToFinishBudget,
        openBudgetProposal,
        closeBudgetProposal,
        addComments,
        addClientName,
        addClientAddress,
      }}
    >
      {children}
    </BudgetProposalContext.Provider>
  );
};

export default memo(BudgetProposalProvider);

export const useBudgetProposal = (): BudgetProposalContextValues => {
  const context = useContext(BudgetProposalContext);
  if (!context)
    throw new Error(
      "useBudgetProposal must be used within a BudgetProposalProvider"
    );

  return context;
};
