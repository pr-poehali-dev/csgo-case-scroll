import { useState } from 'react';
import { RARITY_COLORS, RARITY_NAMES, WEAR_NAMES, formatPrice, getAllSkins, type Skin } from '@/data/cases';
import Icon from '@/components/ui/icon';

interface InventoryPageProps {
  inventory: Skin[];
  onSell: (skin: Skin) => void;
}

const SORTS = [
  { id: 'price_desc', label: 'Дорогие' },
  { id: 'price_asc', label: 'Дешёвые' },
  { id: 'rarity', label: 'Редкость' },
  { id: 'name', label: 'По имени' },
];

export default function InventoryPage({ inventory, onSell }: InventoryPageProps) {
  const [sort, setSort] = useState('price_desc');
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const displayInventory = inventory.length > 0 ? inventory : getAllSkins().slice(0, 12);

  const filtered = displayInventory
    .filter(s =>
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.weapon.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      switch (sort) {
        case 'price_asc': return a.price - b.price;
        case 'price_desc': return b.price - a.price;
        case 'rarity': {
          const order = ['common', 'uncommon', 'rare', 'mythical', 'legendary', 'ancient', 'contraband'];
          return order.indexOf(b.rarity) - order.indexOf(a.rarity);
        }
        case 'name': return `${a.weapon} ${a.name}`.localeCompare(`${b.weapon} ${b.name}`);
        default: return 0;
      }
    });

  const toggleSelect = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const selectedSkins = displayInventory.filter(s => selected.includes(s.id));
  const selectedValue = selectedSkins.reduce((sum, s) => sum + s.price, 0);
  const totalValue = displayInventory.reduce((sum, s) => sum + s.price, 0);

  const handleSellSelected = () => {
    selectedSkins.forEach(s => onSell(s));
    setSelected([]);
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-[1600px] mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-rajdhani font-black text-4xl mb-1">
              МОЙ <span className="text-primary">ИНВЕНТАРЬ</span>
            </h1>
            <div className="text-muted-foreground text-sm">
              {displayInventory.length} предметов · Общая стоимость:
              <span className="text-primary font-rajdhani font-bold ml-1">{formatPrice(totalValue)}</span>
            </div>
          </div>

          {selected.length > 0 && (
            <div className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-2.5 animate-fade-in">
              <span className="text-sm text-muted-foreground">
                Выбрано: <span className="text-foreground font-bold">{selected.length}</span>
                {' · '}
                <span className="text-primary font-rajdhani font-bold">{formatPrice(selectedValue)}</span>
              </span>
              <button
                onClick={handleSellSelected}
                className="bg-green-win text-white text-xs font-rajdhani font-bold px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity"
              >
                Продать все
              </button>
              <button
                onClick={() => setSelected([])}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name="X" size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex gap-1">
            {SORTS.map(s => (
              <button
                key={s.id}
                onClick={() => setSort(s.id)}
                className={`px-3 py-1.5 rounded text-xs font-rajdhani font-semibold tracking-wide transition-all ${
                  sort === s.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground border border-border'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2 bg-secondary border border-border rounded px-3 py-1.5">
            <Icon name="Search" size={14} className="text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Поиск..."
              className="bg-transparent text-sm outline-none w-36 placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
              <Icon name="Package" size={36} className="text-muted-foreground" />
            </div>
            <h3 className="font-rajdhani font-bold text-xl mb-2">Инвентарь пуст</h3>
            <p className="text-muted-foreground text-sm">Открывай кейсы, чтобы получить предметы</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {filtered.map(skin => {
              const isSelected = selected.includes(skin.id);
              return (
                <div
                  key={skin.id}
                  className={`group relative bg-card rounded-xl border-2 overflow-hidden cursor-pointer transition-all duration-200 ${
                    isSelected ? 'ring-2 ring-primary' : 'hover:border-opacity-70'
                  }`}
                  style={{ borderColor: isSelected ? '#f5c518' : RARITY_COLORS[skin.rarity] }}
                  onClick={() => toggleSelect(skin.id)}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 z-10 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Icon name="Check" size={12} className="text-primary-foreground" />
                    </div>
                  )}

                  <div
                    className="p-3 flex items-center justify-center"
                    style={{ backgroundColor: `${RARITY_COLORS[skin.rarity]}10`, height: 120 }}
                  >
                    <img
                      src={skin.image}
                      alt={skin.name}
                      className="w-24 h-16 object-contain group-hover:scale-105 transition-transform"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>

                  <div className="p-2.5 border-t" style={{ borderColor: `${RARITY_COLORS[skin.rarity]}30` }}>
                    <div className="text-xs font-semibold mb-0.5 truncate" style={{ color: RARITY_COLORS[skin.rarity] }}>
                      {RARITY_NAMES[skin.rarity]}
                    </div>
                    <div className="font-rajdhani font-bold text-sm truncate">{skin.weapon}</div>
                    <div className="text-xs text-muted-foreground truncate">{skin.name}</div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-primary font-rajdhani font-bold text-sm">{formatPrice(skin.price)}</span>
                      <span className="text-xs text-muted-foreground">{skin.wear}</span>
                    </div>
                  </div>

                  <div
                    className="absolute bottom-0 left-0 right-0 bg-green-win/90 py-1.5 flex items-center justify-center gap-1 text-white text-xs font-rajdhani font-bold translate-y-full group-hover:translate-y-0 transition-transform"
                    onClick={e => { e.stopPropagation(); onSell(skin); }}
                  >
                    <Icon name="DollarSign" size={12} />
                    Продать
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
