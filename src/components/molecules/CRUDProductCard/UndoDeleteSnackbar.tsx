import { Snackbar } from "components/atoms";
import fetchJson from "lib/fetchJson";
import { memo } from "react";
import { useSWRConfig } from "swr";

const fetchUndoDelete = (productID: string) => {
  return fetchJson("/api/product/undo-delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productID }),
  });
};

interface UndoDeleteSnackbarProps {
  product: Product;
  onUndo: VoidFunction;
}

const UndoDeleteSnackbar = ({ product, onUndo }: UndoDeleteSnackbarProps) => {
  const { mutate } = useSWRConfig();

  const handleUndoDelete = async () => {
    await mutate("/api/product/undo-delete", fetchUndoDelete(product.id));

    onUndo();
  };

  return (
    <Snackbar
      isActive
      message="Produto removido"
      buttonMessage="Desfazer"
      theme="info"
      onButtonClick={handleUndoDelete}
    />
  );
};

export default memo(UndoDeleteSnackbar);
