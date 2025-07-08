


import { Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function Cart({ cart, onUpdateQuantity, total }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      setMaxScroll(scrollRef.current.scrollWidth - scrollRef.current.clientWidth);
    }
  }, [cart]);

  if (cart.length === 0) return null;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 220; 
      setScrollPosition(scrollRef.current.scrollLeft);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 220; // Adjust based on item width
      setScrollPosition(scrollRef.current.scrollLeft);
    }
  };

  return (
    <div className="sticky bottom-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 border-t border-gray-200">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start">
          <div className="relative w-[720px]"> {/* Fixed width container */}
            {/* Navigation arrows */}
            {cart.length > 3 && (
              <>
                <button 
                  onClick={scrollLeft}
                  className={`absolute left-0 top-[40%] -translate-y-[40%] z-10 bg-[#0A0A0A] rounded-[20px] p-2 shadow-md hover:bg-gray-100 flex items-center justify-center h-8 w-8 ${scrollPosition <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={scrollPosition <= 0}
                >
                  <ChevronLeft className="w-5 h-5 text-[#F44D21]" />
                </button>
                <button 
                  onClick={scrollRight}
                  className={`absolute right-0 top-[40%] -translate-y-[40%] z-10 bg-[#0A0A0A] rounded-[20px] p-2 shadow-md hover:bg-gray-100 flex items-center justify-center h-8 w-8 ${scrollPosition >= maxScroll ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={scrollPosition >= maxScroll}
                >
                  <ChevronRight className="w-5 h-5 text-[#F44D21]" />
                </button>
              </>
            )}

            <div 
              ref={scrollRef}
              className="flex overflow-x-auto scroll-smooth space-x-4 pb-2 scrollbar-hide"
              style={{ scrollBehavior: 'smooth' }}
              onScroll={(e) => setScrollPosition(e.target.scrollLeft)}
            >
              {cart.map((item) => (
                <div key={item.id} className="flex-shrink-0 w-[180px] flex  items-center border border-[#E5E5E5]   space-x-4 bg-gray-50 rounded-[16px] p-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />

                  <div>
                                      <div className="flex-1 min-w-[120px]">
                    <div className='flex flex-col gap-1'>
                                     <h3 className="font-manrope font-medium text-[14px] leading-[16px] tracking-[0] text-[#5B6871]">{item.name}</h3>
                         <span className="text-[#60c276] text-[12px] whitespace-nowrap">
                        Rs.{item.price * item.quantity}
                      </span>

                    </div>
     
                  </div>

                  
                    <div className="flex items-end border  border-[#F44D21] rounded-[8px] w-[80px] px-1 py-0 mt-1">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 rounded-full hover:bg-gray-200"
                      >
                        <Minus className="w-4 h-4 text-[#F44D21]" />
                      </button>
                      <span className="font-medium min-w-[20px] text-center text-[#F44D21]">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 rounded-full hover:bg-gray-200"
                      >
                        <Plus className="w-4 h-4 text-[#F44D21]" />
                      </button>
                 
                    </div>
                  </div>


                </div>
              ))}
            </div>
          </div>

<div className="ml-4 flex flex-col justify-between w-[230px] h-[100%] items-end">
  <div className="flex justify-between w-full mb-10"> {/* Added mb-4 for bottom margin */}
    <div className="font-bold text-[16px] leading-[24px] tracking-[0] text-[#1A1A1A]">
      Total Pay:
    </div>
    <div className="font-manrope font-bold text-[16px] leading-[24px] tracking-[0] text-[#F44D21]">
      Rs.{total}
    </div>
  </div>

  <button className="w-full bg-[#F44D21] text-white py-2 px-6 rounded-md  transition-colors">
    Save
  </button>
</div>

        </div>
      </div>
    </div>
  );
}