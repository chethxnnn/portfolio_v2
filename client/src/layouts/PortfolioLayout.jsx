import { Outlet } from 'react-router-dom';

const PortfolioLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Cinematic Top/Bottom Fade Vignettes */}
      <div className="fixed top-0 left-0 w-full h-16 bg-gradient-to-b from-black via-black/60 to-transparent pointer-events-none z-40"></div>
      <div className="fixed bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-40"></div>

      {/* Subtle grain overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50"></div>
      
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default PortfolioLayout;
