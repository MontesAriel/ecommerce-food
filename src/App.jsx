import HomePage from "./components/shared/HomePage";
import { FoodProvider } from "./components/shared/ProductsContext";


function App() {


  return (
    <FoodProvider>
      <HomePage />
    </FoodProvider>
  );
}

export default App;
