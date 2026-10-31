import React from 'react';
import { ArrowUpRight, Coffee, Storefront, SlidersHorizontal, ListChecks } from '@phosphor-icons/react';
import './workspace.css';

const surfaces = [
  { href: '/shop.html', icon: Storefront, label: '01 / Клієнт', title: 'Магазин кави', description: 'Каталог, вибір кави, квіз, кошик, заварювання та особистий кабінет.', note: 'Імпортований дизайн · 12 розділів' },
  { href: '/admin-lab.html', icon: SlidersHorizontal, label: '02 / Дослідження', title: 'Admin Lab', description: 'Події, сценарії листів, профіль клієнта та концепція планування обсмажування.', note: 'Імпортований дизайн · 4 розділи' },
  { href: '/?view=operations', icon: ListChecks, label: '03 / Операції', title: 'Операційна панель', description: 'Попередній Dashboard: черга дій, замовлення й винятки, що потребують уваги.', note: 'Погоджений напрям Option 1' },
];

export function Workspace() {
  return <main className="workspace">
    <header className="workspace-top"><a href="/" className="workspace-brand"><Coffee size={26} weight="fill" /> homie coffee<span>робочий простір</span></a><span className="workspace-badge">Локальний прототип</span></header>
    <section className="workspace-intro"><p className="workspace-eyebrow">Від ідеї — до першої повторної покупки</p><h1>Кава. Люди.<br /><span>Зрозуміла система.</span></h1><p>Тут зібрані дизайни й робоча логіка Homie Coffee. Досліджуємо, ухвалюємо рішення та розвиваємо продукт в одному проєкті.</p></section>
    <section className="workspace-surfaces" aria-label="Дизайни та прототипи">{surfaces.map(({ icon: Icon, ...s }) => <a className="workspace-surface" href={s.href} key={s.href}><div className="workspace-surface-top"><Icon size={28} /><ArrowUpRight size={22} /></div><p className="workspace-eyebrow">{s.label}</p><h2>{s.title}</h2><p>{s.description}</p><small>{s.note}</small></a>)}</section>
    <section className="workspace-process" aria-labelledby="process-title"><div><p className="workspace-eyebrow">Бізнес-логіка · робоча гіпотеза</p><h2 id="process-title">Не просто продати пачку.<br />Допомогти знайти свою каву.</h2></div><ol><li><strong>Постачання</strong><span>Партнер обсмажує й пакує під нашим брендом.</span></li><li><strong>Вибір і покупка</strong><span>Смак, спосіб заварювання, вага, помел і прозора доставка.</span></li><li><strong>Виконання</strong><span>Оплата → резерв → пакування → відправлення → документ.</span></li><li><strong>Повторна покупка</strong><span>Рецепт, відгук і зручне повторення замовлення.</span></li></ol></section>
    <aside className="workspace-next"><div><p className="workspace-eyebrow">Наступне рішення</p><h2>Яким буде перший продаж?</h2><p>Потрібні пропозиції щонайменше трьох обсмажувальників, перевірена податкова модель і погоджений мінімальний сценарій. B2B з передоплатою — гіпотеза для перевірки.</p></div><div className="workspace-note"><strong>Усі дані — демонстраційні</strong><p>Дизайни містять ідеї, а не обіцянки покупцеві. Ціни, підписки, власна обсмажувальня та показники ще потребують рішення. Реальні замовлення й оплати тут не приймаються.</p></div></aside>
    <footer className="workspace-footer">Homie Coffee · дизайн і дослідження, 30 жовтня 2026<span>Рішення фіксуємо разом з Ігорем</span></footer>
  </main>;
}
