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
    console.log('foods: ', foods)
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
                    <option value="">All</option>
                    <option value="ProductsHigher">Higher prices</option>
                    <option value="ProductsMin">Lower prices</option>
                  </select>
                </div>
              </div>
            </button>
          </div>
          {/* Content */}
       
            {foods.length == 0 
                ? 
                    <div role="status" style={{margin:'0 auto', display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                
                :
                <div
                style={{ gap: "6rem" }}
                className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16"
              >
                    { filteredFoods.map((food) => (
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
            }
        </div>
      </main>
    </div>
  );
};

export default HomePage;
