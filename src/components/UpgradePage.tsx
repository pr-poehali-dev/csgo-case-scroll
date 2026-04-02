import { useState, useRef, useEffect } from 'react';
import { getAllSkins, RARITY_COLORS, RARITY_NAMES, WEAR_NAMES, formatPrice, type Skin } from '@/data/cases';
import Icon from '@/components/ui/icon';

interface UpgradePageProps {
  inventory: Skin[];
  onInventoryChange: (inv: Skin[]) => void;
}

const ALL_SKINS = getAllSkins();

interface WheelProps {
  winChance: number;
  spinning: boolean;
  won: boolean | null;
  onDone: () => void;
}

function UpgradeWheel({ winChance, spinning, won, onDone }: WheelProps) {
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
    const r = cx - 8;
    const angle = (displayAngle * Math.PI) / 180;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const winRad = (WIN_DEG * Math.PI) / 180;
    const startAngle = angle - Math.PI / 2;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, startAngle, startAngle + winRad);
    ctx.closePath();
    const gradW = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    gradW.addColorStop(0, '#22c55e');
    gradW.addColorStop(1, '#16a34a');
    ctx.fillStyle = gradW;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, startAngle + winRad, startAngle + 2 * Math.PI);
    ctx.closePath();
    const gradL = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    gradL.addColorStop(0, '#ef4444');
    gradL.addColorStop(1, '#dc2626');
    ctx.fillStyle = gradL;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, 24, 0, 2 * Math.PI);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx, cy - 24);
    ctx.lineTo(cx - 6, cy - 14);
    ctx.lineTo(cx + 6, cy - 14);
    ctx.closePath();
    ctx.fillStyle = '#f5c518';
    ctx.fill();
  }, [displayAngle, WIN_DEG]);

  useEffect(() => {
    if (!spinning || won === null) return;

    const startAngle = rotationRef.current;
    const rotations = 5 + Math.random() * 3;
    const totalDeg = rotations * 360;

    const wonTarget = won
      ? Math.random() * (WIN_DEG * 0.8) + WIN_DEG * 0.1
      : WIN_DEG + Math.random() * (LOSE_DEG * 0.8) + LOSE_DEG * 0.1;

    const targetAngle = startAngle + totalDeg + wonTarget;
    const duration = 4000;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - t, 4);
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
      <canvas ref={canvasRef} width={220} height={220} className="rounded-full" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center mt-4">
          <div className="font-orbitron font-bold text-xl text-white">{winChance}%</div>
          <div className="text-xs text-muted-foreground">шанс</div>
        </div>
      </div>
    </div>
  );
}

function SkinSelector({ label, skin, onSelect, skins }: {
  label: string;
  skin: Skin | null;
  onSelect: (s: Skin) => void;
  skins: Skin[];
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = skins.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.weapon.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 30);

  return (
    <div className="flex-1">
      <div className="text-xs text-muted-foreground font-rajdhani mb-2 tracking-wider uppercase">{label}</div>
      <button
        onClick={() => setOpen(true)}
        className={`w-full rounded-xl border-2 p-4 flex flex-col items-center gap-3 transition-all hover:border-primary/50 ${
          skin ? '' : 'border-dashed border-border bg-secondary/30'
        }`}
        style={skin ? { borderColor: RARITY_COLORS[skin.rarity], backgroundColor: `${RARITY_COLORS[skin.rarity]}10` } : {}}
      >
        {skin ? (
          <>
            <img src={skin.image} alt={skin.name} className="w-28 h-20 object-contain" />
            <div className="text-center">
              <div className="text-xs font-semibold" style={{ color: RARITY_COLORS[skin.rarity] }}>
                {RARITY_NAMES[skin.rarity]}
              </div>
              <div className="font-rajdhani font-bold text-sm">{skin.weapon}</div>
              <div className="text-xs text-muted-foreground">{skin.name}</div>
              <div className="text-xs text-muted-foreground">{WEAR_NAMES[skin.wear]}</div>
              <div className="text-primary font-bold font-rajdhani mt-1">{formatPrice(skin.price)}</div>
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
                  onClick={() => { onSelect(s); setOpen(false); }}
                  className="rounded-lg border-2 p-2 flex flex-col items-center gap-1 hover:opacity-80 transition-all text-left"
                  style={{ borderColor: RARITY_COLORS[s.rarity], backgroundColor: `${RARITY_COLORS[s.rarity]}10` }}
                >
                  <img src={s.image} alt={s.name} className="w-20 h-14 object-contain" />
                  <div className="text-xs font-rajdhani font-bold leading-tight">{s.weapon}</div>
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
  const [targetSkin, setTargetSkin] = useState<Skin | null>(null);
  const [winChance, setWinChance] = useState(50);
  const [spinning, setSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<boolean | null>(null);
  const [resultMsg, setResultMsg] = useState<string | null>(null);
  const [wheelWon, setWheelWon] = useState<boolean | null>(null);

  const calcChance = () => {
    if (!sourceSkin || !targetSkin) return 50;
    const ratio = sourceSkin.price / targetSkin.price;
    return Math.min(90, Math.max(3, Math.round(ratio * 80)));
  };

  const autoChance = calcChance();

  const handleUpgrade = () => {
    if (!sourceSkin || !targetSkin || spinning) return;
    const chance = winChance;
    const won = Math.random() * 100 < chance;
    setWheelWon(won);
    setSpinning(true);
    setResultMsg(null);
    setSpinResult(null);
  };

  const handleWheelDone = () => {
    setSpinning(false);
    if (wheelWon === null) return;
    setSpinResult(wheelWon);
    if (wheelWon) {
      setResultMsg('🏆 Апгрейд успешен!');
      if (targetSkin) {
        const newInv = inventory.filter(s => s.id !== sourceSkin?.id);
        newInv.push(targetSkin);
        onInventoryChange(newInv);
        setSourceSkin(null);
      }
    } else {
      setResultMsg('💀 Апгрейд провален');
      const newInv = inventory.filter(s => s.id !== sourceSkin?.id);
      onInventoryChange(newInv);
      setSourceSkin(null);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-rajdhani font-black text-4xl mb-2">
            АПГРЕЙД <span className="text-primary">ОРУЖИЯ</span>
          </h1>
          <p className="text-muted-foreground text-sm">Улучши свой скин — поставь на кон и попытай удачу</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Source skin */}
            <SkinSelector
              label="Ваш предмет"
              skin={sourceSkin}
              onSelect={setSourceSkin}
              skins={inventory.length > 0 ? inventory : ALL_SKINS}
            />

            {/* Wheel center */}
            <div className="flex flex-col items-center gap-6 shrink-0">
              <UpgradeWheel
                winChance={winChance}
                spinning={spinning}
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
                  className="w-full accent-yellow-400"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span className="text-red-lose font-rajdhani">3% риск</span>
                  <span className="text-green-win font-rajdhani">90% безопасно</span>
                </div>
                <button
                  onClick={() => setWinChance(autoChance)}
                  className="w-full mt-2 text-xs text-primary hover:underline font-rajdhani"
                >
                  Авто ({autoChance}%)
                </button>
              </div>

              {/* Upgrade button */}
              <button
                onClick={handleUpgrade}
                disabled={!sourceSkin || !targetSkin || spinning}
                className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-orbitron font-bold text-sm hover:bg-gold-dark transition-all disabled:opacity-40 disabled:cursor-not-allowed w-full max-w-[220px]"
              >
                {spinning ? (
                  <span className="flex items-center justify-center gap-2">
                    <Icon name="Loader2" size={16} className="animate-spin" />
                    Крутим...
                  </span>
                ) : 'АПГРЕЙД'}
              </button>

              {/* Result */}
              {resultMsg && !spinning && (
                <div className={`text-center font-rajdhani font-bold text-lg animate-winner ${
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

            {/* Target skin */}
            <SkinSelector
              label="Цель апгрейда"
              skin={targetSkin}
              onSelect={setTargetSkin}
              skins={ALL_SKINS}
            />
          </div>

          {sourceSkin && targetSkin && (
            <div className="mt-6 pt-6 border-t border-border flex flex-wrap gap-6 justify-center text-sm">
              <div className="flex items-center gap-2">
                <Icon name="ArrowUpRight" size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">Ставка:</span>
                <span className="text-foreground font-bold font-rajdhani">{formatPrice(sourceSkin.price)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Trophy" size={16} className="text-primary" />
                <span className="text-muted-foreground">Приз:</span>
                <span className="text-primary font-bold font-rajdhani">{formatPrice(targetSkin.price)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="TrendingUp" size={16} className="text-green-win" />
                <span className="text-muted-foreground">Мультипликатор:</span>
                <span className="text-green-win font-bold font-rajdhani">
                  x{(targetSkin.price / sourceSkin.price).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Percent" size={16} className="text-cyan" />
                <span className="text-muted-foreground">Рекомендуемый шанс:</span>
                <span className="text-cyan font-bold font-rajdhani">{autoChance}%</span>
              </div>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          {[
            { icon: 'Lightbulb', title: 'Стратегия', text: 'Чем меньше шанс — тем больше потенциальный выигрыш при победе' },
            { icon: 'Shield', title: 'Безопасность', text: 'Рекомендуем не ставить шанс ниже 30% — потери будут слишком велики' },
            { icon: 'Target', title: 'Цель', text: 'Выбирай апгрейд не более чем в 3x от стоимости своего предмета' },
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
