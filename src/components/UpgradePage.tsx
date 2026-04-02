import { useState, useRef, useEffect } from 'react';
import { getAllSkins, RARITY_COLORS, RARITY_NAMES, WEAR_NAMES, formatPrice, type Skin } from '@/data/cases';
import Icon from '@/components/ui/icon';

interface UpgradePageProps {
  inventory: Skin[];
  onInventoryChange: (inv: Skin[]) => void;
}

const ALL_SKINS = getAllSkins();

// Целевая цена скина рассчитывается из ставки и % шанса:
// targetPrice = sourcePrice / (winChance / 100)
// Например: 1000₽ ставка при 50% шансе → цель ~2000₽
// При 25% → ~4000₽, при 10% → ~10000₽
function calcTargetPrice(sourcePrice: number, winChance: number): number {
  const raw = sourcePrice / (winChance / 100);
  return Math.round(raw);
}

function findClosestSkin(targetPrice: number, excludeId?: string): Skin | null {
  const candidates = ALL_SKINS.filter(s => s.id !== excludeId && s.price >= targetPrice * 0.5 && s.price <= targetPrice * 2.5);
  if (!candidates.length) {
    const sorted = ALL_SKINS.filter(s => s.id !== excludeId).sort((a, b) =>
      Math.abs(a.price - targetPrice) - Math.abs(b.price - targetPrice)
    );
    return sorted[0] || null;
  }
  return candidates.reduce((best, s) =>
    Math.abs(s.price - targetPrice) < Math.abs(best.price - targetPrice) ? s : best
  );
}

interface WheelProps {
  winChance: number;
  spinning: boolean;
  fastSpin: boolean;
  won: boolean | null;
  onDone: () => void;
}

function UpgradeWheel({ winChance, spinning, fastSpin, won, onDone }: WheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef(0);
  const animFrameRef = useRef<number>(0);
  const [displayAngle, setDisplayAngle] = useState(0);

  const WIN_DEG = winChance * 3.6;
  const LOSE_DEG = 360 - WIN_DEG;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r = cx - 6;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const winRad = (WIN_DEG * Math.PI) / 180;
    const startAngle = (displayAngle * Math.PI) / 180 - Math.PI / 2;

    // Win sector (green)
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, startAngle, startAngle + winRad);
    ctx.closePath();
    const gW = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    gW.addColorStop(0, '#4ade80');
    gW.addColorStop(1, '#16a34a');
    ctx.fillStyle = gW;
    ctx.fill();

    // Lose sector (red)
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, startAngle + winRad, startAngle + Math.PI * 2);
    ctx.closePath();
    const gL = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    gL.addColorStop(0, '#f87171');
    gL.addColorStop(1, '#b91c1c');
    ctx.fillStyle = gL;
    ctx.fill();

    // Border lines
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Dividers
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    const wx = cx + r * Math.cos(startAngle);
    const wy = cy + r * Math.sin(startAngle);
    ctx.lineTo(wx, wy);
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    const lx = cx + r * Math.cos(startAngle + winRad);
    const ly = cy + r * Math.sin(startAngle + winRad);
    ctx.lineTo(lx, ly);
    ctx.stroke();

    // Center circle
    ctx.beginPath();
    ctx.arc(cx, cy, 22, 0, Math.PI * 2);
    ctx.fillStyle = '#0d1117';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Arrow (pointer at top)
    ctx.beginPath();
    ctx.moveTo(cx, cy - 24);
    ctx.lineTo(cx - 7, cy - 14);
    ctx.lineTo(cx + 7, cy - 14);
    ctx.closePath();
    ctx.fillStyle = '#f5c518';
    ctx.fill();
  }, [displayAngle, WIN_DEG]);

  useEffect(() => {
    if (!spinning || won === null) return;
    cancelAnimationFrame(animFrameRef.current);

    const startAngle = rotationRef.current;
    const rotations = fastSpin ? 2 + Math.random() : 5 + Math.random() * 3;
    const totalDeg = rotations * 360;

    const wonTarget = won
      ? Math.random() * (WIN_DEG * 0.8) + WIN_DEG * 0.1
      : WIN_DEG + Math.random() * (LOSE_DEG * 0.8) + LOSE_DEG * 0.1;

    const targetAngle = startAngle + totalDeg + wonTarget;
    const duration = fastSpin ? 1200 : 4000;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const ease = fastSpin
        ? t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
        : 1 - Math.pow(1 - t, 4);
      const current = startAngle + (targetAngle - startAngle) * ease;
      rotationRef.current = current;
      setDisplayAngle(current % 360);

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        rotationRef.current = targetAngle % 360;
        setDisplayAngle(targetAngle % 360);
        onDone();
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [spinning]);

  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute inset-0 rounded-full opacity-20 blur-xl"
        style={{ background: 'radial-gradient(circle, #f5c518, transparent 70%)' }} />
      <canvas ref={canvasRef} width={220} height={220} className="rounded-full relative z-10" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <div className="text-center mt-5">
          <div className="font-orbitron font-bold text-2xl text-white drop-shadow-lg">{winChance}%</div>
          <div className="text-xs text-muted-foreground">шанс</div>
        </div>
      </div>
    </div>
  );
}

function SkinCard({ label, skin, onSelect, targetPrice }: {
  label: string;
  skin: Skin | null;
  onSelect: (s: Skin) => void;
  targetPrice?: number;
  isAuto?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = ALL_SKINS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.weapon.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 40);

  const displaySkin = skin;
  const displayPrice = targetPrice !== undefined && targetPrice > 0
    ? targetPrice
    : skin?.price ?? 0;

  return (
    <div className="flex-1 min-w-0">
      <div className="text-xs text-muted-foreground font-rajdhani mb-2 tracking-wider uppercase">{label}</div>
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-xl border-2 p-4 flex flex-col items-center gap-3 transition-all hover:border-primary/50 min-h-[220px] justify-center"
        style={displaySkin
          ? { borderColor: RARITY_COLORS[displaySkin.rarity], backgroundColor: `${RARITY_COLORS[displaySkin.rarity]}10` }
          : { borderStyle: 'dashed', borderColor: 'hsl(var(--border))', backgroundColor: 'hsl(var(--secondary)/30%)' }
        }
      >
        {displaySkin ? (
          <>
            <img
              src={displaySkin.image}
              alt={displaySkin.name}
              className="w-32 h-22 object-contain"
              style={{ height: 88 }}
              onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3'; }}
            />
            <div className="text-center">
              <div className="text-xs font-semibold mb-0.5" style={{ color: RARITY_COLORS[displaySkin.rarity] }}>
                {RARITY_NAMES[displaySkin.rarity]}
              </div>
              <div className="font-rajdhani font-bold text-sm">{displaySkin.weapon}</div>
              <div className="text-xs text-muted-foreground">{displaySkin.name}</div>
              <div className="text-xs text-muted-foreground">{WEAR_NAMES[displaySkin.wear]}</div>
              <div className="text-primary font-bold font-rajdhani text-lg mt-1">
                {formatPrice(displayPrice)}
              </div>
              {targetPrice !== undefined && targetPrice !== displaySkin.price && (
                <div className="text-xs text-muted-foreground mt-0.5">
                  ≈ {formatPrice(displaySkin.price)} на рынке
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
              <Icon name="Plus" size={24} className="text-muted-foreground" />
            </div>
            <div className="text-sm text-muted-foreground font-rajdhani">Выбрать предмет</div>
          </>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-xl w-full max-w-lg max-h-[80vh] flex flex-col animate-scale-in">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-rajdhani font-bold text-lg">{label}</h3>
              <button onClick={() => setOpen(false)} className="w-7 h-7 rounded flex items-center justify-center hover:bg-secondary">
                <Icon name="X" size={14} className="text-muted-foreground" />
              </button>
            </div>
            <div className="p-3 border-b border-border">
              <div className="flex items-center gap-2 bg-secondary rounded px-3 py-2">
                <Icon name="Search" size={14} className="text-muted-foreground" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Поиск скина..."
                  className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground"
                  autoFocus
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {filtered.map(s => (
                <button
                  key={s.id}
                  onClick={() => { onSelect(s); setOpen(false); setSearch(''); }}
                  className="rounded-lg border-2 p-2 flex flex-col items-center gap-1 hover:opacity-80 transition-all"
                  style={{ borderColor: RARITY_COLORS[s.rarity], backgroundColor: `${RARITY_COLORS[s.rarity]}10` }}
                >
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-20 h-14 object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3'; }}
                  />
                  <div className="text-xs font-rajdhani font-bold leading-tight text-center">{s.weapon}</div>
                  <div className="text-xs text-muted-foreground leading-tight text-center">{s.name}</div>
                  <div className="text-primary text-xs font-bold font-rajdhani">{formatPrice(s.price)}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function UpgradePage({ inventory, onInventoryChange }: UpgradePageProps) {
  const [sourceSkin, setSourceSkin] = useState<Skin | null>(null);
  const [winChance, setWinChance] = useState(50);
  const [fastSpin, setFastSpin] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<boolean | null>(null);
  const [resultMsg, setResultMsg] = useState<string | null>(null);
  const [wheelWon, setWheelWon] = useState<boolean | null>(null);

  // Цель автоматически рассчитывается из ставки и % шанса
  const targetPrice = sourceSkin ? calcTargetPrice(sourceSkin.price, winChance) : 0;
  const autoTarget = sourceSkin ? findClosestSkin(targetPrice, sourceSkin.id) : null;

  const multiplier = sourceSkin ? (targetPrice / sourceSkin.price).toFixed(2) : '—';

  const handleUpgrade = () => {
    if (!sourceSkin || spinning) return;
    const won = Math.random() * 100 < winChance;
    setWheelWon(won);
    setSpinning(true);
    setResultMsg(null);
    setSpinResult(null);
  };

  const handleWheelDone = () => {
    setSpinning(false);
    if (wheelWon === null) return;
    setSpinResult(wheelWon);

    if (wheelWon && autoTarget) {
      setResultMsg('🏆 Апгрейд успешен!');
      const newInv = inventory.filter(s => s.id !== sourceSkin?.id);
      newInv.push({ ...autoTarget, id: `${autoTarget.id}_${Date.now()}` });
      onInventoryChange(newInv);
      setSourceSkin(null);
    } else {
      setResultMsg('💀 Апгрейд провален');
      if (sourceSkin) {
        const newInv = inventory.filter(s => s.id !== sourceSkin.id);
        onInventoryChange(newInv);
        setSourceSkin(null);
      }
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-rajdhani font-black text-4xl mb-2">
            АПГРЕЙД <span className="text-primary">ОРУЖИЯ</span>
          </h1>
          <p className="text-muted-foreground text-sm">Рискуй — выигрывай больше. Цена цели меняется от шанса</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Source skin */}
            <SkinCard
              label="Ваш предмет"
              skin={sourceSkin}
              onSelect={setSourceSkin}
            />

            {/* Wheel center */}
            <div className="flex flex-col items-center gap-5 shrink-0">
              <UpgradeWheel
                winChance={winChance}
                spinning={spinning}
                fastSpin={fastSpin}
                won={wheelWon}
                onDone={handleWheelDone}
              />

              {/* Chance slider */}
              <div className="w-full max-w-[220px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground font-rajdhani">Шанс победы</span>
                  <span className="text-primary font-rajdhani font-bold text-sm">{winChance}%</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={90}
                  value={winChance}
                  onChange={e => setWinChance(Number(e.target.value))}
                  disabled={spinning}
                  className="w-full accent-yellow-400 cursor-pointer"
                />
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-red-lose font-rajdhani">3% риск</span>
                  <span className="text-green-win font-rajdhani">90% безопасно</span>
                </div>
              </div>

              {/* Fast spin toggle */}
              <button
                onClick={() => setFastSpin(!fastSpin)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-rajdhani font-semibold transition-all ${
                  fastSpin
                    ? 'border-primary bg-primary/20 text-primary'
                    : 'border-border bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name="Zap" size={12} />
                Быстрое вращение
              </button>

              {/* Upgrade button */}
              <button
                onClick={handleUpgrade}
                disabled={!sourceSkin || spinning}
                className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-orbitron font-bold text-sm hover:bg-gold-dark transition-all disabled:opacity-40 disabled:cursor-not-allowed w-full max-w-[220px]"
              >
                {spinning ? (
                  <span className="flex items-center justify-center gap-2">
                    <Icon name="Loader2" size={16} className="animate-spin" />
                    {fastSpin ? 'Быстро...' : 'Крутим...'}
                  </span>
                ) : 'АПГРЕЙД'}
              </button>

              {/* Result */}
              {resultMsg && !spinning && (
                <div className={`text-center font-rajdhani font-bold text-xl animate-winner ${
                  spinResult ? 'text-green-win' : 'text-red-lose'
                }`}>
                  {resultMsg}
                </div>
              )}

              {/* Legend */}
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-green-win" />
                  <span className="text-muted-foreground font-rajdhani">Победа</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-lose" />
                  <span className="text-muted-foreground font-rajdhani">Поражение</span>
                </div>
              </div>
            </div>

            {/* Target skin — авто из расчёта */}
            <div className="flex-1 min-w-0">
              <div className="text-xs text-muted-foreground font-rajdhani mb-2 tracking-wider uppercase">
                Цель апгрейда
                <span className="ml-2 text-primary normal-case font-rubik font-normal text-xs">
                  (авто из шанса)
                </span>
              </div>
              <div
                className="w-full rounded-xl border-2 p-4 flex flex-col items-center gap-3 min-h-[220px] justify-center transition-all"
                style={autoTarget
                  ? { borderColor: RARITY_COLORS[autoTarget.rarity], backgroundColor: `${RARITY_COLORS[autoTarget.rarity]}10` }
                  : { borderStyle: 'dashed', borderColor: 'hsl(var(--border))' }
                }
              >
                {autoTarget && sourceSkin ? (
                  <>
                    <img
                      src={autoTarget.image}
                      alt={autoTarget.name}
                      className="w-32 object-contain"
                      style={{ height: 88 }}
                      onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3'; }}
                    />
                    <div className="text-center">
                      <div className="text-xs font-semibold mb-0.5" style={{ color: RARITY_COLORS[autoTarget.rarity] }}>
                        {RARITY_NAMES[autoTarget.rarity]}
                      </div>
                      <div className="font-rajdhani font-bold text-sm">{autoTarget.weapon}</div>
                      <div className="text-xs text-muted-foreground">{autoTarget.name}</div>
                      <div className="text-xs text-muted-foreground">{WEAR_NAMES[autoTarget.wear]}</div>
                      <div className="text-primary font-bold font-rajdhani text-lg mt-1">
                        {formatPrice(targetPrice)}
                        <span className="text-xs text-muted-foreground font-rubik font-normal ml-1">расч.</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        ≈ {formatPrice(autoTarget.price)} на рынке
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                      <Icon name="Target" size={24} className="text-muted-foreground" />
                    </div>
                    <div className="text-sm text-muted-foreground font-rajdhani text-center">
                      {sourceSkin ? 'Нет подходящего скина' : 'Выберите ставку'}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Stats bar */}
          {sourceSkin && autoTarget && (
            <div className="mt-6 pt-5 border-t border-border grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-xs text-muted-foreground font-rajdhani mb-1">Ставка</div>
                <div className="font-rajdhani font-bold text-foreground">{formatPrice(sourceSkin.price)}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground font-rajdhani mb-1">Расч. приз</div>
                <div className="font-rajdhani font-bold text-primary">{formatPrice(targetPrice)}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground font-rajdhani mb-1">Множитель</div>
                <div className="font-rajdhani font-bold text-green-win">x{multiplier}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground font-rajdhani mb-1">Шанс победы</div>
                <div className="font-orbitron font-bold text-cyan">{winChance}%</div>
              </div>
            </div>
          )}
        </div>

        {/* Inventory quick pick */}
        {inventory.length > 0 && (
          <div className="mt-6">
            <div className="text-sm text-muted-foreground font-rajdhani mb-3 tracking-wide uppercase">
              Быстрый выбор из инвентаря
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {inventory.map(s => (
                <button
                  key={s.id}
                  onClick={() => setSourceSkin(s)}
                  className={`shrink-0 rounded-xl border-2 p-3 flex flex-col items-center gap-1.5 transition-all hover:scale-105 ${
                    sourceSkin?.id === s.id ? 'ring-2 ring-primary' : ''
                  }`}
                  style={{ borderColor: RARITY_COLORS[s.rarity], backgroundColor: `${RARITY_COLORS[s.rarity]}10`, width: 120 }}
                >
                  <img src={s.image} alt={s.name} className="w-16 h-12 object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3'; }} />
                  <div className="text-xs font-rajdhani font-bold truncate w-full text-center">{s.weapon}</div>
                  <div className="text-primary text-xs font-rajdhani font-bold">{formatPrice(s.price)}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          {[
            { icon: 'Calculator', title: 'Математика', text: 'Цена цели = ваша ставка ÷ шанс. При 50% шансе цель стоит вдвое дороже' },
            { icon: 'Zap', title: 'Быстрое вращение', text: 'Включи режим для мгновенного результата без анимации колеса' },
            { icon: 'Target', title: 'Подбор скина', text: 'Система автоматически ищет скин максимально близкий к расчётной цене' },
          ].map((tip, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4 flex gap-3">
              <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center shrink-0">
                <Icon name={tip.icon} size={16} className="text-primary" />
              </div>
              <div>
                <div className="font-rajdhani font-bold text-sm mb-1">{tip.title}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{tip.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
