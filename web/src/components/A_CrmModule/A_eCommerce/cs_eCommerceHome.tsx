// /* eslint-disable jsx-a11y/anchor-is-valid */
// /* eslint-disable jsx-a11y/click-events-have-key-events */
// /* eslint-disable jsx-a11y/no-static-element-interactions */
// import { useState } from 'react'
// import {
//   PhoneIcon,
// } from '@heroicons/react/solid'


// import { USER_ROLES } from 'src/constants/userRoles'
// import { useAuth } from 'src/context/firebase-auth-context'

// // import BankSelectionSwitchDrop from './BankSelectionDroopDown'

// import { Cart } from './cart'



// const productData = [
//   {
//     id: 1,
//     name: "Chair",
//     description: "Black chairs, outdoor",
//     price: 5990,
//     image: '/chair1.png'
//   },

//   {
//     id: 2,
//     name: "POANG",
//     description: "Armchair, birch",
//     price: 12990,
//     image: '/chair.png'
//   },
//   {
//     id: 3,
//     name: "BILLY",
//     description: "Bookcase, white/oak",
//     price: 8990,
//     image: '/table.png'
//   },
//   {
//     id: 4,
//     name: "MALM",
//     description: "Bed frame black-brown",
//     price: 24990,
//     image: '/tv.png'
//   },
//   {
//     id: 5,
//     name: "KALLAX",
//     description: "Shelf unit, white",
//     price: 7990,
//     image: '/chair4'
//   },
//   {
//     id: 6,
//     name: "KALLAX",
//     description: "Shelf unit, white",
//     price: 7990,
//     image: '/chair4'
//   },
//   {
//     id: 7,
//     name: "KALLAX",
//     description: "Shelf unit, white",
//     price: 7990,
//     image: '/chair4'
//   },
//   {
//     id: 8,
//     name: "KALLAX",
//     description: "Shelf unit, white",
//     price: 7990,
//     image: '/chair4'
//   },
//   {
//     id: 9,
//     name: "KALLAX",
//     description: "Shelf unit, white",
//     price: 7990,
//     image: '/chair4'
//   },
//   {
//     id: 10,
//     name: "KALLAX",
//     description: "Shelf unit, white",
//     price: 7990,
//     image: '/chair4'
//   },
//   {
//     id: 11,
//     name: "KALLAX",
//     description: "Shelf unit, white",
//     price: 7990,
//     image: '/chair4'
//   },

// ];






// export default function EcommerceHome({ type, setStatusFun, selUnitPayload }) {


//   const { user } = useAuth()

//   if (!user?.role?.includes(USER_ROLES.ADMIN)) {
//     return null
//   }

//   const [cart, setCart] = useState([]);

//   const addToCart = (product) => {
//     console.log('ami hre')
//     setCart(prevCart => {
//       const existingItem = prevCart.find(item => item.id === product.id);
//       if (existingItem) {
//         return prevCart.map(item =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prevCart, { ...product, quantity: 1 }];
//     });
//   };

//   const updateQuantity = (productId: number, delta: number) => {
//     setCart(prevCart => {
//       return prevCart.reduce((acc, item) => {
//         if (item.id === productId) {
//           const newQuantity = item.quantity + delta;
//           if (newQuantity <= 0) return acc;
//           return [...acc, { ...item, quantity: newQuantity }];
//         }
//         return [...acc, item];
//       }, []);
//     });
//   };

//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   return (
//     <section className="bg-white w-full md:px-10 md:mb-20 pb-[250px] overflow-auto no-scrollbar  h-[100%] overflow-y-scroll">
//       <div className="max-w-3xl mx-auto py-4 text-sm text-gray-700">

//         <div className="mt-1">
//           <div className="p-2 bg-gradient-to-r from-violet-50 to-pink-50 rounded-md flex flex-row justify-between">
//             <section>
//               <section className="flex flex-row">

//                 <section className="bg-[#EC1066]  items-center rounded-2xl shadow-xs flex flex-col px-2 py-4 min-w-[100px]">
//                   <div className="font-semibold text-white  text-[22px]  mb-[1] tracking-wide">
//                     {selUnitPayload?.unit_no}
//                   </div>
//                   <span
//                     className={`items-center h-6   text-xs font-semibold text-white  rounded-full
//                       `}
//                   >
//                     Stall No
//                   </span>
//                 </section>


//                 <div className="flex flex-col w-full  ml-2 item-right  px-2  mr-2 rounded-lg">
//                   <span
//                     className={`items-center  mt-[2px] mb-1  text-xl uppercase font-semibold text-black
//                       `}
//                   >
//                     {selUnitPayload?.companyName ||
//                       'NA'}
//                   </span>
//                   <span
//                     className={`items-center   mb-1  text-xs
//                       `}
//                   >
//                     {selUnitPayload?.co_Name1 ||
//                       'NA'}
//                   </span>
//                   <span
//                     className={`items-center  mb-1  text-xs flex flex-row
//                       `}
//                   >
//                     {/* {selUnitPayload?.phoneNo1 ||
//                                                 'NA'} */}

//                     <PhoneIcon className="h-4 w-4 mt-1 mr-1" aria-hidden="true" />{' '}
//                     <span className='mt-[2px]'>   {selUnitPayload?.phoneNo1?.toString()?.replace(
//                       /(\d{3})(\d{3})(\d{4})/,
//                       '$1-$2-$3'
//                     )}</span>
//                   </span>



//                 </div>

//               </section>


//             </section>

//             <h2 className="font-medium flex-grow text-right mr-2">Ecommerce</h2>
//             {/* <p className="text-md text-[10px] flex-grow text-right">
//               Waiting for {' '} {cart.length} || {total}
//             </p> */}
//           </div>
//         </div>
//       </div>
//       <div className="max-w-3xl mx-auto py-4 text-sm text-gray-700">




//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-white">
//             {productData.map((product) => (
//               <div key={product.id} className="flex flex-col bg-white hover:shadow-lg transition-shadow duration-200 rounded-lg">

//                 <div className="relative aspect-square bg-gray-50">
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-full h-full object-contain"
//                   />

//                 </div>


//                 <div className="space-y-2 p-4">
//                   <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">{product.name}</h2>
//                   <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>


//                   <div className="flex items-baseline space-x-1 pt-1">
//                     <span className="text-sm font-medium text-gray-900">Rs.</span>
//                     <span className="text-xl font-bold text-gray-900">{product.price.toLocaleString()}</span>
//                   </div>




//                   <button className="w-full rounded-lg bg-blue-600 text-white px-4 py-2.5 text-sm font-medium hover:bg-blue-700 transition-colors mt-4"
//                     onClick={() => addToCart(product)}
//                   >
//                     Add to cart
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>





//         <section className='max-w-7xl'>

//           <Cart
//             cart={cart}
//             onUpdateQuantity={updateQuantity}
//             total={total}
//           />
//         </section>



//       </div>

//     </section>
//   )
// }











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
    <section className="bg-gray-50 w-full md:px-10 md:mb-20 pb-[250px] overflow-auto no-scrollbar  h-[100%] overflow-y-scroll">
      <div className="max-w-7xl mx-auto py-4 text-sm text-gray-700">

        <div className="mt-1">
          <div className="p-4 bg-white rounded-xl shadow-sm flex flex-row justify-between items-center">
            <section>
              <section className="flex flex-row">

                <section className="bg-orange-100 text-orange-600 items-center rounded-2xl shadow-xs flex flex-col px-4 py-3 min-w-[100px]">
                  <div className="font-bold text-orange-600 text-[20px] mb-1 tracking-wide">
                    {selUnitPayload?.unit_no || '132'}
                  </div>
                  <span
                    className={`items-center text-xs font-medium text-orange-600
                      `}
                  >
                    Stall No
                  </span>
                </section>


                <div className="flex flex-col w-full ml-4 item-right px-2 mr-2 rounded-lg">
                  <span
                    className={`items-center mt-[2px] mb-1 text-xl font-bold text-gray-900
                      `}
                  >
                    {selUnitPayload?.companyName ||
                      'S. Vishal Kumar'}
                  </span>
                  <span
                    className={`items-center mb-1 text-sm text-blue-600 flex items-center
                      `}
                  >
                    <span className="mr-2">📘</span>
                    {selUnitPayload?.co_Name1 ||
                      'Facebook'}
                  </span>
                  <span
                    className={`items-center mb-1 text-sm flex flex-row text-gray-600
                      `}
                  >
                    <PhoneIcon className="h-4 w-4 mt-1 mr-1" aria-hidden="true" />{' '}
                    <span className='mt-[2px]'>   {selUnitPayload?.phoneNo1?.toString()?.replace(
                      /(\d{3})(\d{3})(\d{4})/,
                      '$1-$2-$3'
                    ) || '123-456-7890'}</span>
                  </span>
                </div>

              </section>


            </section>

            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium text-sm transition-colors">
              📞 Call
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-4 text-sm text-gray-700">

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {productData.map((product) => (
              <div key={product.id} className="flex flex-col bg-white border border-gray-200 hover:shadow-md transition-shadow duration-200 rounded-lg overflow-hidden">

                <div className="relative aspect-square bg-white p-6 border-b border-gray-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="space-y-3 p-4">
                  <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">{product.name}</h2>
                  <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>

                  <div className="flex items-baseline space-x-1 pt-1">
                    <span className="text-lg font-bold text-gray-900">Rs.{product.price.toLocaleString()}</span>
                  </div>

                  {cart.find(item => item.id === product.id) ? (
                    <div className="flex items-center justify-center space-x-4 border border-gray-300 rounded-lg py-2 px-4">
                      <button 
                        className="w-8 h-8 rounded flex items-center justify-center text-gray-600 hover:bg-gray-50 border border-gray-300"
                        onClick={() => updateQuantity(product.id, -1)}
                      >
                        −
                      </button>
                      <span className="font-medium text-gray-900 min-w-[20px] text-center">
                        {cart.find(item => item.id === product.id)?.quantity || 0}
                      </span>
                      <button 
                        className="w-8 h-8 rounded flex items-center justify-center text-gray-600 hover:bg-gray-50 border border-gray-300"
                        onClick={() => updateQuantity(product.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button className="w-full rounded-lg bg-orange-500 text-white px-4 py-2.5 text-sm font-medium hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
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

        <section className='max-w-7xl'>
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