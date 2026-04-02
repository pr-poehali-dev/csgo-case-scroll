import { ALL_CASES, RARITY_COLORS, formatPrice } from '@/data/cases';
import Icon from '@/components/ui/icon';

interface HomePageProps {
  onNavigate: (page: string) => void;
  balance: number;
  onOpenBalance: () => void;
}

const HOT_CASES = ALL_CASES.filter(c => c.isNew || c.isHot).slice(0, 6);
const TOP_SKINS = ALL_CASES.flatMap(c => c.skins)
  .sort((a, b) => b.price - a.price)
  .slice(0, 8);

export default function HomePage({ onNavigate, balance, onOpenBalance }: HomePageProps) {
  return (
    <div className="min-h-screen pt-16 overflow-hidden">
      {/* Hero */}
      <section className="relative bg-grid hero-glow py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 pointer-events-none" />
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-cyan/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
            <div className="w-2 h-2 rounded-full bg-green-win animate-pulse" />
            <span className="text-xs font-rajdhani font-semibold text-primary tracking-wider">ОНЛАЙН · CS2 КЕЙСЫ · МОМЕНТАЛЬНО</span>
          </div>

          <h1 className="font-orbitron font-black text-5xl sm:text-7xl mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="text-gold-gradient">YYDROP</span>
            <span className="text-white">.</span>
            <span className="text-foreground/60">BATTLE</span>
          </h1>

          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-10 font-rubik animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Открывай кейсы CS2, апгрейдируй скины и заключай выгодные контракты на самой честной платформе
          </p>

          <div className="flex flex-wrap gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={() => onNavigate('cases')}
              className="group flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-rajdhani font-bold text-sm hover:bg-gold-dark transition-all hover:scale-105"
            >
              <Icon name="Package" size={18} />
              Открыть кейс
              <Icon name="ChevronRight" size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('upgrade')}
              className="flex items-center gap-2 bg-secondary border border-border text-foreground px-8 py-3.5 rounded-xl font-rajdhani font-bold text-sm hover:border-primary/50 transition-all hover:scale-105"
            >
              <Icon name="TrendingUp" size={18} />
              Апгрейд
            </button>
            {balance < 100 && (
              <button
                onClick={onOpenBalance}
                className="flex items-center gap-2 bg-green-win/20 border border-green-win/40 text-green-win px-8 py-3.5 rounded-xl font-rajdhani font-bold text-sm hover:bg-green-win/30 transition-all hover:scale-105"
              >
                <Icon name="Wallet" size={18} />
                Пополнить баланс
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-12 mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {[
              { value: '50+', label: 'Кейсов', icon: 'Package' },
              { value: '500+', label: 'Скинов', icon: 'Layers' },
              { value: '24/7', label: 'Онлайн', icon: 'Zap' },
              { value: '100%', label: 'Честно', icon: 'Shield' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-orbitron font-black text-3xl text-primary">{s.value}</div>
                <div className="text-xs text-muted-foreground font-rajdhani mt-1 tracking-wide uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Cases */}
      <section className="max-w-[1600px] mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-rajdhani font-black text-2xl">
            🔥 ГОРЯЧИЕ <span className="text-primary">КЕЙСЫ</span>
          </h2>
          <button
            onClick={() => onNavigate('cases')}
            className="text-sm text-muted-foreground hover:text-primary transition-colors font-rajdhani flex items-center gap-1"
          >
            Все кейсы <Icon name="ChevronRight" size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {HOT_CASES.map(c => (
            <button
              key={c.id}
              onClick={() => onNavigate('cases')}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all case-card text-left"
            >
              <div className="p-4 flex items-center justify-center bg-gradient-to-b from-secondary/30 to-transparent" style={{ height: 130 }}>
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapon_cases/crate_csgo_medium.png'; }}
                />
              </div>
              <div className="p-3 border-t border-border">
                <div className="font-rajdhani font-bold text-xs truncate mb-1">{c.name}</div>
                <div className="text-primary font-rajdhani font-bold text-sm">{formatPrice(c.price)}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Top Skins */}
      <section className="max-w-[1600px] mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-rajdhani font-black text-2xl">
            💎 ТОП <span className="text-primary">СКИНЫ</span>
          </h2>
          <button
            onClick={() => onNavigate('cases')}
            className="text-sm text-muted-foreground hover:text-primary transition-colors font-rajdhani flex items-center gap-1"
          >
            Открыть кейсы <Icon name="ChevronRight" size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
          {TOP_SKINS.map((skin, i) => (
            <button
              key={skin.id}
              onClick={() => onNavigate('cases')}
              className="group bg-card border-2 rounded-xl overflow-hidden hover:scale-105 transition-all text-left case-card"
              style={{ borderColor: RARITY_COLORS[skin.rarity] }}
            >
              <div className="p-3 flex items-center justify-center" style={{ backgroundColor: `${RARITY_COLORS[skin.rarity]}10`, height: 100 }}>
                <img
                  src={skin.image}
                  alt={skin.name}
                  className="w-20 h-14 object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <div className="p-2 border-t" style={{ borderColor: `${RARITY_COLORS[skin.rarity]}30` }}>
                <div className="font-rajdhani font-bold text-xs truncate">{skin.weapon}</div>
                <div className="text-primary font-rajdhani font-bold text-xs">{formatPrice(skin.price)}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-secondary/30 border-y border-border py-12 px-4">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: 'Shield', title: 'Честный дроп', desc: 'Провабельный алгоритм открытия без манипуляций', color: '#22c55e' },
            { icon: 'Zap', title: 'Моментально', desc: 'Скины зачисляются на счёт мгновенно', color: '#f5c518' },
            { icon: 'Wallet', title: 'Быстрый вывод', desc: 'Выводи скины или рубли в любое время', color: '#4b69ff' },
            { icon: 'HeadphonesIcon', title: 'Поддержка 24/7', desc: 'Команда всегда готова помочь с вопросами', color: '#d32ce6' },
          ].map((f, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: `${f.color}20` }}>
                <Icon name={f.icon} size={24} style={{ color: f.color }} />
              </div>
              <h3 className="font-rajdhani font-bold text-sm mb-1">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="font-orbitron font-black text-3xl mb-4 text-gold-gradient">
          Готов попытать удачу?
        </h2>
        <p className="text-muted-foreground mb-8 font-rubik">
          Пополни баланс и открой свой первый кейс прямо сейчас
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={onOpenBalance}
            className="bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-rajdhani font-bold hover:bg-gold-dark transition-all hover:scale-105"
          >
            Пополнить баланс
          </button>
          <button
            onClick={() => onNavigate('cases')}
            className="bg-secondary border border-border text-foreground px-8 py-3.5 rounded-xl font-rajdhani font-bold hover:border-primary/50 transition-all hover:scale-105"
          >
            Смотреть кейсы
          </button>
        </div>
      </section>
    </div>
  );
}
