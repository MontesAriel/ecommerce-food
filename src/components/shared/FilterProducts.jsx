import { useState } from "react";


const FilterProducts = ()  => {



    return(
        <div>
            <div>
                <select className="flex items-center gap-4 text-gray-300 bg-[#1F1D2B] py-2 px-4 rounded-lg">
                    <option value="">Todos</option>
                    <option value="1">Mayor Precio</option>
                    <option value="2">Menor Precio</option>
                </select>
            </div>
        </div>
    )
}


export default FilterProducts;