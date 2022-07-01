import { memo, useCallback } from "react";
import { Button } from "components/atoms";
import { useBudgetProposal } from "contexts/budgetProposal";
import { useCart } from "contexts/cart";
import { shareFile } from "utils";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF from "./PDF";

const DownloadButton = () => {
  const { client, comments } = useBudgetProposal();
  const { cartTotal, cartProducts } = useCart();

  const handleDownload = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, blob, url) => {
      if ("navigator" in window && "share" in navigator) {
        event.preventDefault();
        event.stopPropagation();

        shareFile({ blob, fileName: `Orçamento ${client.name}.pdf`, url });
      }
    },
    [client]
  );

  return (
    <PDFDownloadLink
      className="pointer-events-none"
      document={
        <PDF
          cartProducts={cartProducts}
          cartTotal={cartTotal}
          client={client}
          comments={comments}
        />
      }
      fileName={`Orçamento ${client.name}.pdf`}
    >
      {({ blob, loading, url }) => {
        return loading ? (
          <Button
            disabled
            fullWidth
            testid="budget-modal-bottom-download-button"
          >
            Criando orçamento...
          </Button>
        ) : (
          <Button
            fullWidth
            backgroundColor="success"
            type="button"
            className="pointer-events-auto"
            onClick={(event) => handleDownload(event, blob, url)}
            testid="budget-modal-bottom-download-button"
          >
            Compartilhe agora
          </Button>
        );
      }}
    </PDFDownloadLink>
  );
};

export default memo(DownloadButton);
