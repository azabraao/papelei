import { QuantitySelector } from "components/molecules";
import { memo } from "react";

const placeHolderImage = "https://dummyimage.com/127x127";

const ProductCard = () => {
  return (
    <div className="w-40 shadow-card-effect-soft p-4 rounded-lg flex flex-col gap-2 text-black-70 cursor-pointer">
      <img src={placeHolderImage} alt="Product" width={300} height={300} />
      <article className="flex flex-col gap-2 mb-1">
        <span>Placa de gesso acartonado STD</span>
        <h3 className="font-medium ">R$ 31,00</h3>
      </article>
      <QuantitySelector
        name="quantity"
        onChange={() => true}
        placeholder="Qtd"
      />
    </div>
  );
};

export default memo(ProductCard);
