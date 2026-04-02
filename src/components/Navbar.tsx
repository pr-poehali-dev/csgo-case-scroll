import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  balance: number;
  onOpenBalance: () => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Главная', icon: 'Home' },
  { id: 'cases', label: 'Кейсы', icon: 'Package' },
  { id: 'upgrade', label: 'Апгрейд', icon: 'TrendingUp' },
  { id: 'contracts', label: 'Контракты', icon: 'FileText' },
  { id: 'inventory', label: 'Инвентарь', icon: 'Briefcase' },
  { id: 'history', label: 'История', icon: 'Clock' },
];

export default function Navbar({ activePage, onNavigate, balance, onOpenBalance }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
      <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 shrink-0"
        >
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
            <span className="font-orbitron font-black text-primary-foreground text-xs">YY</span>
          </div>
          <span className="font-orbitron font-bold text-sm text-white hidden sm:block">
            YYDROP<span className="text-primary">.</span>BATTLE
          </span>
        </button>

        {/* Nav Desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded text-sm font-medium transition-all font-rajdhani tracking-wide ${
                activePage === item.id
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              <Icon name={item.icon} size={15} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenBalance}
            className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 border border-border rounded px-3 py-1.5 transition-all group"
          >
            <span className="text-primary font-rajdhani font-bold text-sm">{balance.toLocaleString('ru-RU')} ₽</span>
            <div className="w-5 h-5 rounded bg-primary flex items-center justify-center group-hover:bg-gold-dark transition-colors">
              <Icon name="Plus" size={12} className="text-primary-foreground" />
            </div>
          </button>

          <button
            onClick={() => onNavigate('profile')}
            className="w-9 h-9 rounded bg-secondary border border-border flex items-center justify-center hover:border-primary transition-all"
          >
            <Icon name="User" size={16} className="text-muted-foreground" />
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 rounded bg-secondary border border-border flex items-center justify-center"
          >
            <Icon name={mobileOpen ? 'X' : 'Menu'} size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-rajdhani font-semibold tracking-wide ${
                activePage === item.id ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={item.icon} size={16} />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}