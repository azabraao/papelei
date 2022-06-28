import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useState,
} from "react";

interface BudgetProposalContextValues {
  isEditing: boolean;
  openBudgetProposal: VoidFunction;
  closeBudgetProposal: VoidFunction;
  addComments: (comments: string) => void;
  addClientName: (clientName: string) => void;
  addClientAddress: (clientAddress: string) => void;
  client: Client;
}

export const BudgetProposalContext = createContext(
  {} as BudgetProposalContextValues
);

interface BudgetProposalProps {
  children: React.ReactNode;
}

type Client = {
  name: string;
  address: string;
};

export const BudgetProposalProvider = ({ children }: BudgetProposalProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [client, setClient] = useState<Client>({} as Client);
  const [comments, setComments] = useState<string>("");

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

  const openBudgetProposal = useCallback(() => setIsEditing(true), []);
  const closeBudgetProposal = useCallback(() => setIsEditing(false), []);

  return (
    <BudgetProposalContext.Provider
      value={{
        isEditing,
        client,
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
