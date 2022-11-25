import { Snackbar } from "components/atoms";
import fetchJson from "lib/fetchJson";
import { memo, useEffect, useState } from "react";
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
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    if (isActive) setTimeout(() => setIsActive(false), 4000);
  }, [isActive]);

  const handleUndoDelete = async () => {
    await mutate("/api/product/undo-delete", fetchUndoDelete(product.id));

    onUndo();
  };

  return (
    <Snackbar
      isActive={isActive}
      message="Produto removido"
      buttonMessage="Desfazer"
      theme="info"
      onButtonClick={handleUndoDelete}
    />
  );
};

export default memo(UndoDeleteSnackbar);
