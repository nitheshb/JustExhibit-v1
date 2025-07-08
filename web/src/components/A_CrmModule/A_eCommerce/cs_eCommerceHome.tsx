


/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react'
import {
  PhoneIcon,
} from '@heroicons/react/solid'


import { USER_ROLES } from 'src/constants/userRoles'
import { useAuth } from 'src/context/firebase-auth-context'

// import BankSelectionSwitchDrop from './BankSelectionDroopDown'

import { Cart } from './cart'



const productData = [
  {
    id: 1,
    name: "Chair",
    description: "Black chairs, outdoor",
    price: 5990,
    image: '/chair1.png'
  },

  {
    id: 2,
    name: "POANG",
    description: "Armchair, birch",
    price: 12990,
    image: '/chair.png'
  },
  {
    id: 3,
    name: "BILLY",
    description: "Bookcase, white/oak",
    price: 8990,
    image: '/table.png'
  },
  {
    id: 4,
    name: "MALM",
    description: "Bed frame black-brown",
    price: 24990,
    image: '/tv.png'
  },
  {
    id: 5,
    name: "KALLAX",
    description: "Shelf unit, white",
    price: 7990,
    image: '/chair4'
  },
  {
    id: 6,
    name: "KALLAX",
    description: "Shelf unit, white",
    price: 7990,
    image: '/chair4'
  },
  {
    id: 7,
    name: "KALLAX",
    description: "Shelf unit, white",
    price: 7990,
    image: '/chair4'
  },
  {
    id: 8,
    name: "KALLAX",
    description: "Shelf unit, white",
    price: 7990,
    image: '/chair4'
  },
  {
    id: 9,
    name: "KALLAX",
    description: "Shelf unit, white",
    price: 7990,
    image: '/chair4'
  },
  {
    id: 10,
    name: "KALLAX",
    description: "Shelf unit, white",
    price: 7990,
    image: '/chair4'
  },
  {
    id: 11,
    name: "KALLAX",
    description: "Shelf unit, white",
    price: 7990,
    image: '/chair4'
  },

];






export default function EcommerceHome({ type, setStatusFun, selUnitPayload }) {


  const { user } = useAuth()

  if (!user?.role?.includes(USER_ROLES.ADMIN)) {
    return null
  }

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    console.log('ami hre')
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prevCart => {
      return prevCart.reduce((acc, item) => {
        if (item.id === productId) {
          const newQuantity = item.quantity + delta;
          if (newQuantity <= 0) return acc;
          return [...acc, { ...item, quantity: newQuantity }];
        }
        return [...acc, item];
      }, []);
    });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <section className="bg-white w-full  pb-[2px] overflow-auto no-scrollbar  h-[100%] overflow-y-scroll">
      <div className="max-w-7xl mx-auto shadow-[0px_4px_30px_0px_#00000014]  text-sm text-gray-700">

        <div className="px-[40px] py-[20px]">
          <div className="p-[12px] bg-white rounded-[16px] border border-[#E5E5E5] flex flex-row justify-between items-center">
            <section>
          <section className="flex flex-row gap-[12px] items-center">
  <section
    className="grid place-items-center bg-[linear-gradient(223.88deg,_#EA9681_6.2%,_#BDD5F1_129.74%)] text-black rounded-[10px] shadow-xs h-[64px] min-w-[64px] overflow-hidden"
  >
    <div className="flex flex-col items-center">
      <span className="font-manrope font-medium text-[12px] leading-[100%] tracking-[0] text-[#0A0A0A] truncate">
        Stall No
      </span>
      <div className="font-manrope font-medium text-[16px] leading-[100%] tracking-[0] text-[#0A0A0A] tracking-wide truncate">
        {selUnitPayload?.unit_no || '132'}
      </div>
    </div>
  </section>

  <div className="flex flex-col w-full   rounded-lg">
    <span
      className="font-manrope font-semibold text-[18px] leading-[100%] tracking-[0] text-[#414141]"
    >
      {selUnitPayload?.co_Name1 || 'NA'}
    </span>
  </div>
</section>



            </section>

            <button className="border border-[#F44D21] text-[#F44D21] hover:bg-[#F44D21]  font-medium px-4 py-2 rounded-[10px] text-sm transition-colors flex items-center">
                    <PhoneIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                                  Call
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto  text-sm text-gray-700">

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  p-[24px]">
            {productData.map((product) => (
              <div key={product.id} className="flex flex-col bg-white border border-gray-200  overflow-hidden">

                <div className="relative aspect-square bg-white p-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className=" p-4">
<div className="flex justify-between mb-2 items-start">
  <div>
    <h2 className="font-bold text-[16px] leading-[24px] tracking-[0] text-[#252C32]">
      {product.name}
    </h2>
    <p className="font-manrope font-medium text-[12px] leading-[16px] tracking-[0] text-[#5B6871]">
      {product.description}
    </p>
  </div>

  <div className="flex items-baseline space-x-1 pt-1">
    <span className="font-manrope font-semibold text-[18px] leading-[24px] tracking-[-0.014em] text-[#252C32]">
      Rs.{product.price.toLocaleString()}
    </span>
  </div>
</div>


                  {cart.find(item => item.id === product.id) ? (
                    <div className="flex items-center justify-center space-x-4 border border-[#F44D21] rounded-[8px] py-2 px-4">
                      <button 
                        className="w-[16px] h-[16px] rounded flex items-center justify-center text-[#F44D21]"
                        onClick={() => updateQuantity(product.id, -1)}
                      >
                        −
                      </button>
                      <span className="font-medium  min-w-[16px] text-center  text-[] text-[#F44D21]">
                        {cart.find(item => item.id === product.id)?.quantity || 0}
                      </span>
                      <button 
                        className="w-[16px] h-[16px] rounded flex items-center justify-center  text-[#F44D21]"
                        onClick={() => updateQuantity(product.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button className="w-full rounded-[8px] bg-[#F44D21] text-white px-4 py-2.5 text-sm font-medium hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
                      onClick={() => addToCart(product)}
                    >
                      <span>🛒</span>
                      <span>Add to cart</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <section className='pb-2'>
          <Cart
            cart={cart}
            onUpdateQuantity={updateQuantity}
            total={total}
          />
        </section>

      </div>

    </section>
  )
}