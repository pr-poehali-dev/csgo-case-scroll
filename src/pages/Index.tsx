import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HomePage from '@/components/HomePage';
import CasesPage from '@/components/CasesPage';
import UpgradePage from '@/components/UpgradePage';
import ContractsPage from '@/components/ContractsPage';
import InventoryPage from '@/components/InventoryPage';
import HistoryPage from '@/components/HistoryPage';
import BalanceModal from '@/components/BalanceModal';
import { type Skin } from '@/data/cases';

export default function Index() {
  const [page, setPage] = useState('home');
  const [balance, setBalance] = useState(500);
  const [inventory, setInventory] = useState<Skin[]>([]);
  const [showBalance, setShowBalance] = useState(false);

  const handleBalanceChange = (delta: number) => {
    setBalance(prev => Math.max(0, prev + delta));
  };

  const handleDeposit = (amount: number) => {
    setBalance(prev => prev + amount);
  };

  const handleAddToInventory = (skin: Skin) => {
    setInventory(prev => [...prev, { ...skin, id: `${skin.id}_${Date.now()}` }]);
  };

  const handleSell = (skin: Skin) => {
    setInventory(prev => prev.filter(s => s.id !== skin.id));
    setBalance(prev => prev + skin.price);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar
        activePage={page}
        onNavigate={setPage}
        balance={balance}
        onOpenBalance={() => setShowBalance(true)}
      />

      {page === 'home' && (
        <HomePage
          onNavigate={setPage}
          balance={balance}
          onOpenBalance={() => setShowBalance(true)}
        />
      )}

      {page === 'cases' && (
        <CasesPage
          balance={balance}
          onBalanceChange={handleBalanceChange}
          onAddToInventory={handleAddToInventory}
        />
      )}

      {page === 'upgrade' && (
        <UpgradePage
          inventory={inventory}
          onInventoryChange={setInventory}
        />
      )}

      {page === 'contracts' && (
        <ContractsPage
          inventory={inventory}
          onInventoryChange={setInventory}
        />
      )}

      {page === 'inventory' && (
        <InventoryPage
          inventory={inventory}
          onSell={handleSell}
        />
      )}

      {page === 'history' && <HistoryPage />}

      {page === 'profile' && (
        <div className="pt-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-secondary border-2 border-primary flex items-center justify-center mx-auto mb-4">
              <span className="font-orbitron font-black text-2xl text-primary">YY</span>
            </div>
            <h2 className="font-rajdhani font-black text-3xl mb-2">Игрок #42069</h2>
            <div className="text-muted-foreground mb-6">
              Баланс: <span className="text-primary font-rajdhani font-bold">{balance.toLocaleString('ru-RU')} ₽</span>
            </div>
            <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
              {[
                { label: 'Кейсов', value: '12' },
                { label: 'Предметов', value: String(inventory.length) },
                { label: 'Апгрейдов', value: '8' },
              ].map((s, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-3 text-center">
                  <div className="font-orbitron font-bold text-xl text-primary">{s.value}</div>
                  <div className="text-xs text-muted-foreground font-rajdhani mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showBalance && (
        <BalanceModal
          balance={balance}
          onClose={() => setShowBalance(false)}
          onDeposit={handleDeposit}
        />
      )}
    </div>
  );
}
