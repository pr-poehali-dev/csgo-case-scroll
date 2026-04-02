import { useState } from 'react';
import { getAllSkins, ALL_CASES, RARITY_COLORS, RARITY_NAMES, formatPrice, type Skin } from '@/data/cases';
import Icon from '@/components/ui/icon';

interface ContractsPageProps {
  inventory: Skin[];
  onInventoryChange: (inv: Skin[]) => void;
}

const ALL_SKINS = getAllSkins();

export default function ContractsPage({ inventory, onInventoryChange }: ContractsPageProps) {
  const [selected, setSelected] = useState<Skin[]>([]);
  const [result, setResult] = useState<Skin | null>(null);
  const [showResult, setShowResult] = useState(false);

  const MAX_ITEMS = 10;

  const addSkin = (skin: Skin) => {
    if (selected.length >= MAX_ITEMS) return;
    if (selected.find(s => s.id === skin.id)) return;
    setSelected(prev => [...prev, skin]);
  };

  const removeSkin = (id: string) => {
    setSelected(prev => prev.filter(s => s.id !== id));
  };

  const avgPrice = selected.length > 0
    ? selected.reduce((s, sk) => s + sk.price, 0) / selected.length
    : 0;

  const getContractResult = (): Skin => {
    const targetPrice = avgPrice * (1.5 + Math.random() * 1.5);
    const candidates = ALL_SKINS.filter(s => s.price >= targetPrice * 0.7 && s.price <= targetPrice * 2);
    if (candidates.length === 0) return ALL_SKINS[Math.floor(Math.random() * ALL_SKINS.length)];
    return candidates[Math.floor(Math.random() * candidates.length)];
  };

  const executeContract = () => {
    if (selected.length < 10) return;
    const win = getContractResult();
    setResult(win);
    const newInv = inventory.filter(s => !selected.find(sel => sel.id === s.id));
    newInv.push(win);
    onInventoryChange(newInv);
    setSelected([]);
    setShowResult(true);
  };

  const totalInputValue = selected.reduce((s, sk) => s + sk.price, 0);
  const estimatedOutput = avgPrice * 1.5;

  const availableForContract = (inventory.length > 0 ? inventory : ALL_SKINS).filter(
    s => !selected.find(sel => sel.id === s.id)
  );

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-rajdhani font-black text-4xl mb-2">
            КОНТРАКТЫ <span className="text-primary">ОБМЕНА</span>
          </h1>
          <p className="text-muted-foreground text-sm">Обменяй 10 предметов одного качества на один предмет более высокого</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          {/* Contract builder */}
          <div className="space-y-4">
            {/* Slots */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-rajdhani font-bold text-lg">
                  Предметы для обмена
                  <span className={`ml-2 text-sm ${selected.length === MAX_ITEMS ? 'text-primary' : 'text-muted-foreground'}`}>
                    {selected.length}/{MAX_ITEMS}
                  </span>
                </h2>
                {selected.length > 0 && (
                  <button
                    onClick={() => setSelected([])}
                    className="text-xs text-muted-foreground hover:text-destructive transition-colors font-rajdhani"
                  >
                    Очистить всё
                  </button>
                )}
              </div>

              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: MAX_ITEMS }).map((_, i) => {
                  const skin = selected[i];
                  return (
                    <div
                      key={i}
                      className={`relative rounded-lg border-2 aspect-square flex flex-col items-center justify-center p-2 transition-all ${
                        skin ? '' : 'border-dashed border-border bg-secondary/20'
                      }`}
                      style={skin ? { borderColor: RARITY_COLORS[skin.rarity], backgroundColor: `${RARITY_COLORS[skin.rarity]}10` } : {}}
                    >
                      {skin ? (
                        <>
                          <button
                            onClick={() => removeSkin(skin.id)}
                            className="absolute top-1 right-1 w-4 h-4 rounded-full bg-destructive flex items-center justify-center z-10 hover:opacity-80"
                          >
                            <Icon name="X" size={10} className="text-white" />
                          </button>
                          <img src={skin.image} alt={skin.name} className="w-full h-12 object-contain" />
                          <div className="text-xs font-rajdhani font-bold leading-tight text-center truncate w-full mt-1">
                            {skin.weapon}
                          </div>
                          <div className="text-xs font-rajdhani text-primary font-bold">{formatPrice(skin.price)}</div>
                        </>
                      ) : (
                        <span className="text-2xl text-muted-foreground/30 font-rajdhani">{i + 1}</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Stats */}
              {selected.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Итого вложено: </span>
                    <span className="font-rajdhani font-bold">{formatPrice(totalInputValue)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Средняя цена: </span>
                    <span className="font-rajdhani font-bold">{formatPrice(avgPrice)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Ожидаемый выход: </span>
                    <span className="text-primary font-rajdhani font-bold">~{formatPrice(estimatedOutput)}</span>
                  </div>
                </div>
              )}

              <button
                onClick={executeContract}
                disabled={selected.length < MAX_ITEMS}
                className={`mt-4 w-full py-3 rounded-xl font-orbitron font-bold text-sm transition-all ${
                  selected.length === MAX_ITEMS
                    ? 'bg-primary text-primary-foreground hover:bg-gold-dark'
                    : 'bg-secondary text-muted-foreground cursor-not-allowed border border-border'
                }`}
              >
                {selected.length < MAX_ITEMS
                  ? `ДОБАВЬ ЕЩЁ ${MAX_ITEMS - selected.length} ${MAX_ITEMS - selected.length === 1 ? 'ПРЕДМЕТ' : 'ПРЕДМЕТА'}`
                  : 'ВЫПОЛНИТЬ КОНТРАКТ'
                }
              </button>
            </div>

            {/* How it works */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-rajdhani font-bold mb-4">Как работают контракты</h3>
              <div className="space-y-3">
                {[
                  { n: '1', text: 'Выбери 10 предметов одного качества из инвентаря или базы', color: 'text-cyan' },
                  { n: '2', text: 'Все 10 предметов будут уничтожены и обменяны', color: 'text-primary' },
                  { n: '3', text: 'Ты получишь один случайный предмет следующего качества', color: 'text-green-win' },
                ].map(step => (
                  <div key={step.n} className="flex gap-3 items-start">
                    <div className={`w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-rajdhani font-bold shrink-0 ${step.color}`}>
                      {step.n}
                    </div>
                    <div className="text-sm text-muted-foreground leading-relaxed">{step.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Available skins */}
          <div className="bg-card border border-border rounded-xl p-4 flex flex-col" style={{ maxHeight: 700 }}>
            <h3 className="font-rajdhani font-bold mb-3">
              Доступные предметы
              <span className="text-xs text-muted-foreground ml-2 font-rubik font-normal">
                {availableForContract.length} предметов
              </span>
            </h3>
            <div className="flex-1 overflow-y-auto space-y-1">
              {availableForContract.slice(0, 80).map(skin => (
                <button
                  key={skin.id}
                  onClick={() => addSkin(skin)}
                  disabled={selected.length >= MAX_ITEMS}
                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-all text-left group disabled:opacity-40"
                >
                  <img src={skin.image} alt={skin.name} className="w-12 h-9 object-contain shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-rajdhani font-bold truncate">{skin.weapon} | {skin.name}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      <span style={{ color: RARITY_COLORS[skin.rarity] }}>{RARITY_NAMES[skin.rarity]}</span>
                      {' · '}{skin.wear}
                    </div>
                  </div>
                  <div className="text-xs text-primary font-rajdhani font-bold shrink-0">{formatPrice(skin.price)}</div>
                  <Icon name="Plus" size={14} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Result modal */}
      {showResult && result && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-2xl p-8 max-w-sm w-full text-center animate-winner">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="font-rajdhani font-black text-2xl mb-2">Контракт выполнен!</h3>
            <p className="text-muted-foreground text-sm mb-6">Ты получил новый предмет:</p>

            <div
              className="rounded-xl border-2 p-4 mb-6 card-shine"
              style={{ borderColor: RARITY_COLORS[result.rarity], backgroundColor: `${RARITY_COLORS[result.rarity]}15` }}
            >
              <img src={result.image} alt={result.name} className="w-36 h-28 object-contain mx-auto mb-3" />
              <div className="text-xs font-semibold mb-1" style={{ color: RARITY_COLORS[result.rarity] }}>
                {RARITY_NAMES[result.rarity]}
              </div>
              <div className="font-rajdhani font-bold text-lg">{result.weapon}</div>
              <div className="text-sm text-muted-foreground">{result.name}</div>
              <div className="text-primary font-bold font-rajdhani text-xl mt-2">{formatPrice(result.price)}</div>
            </div>

            <button
              onClick={() => setShowResult(false)}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-orbitron font-bold hover:bg-gold-dark transition-colors"
            >
              ОТЛИЧНО!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
