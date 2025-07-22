//import Image from "next/image";

const UserCard = ({ type, count }) => {
  return (
    <div
      className="relative flex-1 rounded-lg p-4 min-w-[130px] text-center flex flex-col items-center justify-center"
      style={{
        background: 'rgba(255, 145, 77, 0.25)', // semi-transparent orange
        color: '#111',
        borderRadius: '16px',
        boxShadow: '0 2px 8px rgba(255, 145, 77, 0.08)',
      }}
    >
      {/* Left notch */}
      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full -ml-3 z-10"></span>
      {/* Right notch */}
      <span className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full -mr-3 z-10"></span>
      <h2 className="capitalize text-xs font-bold tracking-widest mb-2 text-black">
        {type}
      </h2>
      <h1 className="text-2xl font-extrabold my-2 text-black">{count}</h1>
    </div>
  )
}

export default UserCard
