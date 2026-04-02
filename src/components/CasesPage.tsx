import { useState, useRef, useEffect } from 'react';
import { ALL_CASES, RARITY_COLORS, RARITY_NAMES, WEAR_NAMES, formatPrice, type Case, type Skin } from '@/data/cases';
import Icon from '@/components/ui/icon';

interface CasesPageProps {
  balance: number;
  onBalanceChange: (delta: number) => void;
  onAddToInventory: (skin: Skin) => void;
}

const CATEGORIES = ['Все', 'Новые', 'Популярные', 'Классика', 'Ретро', 'Легенды', 'Операции'];

function getRandomSkin(skins: Skin[]): Skin {
  const weights: number[] = skins.map(s => {
    switch (s.rarity) {
      case 'contraband': return 0.2;
      case 'ancient': return 0.8;
      case 'legendary': return 2;
      case 'mythical': return 6;
      case 'rare': return 15;
      case 'uncommon': return 35;
      default: return 40;
    }
  });
  const total = weights.reduce((a, b) => a + b, 0);
  let rand = Math.random() * total;
  for (let i = 0; i < skins.length; i++) {
    rand -= weights[i];
    if (rand <= 0) return skins[i];
  }
  return skins[skins.length - 1];
}

function buildStrip(skins: Skin[], winner: Skin): Skin[] {
  const strip: Skin[] = [];
  for (let i = 0; i < 60; i++) {
    strip.push(skins[Math.floor(Math.random() * skins.length)]);
  }
  strip[52] = winner;
  return strip;
}

interface SpinnerProps {
  strip: Skin[];
  spinning: boolean;
  onDone: () => void;
  idx: number;
}

function Spinner({ strip, spinning, onDone, idx }: SpinnerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const ITEM_W = 156;
  const ITEM_GAP = 8;
  const STEP = ITEM_W + ITEM_GAP;
  const CENTER_OFFSET = 52 * STEP - (containerRef.current ? containerRef.current.offsetWidth / 2 : 300) + ITEM_W / 2;

  useEffect(() => {
    if (!spinning || !stripRef.current) return;
    stripRef.current.style.transition = 'none';
    stripRef.current.style.transform = 'translateX(0)';

    const delay = idx * 100;
    const timer = setTimeout(() => {
      if (!stripRef.current || !containerRef.current) return;
      const containerW = containerRef.current.offsetWidth;
      const target = -(52 * STEP - containerW / 2 + ITEM_W / 2);
      stripRef.current.style.transition = `transform ${3.5 + idx * 0.2}s cubic-bezier(0.15, 0, 0.05, 1)`;
      stripRef.current.style.transform = `translateX(${target}px)`;

      const duration = (3.5 + idx * 0.2) * 1000 + delay;
      setTimeout(() => onDone(), duration);
    }, delay + 50);

    return () => clearTimeout(timer);
  }, [spinning]);

  return (
    <div className="relative rounded-lg overflow-hidden border border-border bg-secondary/30" style={{ height: 180 }}>
      {/* Center marker */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-primary z-10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rotate-45 z-10 -mt-1.5 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rotate-45 z-10 -mb-1.5 pointer-events-none" />

      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden"
      >
        <div
          ref={stripRef}
          className="flex gap-2 absolute left-0 top-1/2 -translate-y-1/2 px-4"
          style={{ willChange: 'transform' }}
        >
          {strip.map((skin, i) => (
            <div
              key={i}
              className="shrink-0 rounded border-2 flex flex-col items-center justify-center p-2 overflow-hidden"
              style={{
                width: ITEM_W,
                height: 156,
                borderColor: RARITY_COLORS[skin.rarity],
                backgroundColor: `${RARITY_COLORS[skin.rarity]}15`,
              }}
            >
              <img
                src={skin.image}
                alt={skin.name}
                className="w-24 h-16 object-contain"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="text-center mt-1">
                <div className="text-xs font-rajdhani font-semibold text-foreground/90 truncate max-w-full">{skin.weapon}</div>
                <div className="text-xs text-muted-foreground truncate max-w-full">{skin.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface CaseOpenModalProps {
  caseData: Case;
  count: number;
  onClose: () => void;
  balance: number;
  onBalanceChange: (delta: number) => void;
  onAddToInventory: (skin: Skin) => void;
}

function CaseOpenModal({ caseData, count, onClose, onBalanceChange, onAddToInventory }: CaseOpenModalProps) {
  const totalCost = caseData.price * count;
  const [phase, setPhase] = useState<'spinning' | 'result'>('spinning');
  const [strips, setStrips] = useState<Skin[][]>([]);
  const [winners, setWinners] = useState<Skin[]>([]);
  const [doneCount, setDoneCount] = useState(0);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    onBalanceChange(-totalCost);
    const newWinners = Array.from({ length: count }, () => getRandomSkin(caseData.skins));
    const newStrips = newWinners.map(w => buildStrip(caseData.skins, w));
    setWinners(newWinners);
    setStrips(newStrips);
    setDoneCount(0);
    setTimeout(() => setSpinning(true), 50);
  }, []);

  const handleSpinDone = () => {
    setDoneCount(prev => {
      const next = prev + 1;
      if (next >= count) {
        setTimeout(() => setPhase('result'), 400);
      }
      return next;
    });
  };

  const handleTakeAll = () => {
    winners.forEach(w => onAddToInventory(w));
    onClose();
  };

  const totalWinValue = winners.reduce((s, w) => s + w.price, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-card border border-border rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <img src={caseData.image} alt={caseData.name} className="w-10 h-10 object-contain" />
            <div>
              <h2 className="font-rajdhani font-bold text-lg">{caseData.name}</h2>
              <div className="text-xs text-muted-foreground">{formatPrice(caseData.price)} за кейс</div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded flex items-center justify-center hover:bg-secondary transition-colors">
            <Icon name="X" size={16} className="text-muted-foreground" />
          </button>
        </div>

        {(phase === 'spinning' || phase === 'result') && (
          <div className="p-4 space-y-3">
            {strips.map((strip, i) => (
              <Spinner key={i} strip={strip} spinning={spinning} onDone={handleSpinDone} idx={i} />
            ))}

            {phase === 'result' && (
              <div className="mt-6 animate-fade-in">
                <h3 className="font-rajdhani font-bold text-xl text-center mb-4">
                  {count === 1 ? 'Вы получили!' : `Получено ${count} предмета!`}
                </h3>
                <div className={`grid gap-3 ${count > 1 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-1 max-w-xs mx-auto'}`}>
                  {winners.map((skin, i) => (
                    <div
                      key={i}
                      className="rounded-lg border-2 p-3 flex flex-col items-center gap-2 animate-winner card-shine"
                      style={{
                        borderColor: RARITY_COLORS[skin.rarity],
                        backgroundColor: `${RARITY_COLORS[skin.rarity]}15`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    >
                      <img src={skin.image} alt={skin.name} className="w-28 h-20 object-contain" />
                      <div className="text-center">
                        <div className="text-xs font-semibold" style={{ color: RARITY_COLORS[skin.rarity] }}>
                          {RARITY_NAMES[skin.rarity]}
                        </div>
                        <div className="font-rajdhani font-bold text-sm">{skin.weapon}</div>
                        <div className="text-xs text-muted-foreground">{skin.name}</div>
                        <div className="text-xs text-muted-foreground">{WEAR_NAMES[skin.wear]}</div>
                        <div className="text-primary font-bold text-sm mt-1">{formatPrice(skin.price)}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center items-center">
                  {count > 1 && (
                    <div className="text-sm text-muted-foreground">
                      Итого: <span className="text-foreground font-bold">{formatPrice(totalWinValue)}</span>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <button
                      onClick={handleTakeAll}
                      className="px-6 py-2.5 rounded bg-primary text-primary-foreground font-rajdhani font-bold text-sm hover:bg-gold-dark transition-colors"
                    >
                      В инвентарь
                    </button>
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 rounded border border-border font-rajdhani font-semibold text-sm hover:bg-secondary transition-colors"
                    >
                      Закрыть
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CasesPage({ balance, onBalanceChange, onAddToInventory }: CasesPageProps) {
  const [category, setCategory] = useState('Все');
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [openCount, setOpenCount] = useState(1);
  const [search, setSearch] = useState('');
  const [isOpening, setIsOpening] = useState(false);

  const filtered = ALL_CASES.filter(c => {
    const catMatch = category === 'Все' || c.category === category;
    const searchMatch = !search || c.name.toLowerCase().includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-[1600px] mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-rajdhani font-black text-4xl mb-2">
            КЕЙСЫ <span className="text-primary">CS2</span>
          </h1>
          <p className="text-muted-foreground text-sm">Более 50 кейсов с реальными скинами Steam</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex gap-1 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded text-xs font-rajdhani font-semibold tracking-wide transition-all ${
                  category === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground border border-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2 bg-secondary border border-border rounded px-3 py-1.5">
            <Icon name="Search" size={14} className="text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Поиск кейса..."
              className="bg-transparent text-sm outline-none w-40 placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filtered.map(c => (
            <div
              key={c.id}
              className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 cursor-pointer case-card"
              onClick={() => { setSelectedCase(c); setOpenCount(1); }}
            >
              {c.isNew && (
                <div className="absolute top-2 left-2 z-10 bg-cyan text-black text-xs font-rajdhani font-bold px-2 py-0.5 rounded">
                  NEW
                </div>
              )}
              {c.isHot && (
                <div className="absolute top-2 right-2 z-10 bg-red-lose text-white text-xs font-rajdhani font-bold px-2 py-0.5 rounded">
                  🔥 ХИТ
                </div>
              )}

              <div className="p-4 flex items-center justify-center bg-gradient-to-b from-secondary/30 to-transparent" style={{ height: 140 }}>
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-28 h-28 object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapon_cases/crate_csgo_medium.png';
                  }}
                />
              </div>

              <div className="p-3 border-t border-border">
                <div className="font-rajdhani font-bold text-sm leading-tight mb-1 text-foreground truncate">{c.name}</div>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold text-sm font-rajdhani">{formatPrice(c.price)}</span>
                  <div className="flex gap-1">
                    {c.skins.slice(0, 3).map((s, i) => (
                      <div
                        key={i}
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: RARITY_COLORS[s.rarity] }}
                        title={RARITY_NAMES[s.rarity]}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case selector modal */}
      {selectedCase && !isOpening && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-xl w-full max-w-sm animate-scale-in">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-rajdhani font-bold text-lg">{selectedCase.name}</h3>
              <button onClick={() => setSelectedCase(null)} className="w-7 h-7 rounded flex items-center justify-center hover:bg-secondary">
                <Icon name="X" size={14} className="text-muted-foreground" />
              </button>
            </div>

            <div className="p-6 flex flex-col items-center gap-4">
              <img src={selectedCase.image} alt={selectedCase.name} className="w-36 h-36 object-contain" />

              <div className="w-full">
                <div className="text-xs text-muted-foreground mb-2 font-rajdhani">Количество кейсов</div>
                <div className="flex gap-2">
                  {[1, 2, 3, 5].map(n => (
                    <button
                      key={n}
                      onClick={() => setOpenCount(n)}
                      className={`flex-1 py-2 rounded text-sm font-rajdhani font-bold transition-all ${
                        openCount === n
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary border border-border text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                Итого: <span className="text-primary font-bold font-rajdhani">{formatPrice(selectedCase.price * openCount)}</span>
                {balance < selectedCase.price * openCount && (
                  <span className="text-destructive ml-2 text-xs">(не хватает средств)</span>
                )}
              </div>

              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setSelectedCase(null)}
                  className="flex-1 py-2.5 rounded border border-border text-sm font-rajdhani font-semibold hover:bg-secondary transition-colors"
                >
                  Отмена
                </button>
                <button
                  onClick={() => setIsOpening(true)}
                  disabled={balance < selectedCase.price * openCount}
                  className="flex-1 py-2.5 rounded bg-primary text-primary-foreground text-sm font-rajdhani font-bold hover:bg-gold-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Открыть
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedCase && isOpening && (
        <CaseOpenModal
          key={`${selectedCase.id}-${openCount}`}
          caseData={selectedCase}
          count={openCount}
          onClose={() => { setSelectedCase(null); setIsOpening(false); }}
          balance={balance}
          onBalanceChange={onBalanceChange}
          onAddToInventory={onAddToInventory}
        />
      )}
    </div>
  );
}