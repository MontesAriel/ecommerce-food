import {  useState, useContext } from "react";
import {
  RiMenu3Fill,
  RiUser3Line,
  RiAddLine,
  RiPieChartLine,
  RiCloseLine,

} from "react-icons/ri";
// Components
import Sidebar from "./Sidebar";
import ShoppingCart from "./ShoppingCart";
import Header from "./Header";
import Card from "./Card";

import { FoodContext } from "./ProductsContext";

const HomePage = () => {
  const { foods } = useContext(FoodContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangeSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const [filters, setFilters] = useState({
    minPrice: null,
  });

  const handleChangePrice = (event) => {
    const selectedValue = event.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      minPrice:
        selectedValue === "ProductsHigher"
          ? 2000
          : selectedValue === "ProductsMin"
          ? 0
          : null,
    }));
  };

  const filteredFoods = foods.filter((food) => {
    if (searchQuery === "" && filters.minPrice === null) {
      return true;
    } else {
      const description = food.description.toLowerCase();
      const query = searchQuery.toLowerCase();
      return (
        description.includes(query) &&
        (filters.minPrice === null ||
          (filters.minPrice === 0 && food.price <= 2000) ||
          (filters.minPrice === 2000 && food.price >= 2000))
      );
    }
  });

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowOrder(false);
  };

  const toggleOrders = () => {
    setShowOrder(!showOrder);
    setShowMenu(false);
  };

  return (
    <div className="bg-[#262837] w-full min-h-screen">
      <Sidebar showMenu={showMenu} />
      <ShoppingCart showOrder={showOrder} setShowOrder={setShowOrder} />
      {/* Menu movil */}
      <nav className="bg-[#1F1D2B] lg:hidden fixed w-full bottom-0 left-0 text-3xl text-gray-400 py-2 px-8 flex items-center justify-between rounded-tl-xl rounded-tr-xl">
        <button className="p-2">
          <RiUser3Line />
        </button>
        <button className="p-2">
          <RiAddLine />
        </button>
        <button onClick={toggleOrders} className="p-2">
          <RiPieChartLine />
        </button>
        <button onClick={toggleMenu} className="text-white p-2">
          {showMenu ? <RiCloseLine /> : <RiMenu3Fill />}
        </button>
      </nav>
      <main className="lg:pl-32 lg:pr-96 pb-20">
        <div className="md:p-8 p-4">
          {/* Header */}
          <Header
            searchQuery={searchQuery}
            handleSearch={handleChangeSearch}
          />
          {/* Title content */}
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-xl text-gray-300">Choose Dishes</h2>
            <button className="flex items-center gap-4 text-gray-300 bg-[#1F1D2B] py-2 px-4 rounded-lg">
              <div>
                <div>
                  <select
                    onChange={handleChangePrice}
                    id="price"
                    className="flex items-center gap-4 text-gray-300 bg-[#1F1D2B] py-2 px-4 rounded-lg"
                  >
                    <option value="">Todos</option>
                    <option value="ProductsHigher">Mayor Precio</option>
                    <option value="ProductsMin">Menor Precio</option>
                  </select>
                </div>
              </div>
            </button>
          </div>
          {/* Content */}
          <div
            style={{ gap: "6rem" }}
            className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16"
          >
            {filteredFoods.map((food) => (
              <div key={food.description}>
                <Card
                  img={food.image}
                  description={food.description}
                  price={food.price}
                  inventory={food.inventory}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
