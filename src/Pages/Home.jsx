import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <h1>Elegant Indian Sarees</h1>
      <p>Silk, Cotton, Party Wear & more</p>
      <Link to="/shop">
        <button>Shop Now</button>
      </Link>
      <section className="categories">

      </section>

    </section>

  );
}

export default Home;
