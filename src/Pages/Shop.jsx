import sarees from "../data/sarees";
import ProductCard from "../Components/ProductCard";

function Shop() {
  return (
    <div className="grid">
      {sarees.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
}

export default Shop;
