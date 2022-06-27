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
}

export const BudgetProposalContext = createContext(
  {} as BudgetProposalContextValues
);

interface BudgetProposalProps {
  children: React.ReactNode;
}

export const BudgetProposalProvider = ({ children }: BudgetProposalProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const openBudgetProposal = useCallback(() => setIsEditing(true), []);
  const closeBudgetProposal = useCallback(() => setIsEditing(false), []);

  return (
    <BudgetProposalContext.Provider
      value={{
        isEditing,
        openBudgetProposal,
        closeBudgetProposal,
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
