import { RARITY_COLORS, RARITY_NAMES, formatPrice, type Skin } from '@/data/cases';
import Icon from '@/components/ui/icon';

interface HistoryEntry {
  id: string;
  type: 'open' | 'upgrade_win' | 'upgrade_lose' | 'contract' | 'sell' | 'deposit';
  skin?: Skin;
  caseName?: string;
  amount?: number;
  timestamp: Date;
}

const DEMO_HISTORY: HistoryEntry[] = [
  { id: '1', type: 'open', caseName: 'Revolution Case', skin: { id: 'h1', name: 'Aquamarine Revenge', weapon: 'AK-47', rarity: 'rare', price: 320, wear: 'FT', image: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_ak47_hy_ak47_redline_light_medium.png' }, timestamp: new Date(Date.now() - 5 * 60000) },
  { id: '2', type: 'upgrade_win', skin: { id: 'h2', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 165000, wear: 'FT', image: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_awp_cu_medieval_dragon_awp_light_medium.png' }, timestamp: new Date(Date.now() - 22 * 60000) },
  { id: '3', type: 'upgrade_lose', skin: { id: 'h3', name: 'Fade', weapon: 'Glock-18', rarity: 'mythical', price: 1850, wear: 'FN', image: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_glock_am_fade_t_light_medium.png' }, timestamp: new Date(Date.now() - 45 * 60000) },
  { id: '4', type: 'deposit', amount: 1000, timestamp: new Date(Date.now() - 2 * 3600000) },
  { id: '5', type: 'open', caseName: 'Recoil Case', skin: { id: 'h5', name: 'Asiimov', weapon: 'AWP', rarity: 'legendary', price: 7800, wear: 'FT', image: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_awp_am_asiimov_light_medium.png' }, timestamp: new Date(Date.now() - 3 * 3600000) },
  { id: '6', type: 'sell', skin: { id: 'h6', name: 'Redline', weapon: 'AK-47', rarity: 'rare', price: 750, wear: 'FT', image: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_ak47_hy_ak47_redline_light_medium.png' }, amount: 750, timestamp: new Date(Date.now() - 4 * 3600000) },
  { id: '7', type: 'contract', skin: { id: 'h7', name: 'Hyper Beast', weapon: 'M4A1-S', rarity: 'mythical', price: 3200, wear: 'FN', image: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_m4a1_silencer_cu_m4a1s_hyper_beast_light_medium.png' }, timestamp: new Date(Date.now() - 6 * 3600000) },
  { id: '8', type: 'deposit', amount: 500, timestamp: new Date(Date.now() - 24 * 3600000) },
];

function formatTime(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 60) return `${mins} мин назад`;
  if (hours < 24) return `${hours} ч назад`;
  return `${days} д назад`;
}

const TYPE_CONFIG = {
  open: { icon: 'Package', label: 'Открытие кейса', color: '#4b69ff' },
  upgrade_win: { icon: 'TrendingUp', label: 'Апгрейд — победа', color: '#22c55e' },
  upgrade_lose: { icon: 'TrendingDown', label: 'Апгрейд — поражение', color: '#ef4444' },
  contract: { icon: 'FileText', label: 'Контракт обмена', color: '#d32ce6' },
  sell: { icon: 'DollarSign', label: 'Продажа предмета', color: '#f5c518' },
  deposit: { icon: 'Wallet', label: 'Пополнение баланса', color: '#22c55e' },
};

export default function HistoryPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-rajdhani font-black text-4xl mb-2">
            ИСТОРИЯ <span className="text-primary">ОПЕРАЦИЙ</span>
          </h1>
          <p className="text-muted-foreground text-sm">Все ваши действия на платформе</p>
        </div>

        <div className="space-y-2">
          {DEMO_HISTORY.map(entry => {
            const cfg = TYPE_CONFIG[entry.type];
            return (
              <div key={entry.id} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 animate-fade-in hover:border-border/60 transition-colors">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${cfg.color}20` }}
                >
                  <Icon name={cfg.icon} size={18} style={{ color: cfg.color }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-rajdhani font-bold text-sm">{cfg.label}</div>
                  {entry.skin && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs" style={{ color: RARITY_COLORS[entry.skin.rarity] }}>
                        {RARITY_NAMES[entry.skin.rarity]}
                      </span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">{entry.skin.weapon} | {entry.skin.name}</span>
                    </div>
                  )}
                  {entry.caseName && (
                    <div className="text-xs text-muted-foreground mt-0.5">{entry.caseName}</div>
                  )}
                </div>

                {entry.skin && (
                  <img src={entry.skin.image} alt={entry.skin.name} className="w-14 h-10 object-contain shrink-0" />
                )}

                <div className="text-right shrink-0">
                  {entry.skin && (
                    <div className="font-rajdhani font-bold text-sm" style={{ color: cfg.color }}>
                      {entry.type === 'sell' || entry.type === 'upgrade_lose' ? '' : '+'}
                      {formatPrice(entry.skin.price)}
                    </div>
                  )}
                  {entry.amount && entry.type === 'deposit' && (
                    <div className="font-rajdhani font-bold text-sm text-green-win">
                      +{entry.amount.toLocaleString('ru-RU')} ₽
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground mt-0.5">{formatTime(entry.timestamp)}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {[
            { icon: 'Package', label: 'Кейсов открыто', value: '12', color: '#4b69ff' },
            { icon: 'TrendingUp', label: 'Апгрейдов', value: '8', color: '#22c55e' },
            { icon: 'DollarSign', label: 'Заработано', value: '48 750 ₽', color: '#f5c518' },
          ].map((stat, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4 text-center">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: `${stat.color}20` }}>
                <Icon name={stat.icon} size={20} style={{ color: stat.color }} />
              </div>
              <div className="font-orbitron font-bold text-2xl" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1 font-rajdhani">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
