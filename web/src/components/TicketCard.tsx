import React from 'react'

const TicketCard = ({ label, count, percent = undefined }) => (
  <div className="relative inline-block min-w-[180px]">
    <img src="/ticket.svg" alt="Ticket" className="w-full h-auto" />
    <div className="absolute bottom-6 left-6 flex flex-col gap-[7px]">
      <p className="m-0 font-playfair font-bold text-[16px] leading-[24px] tracking-[2px] uppercase text-[#1A1A1A]">
        {label}
      </p>
      <div className="flex items-end gap-2">
        <span
          style={{
            fontFamily: 'Outfit, Manrope, Inter, Arial, sans-serif',
            fontWeight: 600,
            fontSize: '30px',
            lineHeight: '22px',
            letterSpacing: '1.87px',
            textTransform: 'uppercase',
            color: '#1A1A1A',
          }}
        >
          {count}
        </span>
        {percent !== undefined && (
          <span
            className="ml-1"
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 700,
              fontSize: 12,
              lineHeight: '16px',
              letterSpacing: 0,
              color: '#43B75D',
            }}
          >
            {percent}%
          </span>
        )}
      </div>
    </div>
  </div>
)

export default TicketCard
