import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import deathEgg from '../../assets/icons/death_egg.webp';
import sonicRun from '../../assets/icons/sonic_run.gif';
import monitor from '../../assets/icons/monitor_icon.gif';
import motobug from '../../assets/icons/motobug_icon.gif';

export const Layout = () => {
  const { user, canRegister, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { name: 'HOME', path: '/', icon: deathEgg },
    { name: 'OPPONENTS', path: '/opponents', icon: sonicRun },
    { name: 'PLANS', path: '/plans', icon: monitor },
  ];

  const renderIcon = (src: string, alt: string) => (
    <img 
        src={src} 
        alt={alt} 
        className="w-8 h-8 object-contain drop-shadow-[0_0_5px_rgba(255,255,255,0.1)] transition-transform group-hover:scale-110" 
    />
  );

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
      <aside className="w-64 bg-black border-r border-red-900 flex flex-col">
        <div className="p-6 border-b border-red-900/50">
          <h1 className="sonic-title text-2xl text-red-600 tracking-tighter italic">EGG-DATA</h1>
          <p className="sonic-ui text-[8px] text-gray-500 uppercase tracking-widest">v.2.0.26-ALPHA</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 p-3 rounded group sonic-ui text-xs transition-all ${
                    location.pathname === item.path 
                    ? 'bg-red-700 text-white shadow-[0_0_15px_rgba(185,28,28,0.5)]' 
                    : 'text-gray-400 hover:text-red-500 hover:bg-white/5'
                }`}
                >
                {renderIcon(item.icon, item.name)}
                <span className="tracking-widest">{item.name}</span>
            </Link>
          ))}

          {canRegister && (
            <Link
              to="/users"
              className={`flex items-center gap-3 p-3 rounded sonic-ui text-xs transition-all ${
                location.pathname === '/users' 
                ? 'bg-yellow-600 text-white shadow-[0_0_10px_rgba(202,138,4,0.4)]' 
                : 'text-gray-400 hover:text-yellow-500 hover:bg-white/5'
              }`}
            >
              {renderIcon(motobug, 'RECRUITMENT')}
              RECRUITMENT
            </Link>
          )}
        </nav>

        <div className="p-4 bg-[#050505] border-t border-red-900/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center font-bold text-xs border border-red-500">
              {user?.userName?.[0].toUpperCase() || 'E'}
            </div>
            <div className="overflow-hidden">
              <p className="text-[10px] font-bold truncate uppercase tracking-tight">{user?.userName}</p>
              <p className="text-[8px] sonic-ui text-yellow-600 italic">{user?.rank}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full py-2 text-[9px] sonic-ui border border-red-900 text-red-700 hover:bg-red-900 hover:text-white transition-all rounded"
          >
            TERMINATE SESSION
          </button>
        </div>
      </aside>

      <main className="flex-1 h-full overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};