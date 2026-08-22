import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight, Bell, CaretDown, Check, ClipboardText, Cube, DotsThreeVertical,
  Export, HandCoins, House, Package, Plus, Question, ShoppingBagOpen,
  ShoppingCart, Storefront, Truck, UserCircle, UsersThree, Wallet, Warning, X,
} from '@phosphor-icons/react';

const navItems = [
  ['Dashboard', House], ['Leady B2B', UsersThree], ['Zamówienia', ShoppingBagOpen],
  ['Produkty', Cube], ['Magazyn', Storefront], ['Dostawy', Truck],
  ['Finanse', Wallet], ['Audit log', ClipboardText],
];

const initialRows = [
  { id: 1, kind: 'order', priority: 'Wysoki', title: 'Potwierdź zamówienie B2B', company: 'Demo Sklep A', ref: 'DEMO-ORDER-001', note: '19.08.2026', payment: 'Nieopłacone', fulfilment: 'Oczekuje', due: '21.08.2026' },
  { id: 2, kind: 'order', priority: 'Wysoki', title: 'Potwierdź zamówienie B2B', company: 'Demo Café B', ref: 'DEMO-ORDER-002', note: '20.08.2026', payment: 'Nieopłacone', fulfilment: 'Oczekuje', due: '22.08.2026' },
  { id: 3, kind: 'stock', priority: 'Wysoki', title: 'Niski stan: Ethiopia Sidamo', company: 'Pozostało 4,8 kg (min. 10 kg)', ref: 'DEMO-SKU-ETH', note: 'Partia: DEMO-LOT-ES', payment: '—', fulfilment: '—', due: 'Uzupełnij' },
  { id: 4, kind: 'stock', priority: 'Średni', title: 'Niski stan: Brazil Cerrado', company: 'Pozostało 6,2 kg (min. 15 kg)', ref: 'DEMO-SKU-BRA', note: 'Partia: DEMO-LOT-BR', payment: '—', fulfilment: '—', due: 'Uzupełnij' },
  { id: 5, kind: 'order', priority: 'Wysoki', title: 'Zamówienie nieopłacone', company: 'Demo HoReCa C', ref: 'DEMO-ORDER-003', note: '13.08.2026', payment: 'Nieopłacone', fulfilment: 'W realizacji', due: '19.08.2026' },
  { id: 6, kind: 'order', priority: 'Średni', title: 'Zamówienie nieopłacone', company: 'Demo Biuro D', ref: 'DEMO-ORDER-004', note: '16.08.2026', payment: 'Częściowo opłacone', fulfilment: 'Oczekuje', due: '25.08.2026' },
  { id: 7, kind: 'lead', priority: 'Wysoki', title: 'Follow-up po terminie', company: 'Demo Bistro E', ref: 'DEMO-LEAD-001', note: 'Ostatni kontakt 10.08.2026', payment: '—', fulfilment: '—', due: '15.08.2026\n(6 dni po)' },
  { id: 8, kind: 'lead', priority: 'Średni', title: 'Follow-up po terminie', company: 'Demo Kawiarnia F', ref: 'DEMO-LEAD-002', note: 'Ostatni kontakt 12.08.2026', payment: '—', fulfilment: '—', due: '18.08.2026\n(3 dni po)' },
];

const demoSummary = Object.freeze({
  totalActions: 29,
  ordersToConfirm: 7,
  lowStock: 9,
  unpaidOrders: 5,
  unpaidValue: '31 560 zł',
  overdueLeads: 8,
});

const kindMeta = {
  order: { label: 'Zamówienia', icon: ShoppingCart, tone: 'pink' },
  stock: { label: 'Magazyn', icon: Package, tone: 'amber' },
  lead: { label: 'Leady B2B', icon: UserCircle, tone: 'purple' },
};

function Status({ children, tone = 'blue' }) {
  return <span className={`status status--${tone}`}>{children}</span>;
}

function IconButton({ label, children, onClick, className = '', ...buttonProps }) {
  return <button type="button" className={`icon-button ${className}`} aria-label={label} title={label} onClick={onClick} {...buttonProps}>{children}</button>;
}

export function App() {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [filter, setFilter] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [menuRow, setMenuRow] = useState(null);
  const [toast, setToast] = useState('');
  const [rows, setRows] = useState(initialRows);
  const [totalActions, setTotalActions] = useState(demoSummary.totalActions);
  const [form, setForm] = useState({ company: '', amount: '', weight: '5' });
  const modalRef = useRef(null);
  const modalReturnFocusRef = useRef(null);
  const toastTimerRef = useRef(null);
  const visibleRows = useMemo(() => filter === 'all' ? rows : rows.filter((row) => row.kind === filter), [filter, rows]);

  useEffect(() => () => window.clearTimeout(toastTimerRef.current), []);

  useEffect(() => {
    if (!modalOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setModalOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !modalRef.current) return;
      const focusable = [...modalRef.current.querySelectorAll('button:not([disabled]), input:not([disabled])')];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      modalReturnFocusRef.current?.focus?.();
    };
  }, [modalOpen]);

  useEffect(() => {
    const closePopovers = (event) => {
      if (event.key !== 'Escape' || modalOpen) return;
      setFilterOpen(false);
      setMenuRow(null);
    };
    document.addEventListener('keydown', closePopovers);
    return () => document.removeEventListener('keydown', closePopovers);
  }, [modalOpen]);

  function notify(message) {
    window.clearTimeout(toastTimerRef.current);
    setToast(message);
    toastTimerRef.current = window.setTimeout(() => setToast(''), 3200);
  }

  function submitOrder(event) {
    event.preventDefault();
    const nextId = Math.max(...rows.map((row) => row.id)) + 1;
    setRows((current) => [{
      id: nextId, kind: 'order', priority: 'Wysoki', title: 'Potwierdź zamówienie B2B',
      company: form.company, ref: `DEMO-ORDER-${String(nextId).padStart(3, '0')}`,
      note: `${form.weight} kg · ${form.amount} zł`, payment: 'Nieopłacone',
      fulfilment: 'Oczekuje', due: 'Dzisiaj',
    }, ...current]);
    setTotalActions((current) => current + 1);
    setModalOpen(false);
    setForm({ company: '', amount: '', weight: '5' });
    notify('Zamówienie B2B dodane do kolejki');
  }

  return <div className="admin-shell">
    <aside className="sidebar" aria-label="Główna nawigacja">
      <div className="brand-mark"><img src="/assets/homie-logo.svg" alt="Homie" /></div>
      <nav className="nav-list">{navItems.map(([label, Icon]) =>
        <button key={label} type="button" className={`nav-item ${activeNav === label ? 'is-active' : ''}`} onClick={() => { setActiveNav(label); if (label !== 'Dashboard') notify(`${label}: moduł w następnym pionowym przekroju`); }}>
          <Icon size={22} /><span>{label}</span>
        </button>)}</nav>
      <button type="button" className="workspace-switcher" onClick={() => notify('Aktywny workspace: Homie Coffee · właściciel')}>
        <span className="workspace-avatar">HC</span><span><strong>Homie Coffee</strong><small>Właściciel</small></span><CaretDown size={14} />
      </button>
    </aside>

    <main className="workspace">
      <header className="topbar">
        <div><p className="eyebrow">HOMIE COFFEE · ADMIN</p><h1>Centrum operacyjne</h1><p className="date-line">Piątek, 21 sierpnia 2026 <span>•</span> Dzień 233 roku</p></div>
        <div className="top-actions">
          <button type="button" className="primary-button" onClick={(event) => { modalReturnFocusRef.current = event.currentTarget; setModalOpen(true); }}><Plus size={20} weight="bold" />Nowe zamówienie B2B</button>
          <IconButton label="Powiadomienia" className="notification-button" onClick={() => notify('Masz 3 pilne powiadomienia')}><Bell size={23} /><span className="notification-badge">3</span></IconButton>
          <IconButton label="Pomoc" onClick={() => notify('Pomoc: dokumentacja pilota będzie dostępna tutaj')}><Question size={23} /></IconButton>
          <span className="top-divider" />
          <button type="button" className="profile-button" onClick={() => notify('Profil: Anna Brew · owner')}><span className="profile-avatar">AB</span><span>Anna Brew</span><CaretDown size={14} /></button>
        </div>
      </header>

      {activeNav !== 'Dashboard' && <div className="context-banner"><Check size={17} weight="bold" /><span>Podgląd prototypu: „{activeNav}” wybrano, lecz ten vertical slice pokazuje wspólne Centrum operacyjne.</span></div>}

      <section className="metric-strip" aria-label="Kluczowe wskaźniki">
        <article className="metric"><p><span className="dot dot--pink" />Zamówienia do potwierdzenia</p><strong>{demoSummary.ordersToConfirm}</strong><small>jawna metryka demonstracyjna</small></article>
        <article className="metric"><p><span className="dot dot--amber" />Niski stan magazynowy</p><strong>{demoSummary.lowStock}</strong><small>pozycji poniżej minimum · demo</small></article>
        <article className="metric"><p><span className="dot dot--pink" />Zamówienia nieopłacone</p><strong>{demoSummary.unpaidOrders}</strong><small>na kwotę {demoSummary.unpaidValue} · demo</small></article>
        <article className="metric"><p><span className="dot dot--pink" />Leady B2B po terminie</p><strong>{demoSummary.overdueLeads}</strong><small>jawna metryka demonstracyjna</small></article>
        <article className="metric metric--gate"><p>Gotowość do pilota</p><strong>ZABLOKOWANA</strong><small>Brak 3 ofert i opinii księgowego</small><button type="button" onClick={() => notify('D-024: production slice pozostaje zablokowany')}><span>Zobacz blokery</span><ArrowRight size={17} /></button></article>
      </section>

      <div className="dashboard-grid">
        <section className="action-panel">
          <div className="section-heading">
            <div><h2>Kolejka działań <span className="count-badge">{totalActions}</span></h2><p>Jawne agregaty demonstracyjne · brak połączenia z produkcją</p></div>
            <div className="table-actions">
              <div className="filter-wrap"><button type="button" className="secondary-button" aria-expanded={filterOpen} aria-haspopup="true" onClick={() => setFilterOpen(!filterOpen)}>{filter === 'all' ? 'Wszystkie typy' : kindMeta[filter].label}<CaretDown size={14} /></button>
                {filterOpen && <div className="filter-menu">{[['all', 'Wszystkie typy'], ['order', 'Zamówienia'], ['stock', 'Magazyn'], ['lead', 'Leady B2B']].map(([value, label]) => <button key={value} type="button" onClick={() => { setFilter(value); setFilterOpen(false); }}>{filter === value && <Check size={15} weight="bold" />}{label}</button>)}</div>}
              </div>
              <button type="button" className="secondary-button" onClick={() => notify(`Eksport przygotowany: ${visibleRows.length} pozycji (demo)`)}><Export size={17} />Eksportuj</button>
            </div>
          </div>

          <div className="table-wrap"><table><thead><tr><th>Typ</th><th>Priorytet</th><th>Opis</th><th>Powiązanie</th><th>Status płatności</th><th>Realizacja</th><th>Termin</th><th><span className="sr-only">Akcje</span></th></tr></thead><tbody>
            {visibleRows.map((row) => { const meta = kindMeta[row.kind]; const RowIcon = meta.icon; return <tr key={row.id}>
              <td><span className={`type-icon type-icon--${meta.tone}`} title={meta.label}><RowIcon size={21} aria-hidden="true" /><span className="sr-only">{meta.label}</span></span></td>
              <td><span className={`priority priority--${row.priority === 'Wysoki' ? 'high' : 'medium'}`}><span />{row.priority}</span></td>
              <td><strong>{row.title}</strong><small>{row.company}</small></td>
              <td><strong className="ref">{row.ref}</strong><small>{row.note}</small></td>
              <td>{row.payment === 'Nieopłacone' ? <Status tone="pink">{row.payment}</Status> : row.payment === 'Częściowo opłacone' ? <Status tone="amber">{row.payment}</Status> : '—'}</td>
              <td>{row.fulfilment === 'Oczekuje' ? <Status>{row.fulfilment}</Status> : row.fulfilment === 'W realizacji' ? <Status tone="amber">{row.fulfilment}</Status> : '—'}</td>
              <td className="due">{row.due.split('\n').map((line) => <span key={line}>{line}</span>)}</td>
              <td className="row-menu-cell"><IconButton label={`Akcje dla ${row.ref}`} aria-expanded={menuRow === row.id} aria-haspopup="true" onClick={() => setMenuRow(menuRow === row.id ? null : row.id)}><DotsThreeVertical size={20} weight="bold" /></IconButton>{menuRow === row.id && <div className="row-menu"><button type="button" onClick={() => { setMenuRow(null); notify(`${row.ref}: szczegóły otwarte w trybie demo`); }}>Otwórz szczegóły</button><button type="button" onClick={() => { setMenuRow(null); notify(`${row.ref}: przypisano do Anny Brew`); }}>Przypisz do mnie</button></div>}</td>
            </tr>; })}
            {visibleRows.length === 0 && <tr><td colSpan="8" className="empty-state"><Check size={26} /><strong>Brak zadań w tym widoku</strong><span>Zmień filtr, aby zobaczyć pozostałe pozycje.</span></td></tr>}
          </tbody></table></div>
          <button type="button" className="view-all" onClick={() => { setFilter('all'); notify('Pokazano pełną kolejkę demonstracyjną'); }}>Zobacz wszystkie ({totalActions}) <ArrowRight size={18} /></button>
        </section>

        <aside className="right-rail">
          <section className="rail-card urgent-card"><div className="rail-heading"><h3>Pilne wyjątki</h3><span className="count-badge count-badge--pink">3</span></div>
            {[
              ['Zamówienia nieopłacone', String(demoSummary.unpaidOrders), `na łączną kwotę ${demoSummary.unpaidValue}`, 'order'],
              ['Leady B2B po terminie', String(demoSummary.overdueLeads), 'najstarszy 15.08.2026 · demo', 'lead'],
              ['Przeterminowane partie', '2', 'wartość 3 240 zł · demo', 'stock'],
            ].map(([label, value, note, rowFilter]) => <button type="button" className="exception-row" key={label} onClick={() => { setFilter(rowFilter); notify(`Filtr: ${label}`); }}><span><small>{label}</small><strong>{value}</strong><em>{note}</em></span><ArrowRight size={21} /></button>)}
          </section>
          <section className="rail-card compact-card"><div className="rail-heading"><h3>Najsłabiej rotujące zapasy</h3><button type="button" onClick={() => { setFilter('stock'); notify('Pokazano zapasy wymagające uwagi'); }}>Zobacz wszystkie</button></div>
            {[['Colombia Supremo 1 kg', 'DEMO-LOT-CO', '78 dni'], ['Guatemala Huehuetenango 1 kg', 'DEMO-LOT-GU', '64 dni'], ['Kenya AA 1 kg', 'DEMO-LOT-KE', '53 dni']].map(([name, lot, age]) => <div className="inventory-row" key={name}><span><strong>{name}</strong><small>Partia: {lot}</small></span><b>{age}</b></div>)}
          </section>
          <section className="rail-card compact-card"><div className="rail-heading"><h3>Nadchodzące dostawy</h3><button type="button" onClick={() => notify('Widok dostaw jest zaplanowany w następnym vertical slice')}>Zobacz wszystkie</button></div>
            {[['Kawa zielona – Brazylia', 'DEMO-DELIVERY-001', '24.08.2026'], ['Opakowania 1 kg', 'DEMO-DELIVERY-002', '26.08.2026']].map(([name, ref, date]) => <div className="delivery-row" key={ref}><span><strong>{name}</strong><small>{ref}</small></span><Status tone="mint">{date}</Status></div>)}
          </section>
        </aside>
      </div>
    </main>

    {modalOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setModalOpen(false)}><section ref={modalRef} className="modal" role="dialog" aria-modal="true" aria-labelledby="order-title">
      <div className="modal-heading"><span className="modal-icon"><HandCoins size={24} /></span><div><p className="eyebrow">NOWE ZAMÓWIENIE</p><h2 id="order-title">Dodaj zamówienie B2B</h2></div><IconButton label="Zamknij" onClick={() => setModalOpen(false)}><X size={21} /></IconButton></div>
      <form onSubmit={submitOrder}><label>Nazwa firmy<input autoFocus required value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} placeholder="np. Demo Café B" /></label>
        <div className="form-grid"><label>Ilość kawy (kg)<input required min="1" type="number" value={form.weight} onChange={(event) => setForm({ ...form, weight: event.target.value })} /></label><label>Wartość brutto (PLN)<input required min="1" type="number" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} placeholder="1500" /></label></div>
        <div className="form-note"><Warning size={19} /><span>To prototyp. Dane nie są zapisywane w bazie ani wysyłane do Stripe/Fakturowni.</span></div>
        <div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setModalOpen(false)}>Anuluj</button><button type="submit" className="primary-button"><Plus size={18} weight="bold" />Dodaj do kolejki</button></div>
      </form>
    </section></div>}
    {toast && <div className="toast" role="status"><Check size={19} weight="bold" />{toast}</div>}
  </div>;
}
