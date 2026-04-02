import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface BalanceModalProps {
  balance: number;
  onClose: () => void;
  onDeposit: (amount: number) => void;
}

const PRESETS = [100, 300, 500, 1000, 2000, 5000];

const METHODS = [
  {
    id: 'card',
    label: 'Карта РФ',
    icon: 'CreditCard',
    desc: 'Visa, Mastercard, МИР',
    color: '#4b69ff',
    badge: 'Популярно',
  },
  {
    id: 'sbp',
    label: 'СБП',
    icon: 'Smartphone',
    desc: 'Система быстрых платежей',
    color: '#22c55e',
    badge: 'Быстро',
  },
  {
    id: 'btc',
    label: 'Bitcoin',
    icon: 'Bitcoin',
    desc: 'BTC, ETH, USDT, LTC',
    color: '#f5c518',
    badge: 'Анонимно',
  },
  {
    id: 'skins',
    label: 'Скины Steam',
    icon: 'Gamepad2',
    desc: 'Обменяй скины на баланс',
    color: '#8847ff',
    badge: 'P2P',
  },
];

export default function BalanceModal({ balance, onClose, onDeposit }: BalanceModalProps) {
  const [method, setMethod] = useState('card');
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState<'select' | 'pay' | 'success'>('select');

  const numAmount = Number(amount) || 0;

  const handlePay = () => {
    if (numAmount < 50) return;
    setStep('pay');
    setTimeout(() => {
      setStep('success');
      onDeposit(numAmount);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-md animate-scale-in">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="font-rajdhani font-bold text-xl">Пополнение баланса</h2>
            <div className="text-xs text-muted-foreground">
              Текущий баланс: <span className="text-primary font-bold font-rajdhani">{balance.toLocaleString('ru-RU')} ₽</span>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded flex items-center justify-center hover:bg-secondary transition-colors">
            <Icon name="X" size={16} className="text-muted-foreground" />
          </button>
        </div>

        {step === 'select' && (
          <div className="p-5 space-y-5">
            {/* Methods */}
            <div>
              <div className="text-xs text-muted-foreground font-rajdhani tracking-wider uppercase mb-2">Способ оплаты</div>
              <div className="grid grid-cols-2 gap-2">
                {METHODS.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`relative rounded-xl border-2 p-3 text-left transition-all ${
                      method === m.id ? 'border-primary bg-primary/10' : 'border-border hover:border-border/60'
                    }`}
                  >
                    {m.badge && (
                      <div className="absolute top-2 right-2 text-xs px-1.5 py-0.5 rounded font-rajdhani font-bold"
                        style={{ backgroundColor: `${m.color}25`, color: m.color, fontSize: 10 }}
                      >
                        {m.badge}
                      </div>
                    )}
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2"
                      style={{ backgroundColor: `${m.color}20` }}>
                      <Icon name={m.icon} size={18} style={{ color: m.color }} />
                    </div>
                    <div className="font-rajdhani font-bold text-sm">{m.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{m.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Amount */}
            <div>
              <div className="text-xs text-muted-foreground font-rajdhani tracking-wider uppercase mb-2">Сумма пополнения</div>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="0"
                  min={50}
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 pr-10 text-lg font-rajdhani font-bold outline-none focus:border-primary transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-rajdhani">₽</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1.5">Минимум: 50 ₽</div>
            </div>

            {/* Presets */}
            <div className="grid grid-cols-3 gap-2">
              {PRESETS.map(p => (
                <button
                  key={p}
                  onClick={() => setAmount(String(p))}
                  className={`py-2 rounded-lg text-sm font-rajdhani font-bold transition-all border ${
                    Number(amount) === p
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {p.toLocaleString('ru-RU')} ₽
                </button>
              ))}
            </div>

            <button
              onClick={handlePay}
              disabled={numAmount < 50}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-orbitron font-bold text-sm hover:bg-gold-dark transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {numAmount >= 50 ? `ПОПОЛНИТЬ ${numAmount.toLocaleString('ru-RU')} ₽` : 'ВВЕДИТЕ СУММУ'}
            </button>
          </div>
        )}

        {step === 'pay' && (
          <div className="p-10 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
              <Icon name="Loader2" size={32} className="text-primary animate-spin" />
            </div>
            <h3 className="font-rajdhani font-bold text-xl">Обработка платежа...</h3>
            <p className="text-muted-foreground text-sm text-center">Пожалуйста, подтвердите оплату в вашем банке</p>
          </div>
        )}

        {step === 'success' && (
          <div className="p-10 flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-green-win/20 flex items-center justify-center animate-winner">
              <Icon name="CheckCircle" size={36} className="text-green-win" />
            </div>
            <h3 className="font-rajdhani font-bold text-2xl">Баланс пополнен!</h3>
            <p className="text-muted-foreground text-sm">
              На счёт зачислено <span className="text-primary font-bold font-rajdhani">{numAmount.toLocaleString('ru-RU')} ₽</span>
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-orbitron font-bold text-sm hover:bg-gold-dark transition-colors mt-2"
            >
              ОТЛИЧНО!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
