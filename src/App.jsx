import React, { useState } from 'react'
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import {
  ArrowRight, Award, BadgeCheck, BriefcaseBusiness, Building2, CalendarDays,
  CarFront, Check, ChevronDown, ChevronRight, CircleCheck, CircleDollarSign,
  CircleParking, Clock3, FilePenLine, FileText, Gavel, Handshake, Info,
  Landmark, LockKeyhole, Mail, MapPin, Menu, MessagesSquare, Phone, Scale,
  Send, ShieldCheck, Star, Target, TrainFront, UsersRound, X, Zap,
} from 'lucide-react'

const portrait = '/assets/olena-kravets.png'

const navLinks = [
  ['Послуги', '/services'],
  ['Про нас', '/about'],
  ['Переваги', '/advantages'],
  ['Відгуки', '/reviews'],
  ['Контакти', '/contacts'],
]

const stats = [
  { icon: ShieldCheck, value: '12+', label: 'років досвіду' },
  { icon: Scale, value: '450+', label: 'успішних справ' },
  { icon: LockKeyhole, value: 'Конфіденційно', label: 'гарантуємо захист інформації' },
]

const contact = {
  phone: '+380 (44) 390 12 34',
  phoneHref: 'tel:+380443901234',
  email: 'info@kyivlegalgroup.ua',
  address: 'вул. Велика Васильківська, 72, м. Київ, 03150, Україна',
  telegram: '@kyivlegalgroup',
}

const serviceCards = [
  {
    slug: 'consultation',
    icon: MessagesSquare,
    title: 'Юридична консультація',
    text: 'Надаємо чіткі та зрозумілі відповіді на правові питання та допомагаємо знайти оптимальне рішення.',
    bullets: ['Усна та письмова консультація', 'Правовий аналіз ситуації', 'Роз’яснення законодавства', 'Оцінка ризиків та перспектив'],
  },
  {
    slug: 'contracts',
    icon: FilePenLine,
    title: 'Складання договорів',
    text: 'Розробляємо договори, що враховують ваші інтереси та мінімізують юридичні ризики.',
    bullets: ['Договори для бізнесу та ФОП', 'Аналіз та перевірка договорів', 'Узгодження умов з партнерами', 'Типові та індивідуальні договори'],
  },
  {
    slug: 'business-support',
    icon: BriefcaseBusiness,
    title: 'Супровід бізнесу',
    text: 'Комплексний юридичний супровід діяльності компаній — від реєстрації до розвитку.',
    bullets: ['Корпоративне право', 'Договірна та претензійна робота', 'Трудові відносини', 'Податкове консультування'],
  },
  {
    slug: 'litigation',
    icon: Landmark,
    title: 'Представництво в суді',
    text: 'Ефективний захист ваших інтересів у судах усіх інстанцій.',
    bullets: ['Підготовка процесуальних документів', 'Представництво в суді', 'Господарські спори', 'Цивільні й адміністративні справи'],
  },
]

const faqs = [
  ['Як відбувається первинна консультація?', 'Ви залишаєте заявку, а ми уточнюємо деталі та погоджуємо зручний час. На консультації аналізуємо ситуацію і пропонуємо наступні кроки.'],
  ['Скільки триває підготовка договору?', 'Строк залежить від складності документа та кількості погоджень. Типовий договір готуємо протягом 2–5 робочих днів.'],
  ['Чи працюєте ви з фізичними особами?', 'Так. Ми консультуємо як бізнес, так і приватних клієнтів у цивільних, сімейних, спадкових та інших питаннях.'],
  ['Як розраховується вартість послуг?', 'Вартість визначається після первинного аналізу завдання, обсягу робіт і строків. Ви заздалегідь отримуєте прозорі умови.'],
  ['Чи гарантуєте ви конфіденційність?', 'Так, конфіденційність усієї інформації та документів є базовим принципом нашої роботи.'],
]

const serviceDetails = {
  consultation: {
    ctaHeading: 'Потрібна юридична консультація?',
    lead: 'Розбираємо вашу ситуацію простою мовою та даємо зрозумілий план дій — без зайвої теорії й невизначеності.',
    outcomes: ['Аналіз документів і фактів', 'Відповіді на ключові правові питання', 'Оцінка ризиків та перспектив', 'Чіткі рекомендації наступних кроків'],
    stages: ['Знайомимося із запитом', 'Вивчаємо обставини й документи', 'Проводимо консультацію', 'Формуємо план дій'],
    note: 'Консультація доступна в офісі, телефоном або онлайн.',
  },
  contracts: {
    ctaHeading: 'Потрібне складання договорів?',
    lead: 'Готуємо договори, які захищають ваші інтереси, зменшують ризики та залишають умови співпраці зрозумілими для всіх сторін.',
    outcomes: ['Індивідуальна структура документа', 'Перевірка істотних умов і ризиків', 'Узгодження правок із контрагентом', 'Практичні пояснення кожного пункту'],
    stages: ['Збираємо вихідні дані', 'Готуємо або перевіряємо договір', 'Узгоджуємо коментарі сторін', 'Передаємо фінальну редакцію'],
    note: 'Працюємо з разовими договорами та комплексними пакетами документів.',
  },
  'business-support': {
    ctaHeading: 'Потрібен супровід бізнесу?',
    lead: 'Беремо на себе юридичні завдання бізнесу, щоб команда могла зосередитися на розвитку, а не на ризиках і документах.',
    outcomes: ['Постійна юридична підтримка', 'Договори, претензії та корпоративні питання', 'Супровід кадрових і податкових процесів', 'Попередження ризиків до їх появи'],
    stages: ['Визначаємо потреби бізнесу', 'Узгоджуємо формат супроводу', 'Підключаємося до процесів', 'Регулярно звітуємо про результат'],
    note: 'Формат і кількість годин підбираємо під розмір та задачі вашої компанії.',
  },
  litigation: {
    ctaHeading: 'Потрібне представництво в суді?',
    lead: 'Захищаємо ваші інтереси в суді системно: від оцінки перспектив справи до виконання рішення.',
    outcomes: ['Правова позиція та стратегія спору', 'Підготовка процесуальних документів', 'Представництво на всіх етапах', 'Контроль виконання судового рішення'],
    stages: ['Аналізуємо матеріали справи', 'Будуємо правову позицію', 'Представляємо ваші інтереси', 'Супроводжуємо до результату'],
    note: 'Попередньо чесно оцінюємо перспективи та можливі витрати у справі.',
  },
}

function Brand({ light = false }) {
  return <Link className={`brand ${light ? 'brand--light' : ''}`} to="/" aria-label="Kyiv Legal Group — головна">
    <span className="brand__mark"><Scale size={30} strokeWidth={1.25} /><b>KG</b></span>
    <span className="brand__text"><strong>KYIV LEGAL</strong><small>GROUP</small></span>
  </Link>
}

function Header() {
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const closeNavigation = () => { setOpen(false); setServicesOpen(false) }
  return <header className="site-header">
    <div className="shell header__inner">
      <Brand />
      <nav className={`nav ${open ? 'nav--open' : ''}`} aria-label="Основна навігація">
        {navLinks.map(([label, href]) => label === 'Послуги' ? <div className={`nav__item nav__item--services ${servicesOpen ? 'nav__item--open' : ''}`} key={href} onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)} onFocusCapture={() => setServicesOpen(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setServicesOpen(false) }}>
          <NavLink to={href} onClick={closeNavigation} aria-haspopup="menu" aria-expanded={servicesOpen} className={({ isActive }) => `nav__link ${isActive ? 'active' : ''}`}>Послуги <ChevronDown /></NavLink>
          <div className="services-menu" aria-label="Послуги Kyiv Legal Group" aria-hidden={!servicesOpen}>{serviceCards.map((service) => { const Icon = service.icon; return <Link to={`/services/${service.slug}`} key={service.slug} onClick={closeNavigation} tabIndex={servicesOpen ? 0 : -1}><Icon /><span><b>{service.title}</b><small>{service.text}</small></span><ArrowRight /></Link> })}</div>
        </div> : <NavLink key={href} to={href} onClick={closeNavigation} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>)}
        <Link className="nav__mobile-cta" to="/contacts#form" onClick={closeNavigation}>Отримати консультацію</Link>
      </nav>
      <Link className="btn btn--outline header__cta" to="/contacts#form">Отримати консультацію</Link>
      <button className="menu-toggle" aria-label={open ? 'Закрити меню' : 'Відкрити меню'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
  </header>
}

function Footer() {
  return <footer className="footer">
    <div className="shell footer__grid">
      <div className="footer__identity"><Brand light /><p>Надійний правовий супровід для вашого бізнесу та особистих справ у Києві та по всій Україні.</p><div className="socials"><span>f</span><span>in</span><span>◎</span><span>◉</span></div></div>
      <FooterList title="Швидкі посилання" links={navLinks} />
      <FooterList title="Послуги" links={serviceCards.map((item) => [item.title, `/services/${item.slug}`])} />
      <div className="footer__contacts"><h3>Контакти</h3><a href={contact.phoneHref}><Phone />{contact.phone}</a><a href={`mailto:${contact.email}`}><Mail />{contact.email}</a><span><MapPin />{contact.address}</span><a href="https://t.me/kyivlegalgroup"><Send />Telegram: {contact.telegram}</a></div>
    </div>
    <div className="shell footer__bottom"><span>© 2024 Kyiv Legal Group. Усі права захищені.</span><span><Link to="/privacy">Політика конфіденційності</Link><i /> <Link to="/offer">Публічна оферта</Link></span></div>
  </footer>
}

function FooterList({ title, links }) {
  return <div className="footer__list"><h3>{title}</h3>{links.map(([label, href]) => <Link key={label} to={href}>{label}</Link>)}</div>
}

function Layout({ children }) {
  return <><Header /><main>{children}</main><Footer /></>
}

function Stats() {
  return <div className="stats">{stats.map(({ icon: Icon, value, label }) => <div className="stat" key={value}><Icon /><div><b>{value}</b><small>{label}</small></div></div>)}</div>
}

function Hero({ title, eyebrow, intro, action = true, actionHref = '/contacts#form', actionExternal = false, secondAction, compact = false }) {
  return <section className={`hero ${compact ? 'hero--compact' : ''}`}>
    <div className="shell hero__inner">
      <div className="hero__copy">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
        {action && <div className="hero__actions">{actionExternal ? <a className="btn" href={actionHref}>{action === true ? 'Записатися на консультацію' : action}</a> : <Link className="btn" to={actionHref}>{action === true ? 'Записатися на консультацію' : action}</Link>}{secondAction && (secondAction.external ? <a className="btn btn--ghost" href={secondAction.href}>{secondAction.label}</a> : <Link className="btn btn--ghost" to={secondAction.href}>{secondAction.label}</Link>)}</div>}
        <Stats />
      </div>
      <div className="hero__art" aria-hidden="true"><img src={portrait} alt="" /></div>
    </div>
  </section>
}

function SectionHeading({ children, id }) {
  return <div className="section-heading" id={id}><h2>{children}</h2><span /></div>
}

function FeatureCard({ icon: Icon, title, text }) {
  return <article className="feature-card"><Icon /><div><h3>{title}</h3><p>{text}</p></div></article>
}

function ServiceCard({ item, detailed = false }) {
  const Icon = item.icon
  return <article className={`service-card ${detailed ? 'service-card--detailed' : ''}`}>
    <Icon className="service-card__icon" />
    <h3>{item.title}</h3>
    <span className="card-rule" />
    <p>{item.text}</p>
    {detailed && <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
    {detailed ? <Link className="btn btn--outline btn--full" to={`/services/${item.slug}`}>Детальніше про послугу</Link> : <Link className="service-card__link" to={`/services/${item.slug}`}>Детальніше <ArrowRight /></Link>}
  </article>
}

function FounderBanner({ long = false }) {
  return <section className={`founder ${long ? 'founder--long' : ''}`}>
    <div className="founder__photo"><img src={portrait} alt="Олена Кравець, керуюча партнерка" /></div>
    <div className="founder__copy"><span className="eyebrow">{long ? 'Керуючий партнер' : 'Про нас'}</span><h2>Олена Кравець</h2><b>Керуюча партнерка</b><p>Маю понад 12 років практичного досвіду у сфері права. Спеціалізуюся на цивільних, господарських та податкових спорах, а також комплексному супроводі бізнесу.</p><p>{long && 'Олена особисто залучена до стратегічних проєктів фірми, приділяючи увагу деталям та інтересам кожного клієнта.'}</p><div className="founder__badges"><span><BadgeCheck />Адвокатське свідоцтво</span><span><Award />Медіація</span><span><UsersRound />Для бізнесу та фізичних осіб</span></div></div>
  </section>
}

function FaqAccordion({ items = faqs }) {
  const [open, setOpen] = useState(0)
  return <div className="faq-list">{items.map(([question, answer], index) => <article className="faq-item" key={question}><button onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}><span>{question}</span><ChevronDown /></button>{open === index && <div className="faq-item__answer"><p>{answer}</p></div>}</article>)}</div>
}

function Testimonial({ name, role, text, tiny = false }) {
  return <article className={`testimonial ${tiny ? 'testimonial--tiny' : ''}`}><QuoteMark /><p>{text}</p><div className="testimonial__bottom"><div className="avatar">{name.split(' ').map((part) => part[0]).join('')}</div><div><b>{name}</b><small>{role}</small></div><span className="stars">★★★★★</span></div></article>
}

function QuoteMark() { return <span className="quote-mark">“</span> }

function ConsultationForm({ defaultTopic = '' }) {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const submit = (event) => {
    event.preventDefault()
    const values = Object.fromEntries(new FormData(event.currentTarget))
    if (!Object.values(values).every(Boolean)) { setError('Будь ласка, заповніть усі обов’язкові поля.'); return }
    if (!/^\S+@\S+\.\S+$/.test(values.email)) { setError('Введіть коректну email-адресу.'); return }
    if ((values.phone.match(/\d/g) || []).length < 10) { setError('Введіть коректний номер телефону.'); return }
    setError(''); setSent(true); event.currentTarget.reset()
  }
  if (sent) return <div className="form-success"><CircleCheck /><h3>Дякуємо за звернення</h3><p>Ми зв’яжемося з вами найближчим часом.</p><button className="text-button" onClick={() => setSent(false)}>Надіслати ще одну заявку</button></div>
  return <form className="consultation-form" onSubmit={submit} noValidate>
    <div className="form-grid"><label>Ваше ім’я*<input required name="name" placeholder="Наприклад: Олена" /></label><label>Телефон*<input required name="phone" type="tel" placeholder="+380 (__) ___ __ __" /></label></div>
    <label>Email*<input required name="email" type="email" placeholder="your@email.com" /></label>
    <label>Тема звернення*<select required name="topic" defaultValue={defaultTopic}><option value="" disabled>Оберіть тему</option>{serviceCards.map((service) => <option key={service.slug} value={service.title}>{service.title}</option>)}</select></label>
    <label>Коротко опишіть вашу ситуацію*<textarea required name="message" placeholder="Опишіть суть питання" rows={4} /></label>
    <label className="consent"><input required name="consent" type="checkbox" /><span>Я погоджуюсь на обробку персональних даних</span></label>
    {error && <p className="form-error" role="alert">{error}</p>}<button className="btn btn--full" type="submit">Надіслати заявку</button><small className="form-note"><LockKeyhole /> Ваші дані в безпеці та не передаються третім особам</small>
  </form>
}

function CtaBand({ title = 'Потрібна правова підтримка?' }) {
  return <div className="cta-form">
    <div className="cta-form__intro">
      <span className="eyebrow">Зв’яжіться з нами</span>
      <h2>{title}</h2>
      <p>Опишіть вашу ситуацію — юрист відповість у робочий час і запропонує наступні кроки.</p>
      <div className="cta-form__contacts">
        <a href={contact.phoneHref}><Phone />{contact.phone}</a>
        <a href={`mailto:${contact.email}`}><Mail />{contact.email}</a>
      </div>
    </div>
    <div className="form-card cta-form__card">
      <SectionHeading>Отримайте консультацію</SectionHeading>
      <ConsultationForm />
    </div>
  </div>
}

function HomePage() {
  return <Layout>
    <Hero title={<>Юридичні послуги<br />для бізнесу та приватних<br />клієнтів у Києві</>} intro="Консультації, договори, представництво в судах та комплексний супровід бізнесу. Захищаємо ваші інтереси та допомагаємо досягати результатів." secondAction={{ label: 'Наші послуги', href: '/services' }} />
    <section className="section shell"><SectionHeading>Наші послуги</SectionHeading><div className="grid grid--4">{serviceCards.map((item) => <ServiceCard item={item} key={item.title} />)}</div></section>
    <section className="section shell"><FounderBanner /></section>
    <section className="section shell"><SectionHeading>Чому клієнти обирають нас</SectionHeading><div className="grid grid--4"><FeatureCard icon={CircleDollarSign} title="Прозоре ціноутворення" text="Чіткі умови та фіксована вартість без прихованих платежів." /><FeatureCard icon={Zap} title="Швидка реакція" text="Оперативно відповідаємо на запити та беремося до справ у найкоротші терміни." /><FeatureCard icon={Target} title="Персональна стратегія" text="Розробляємо індивідуальний план дій, орієнтований на результат." /><FeatureCard icon={LockKeyhole} title="Повна конфіденційність" text="Гарантуємо захист ваших даних та ділової інформації." /></div></section>
    <section className="section shell"><SectionHeading>Як ми працюємо</SectionHeading><div className="process"><ProcessStep n="1" title="Заявка" text="Залишаєте заявку або дзвоните нам для первинної консультації." /><ProcessStep n="2" title="Аналіз ситуації" text="Вивчаємо ваш запит, аналізуємо документи та обставини справи." /><ProcessStep n="3" title="Стратегія" text="Пропонуємо оптимальне рішення та узгоджуємо план дій." /><ProcessStep n="4" title="Супровід до результату" text="Реалізуємо стратегію та супроводжуємо вас до досягнення результату." /></div></section>
    <section className="section shell"><SectionHeading>Відгуки клієнтів</SectionHeading><div className="grid grid--3"><Testimonial name="Андрій Мельник" role="Директор, ТОВ «Будівництво»" text="Дякую команді Kyiv Legal Group за професіоналізм та уважність. Допомогли вирішити складний комерційний спір у найкоротші терміни." tiny /><Testimonial name="Ірина Довженко" role="CEO, IT-компанія «SoftLine»" text="Олена та її команда супроводжують нашу компанію вже понад рік. Завжди на зв’язку та пропонують дієві рішення." tiny /><Testimonial name="Максим Гончар" role="Підприємець" text="Професійна підтримка у судовій справі — від початку до завершення. Рекомендую як надійного партнера." tiny /></div></section>
    <section className="section section--consult" id="consultation"><div className="shell consultation-layout"><ContactPanel /><div className="form-card"><SectionHeading>Отримайте консультацію</SectionHeading><ConsultationForm /></div><aside className="schedule-card"><CalendarDays /><h3>Зручний час для розмови?</h3><p>Ми передзвонимо вам у найближчий робочий час.</p><Link className="btn btn--outline" to="/contacts#form">Замовити дзвінок</Link></aside></div></section>
  </Layout>
}

function ProcessStep({ n, title, text }) { return <article className="process-step"><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></article> }

function ContactPanel() { return <aside className="contact-panel"><a href={contact.phoneHref}><Phone />{contact.phone}</a><a href={`mailto:${contact.email}`}><Mail />{contact.email}</a><span><MapPin />{contact.address}</span><span><Clock3 />Пн–Пт: 9:00 – 18:00</span><a href="https://t.me/kyivlegalgroup"><Send />Telegram: {contact.telegram}</a></aside> }

function ServicesPage() {
  const prices = [{ icon: MessagesSquare, title: 'Разова консультація', price: 'від 1 500 ₴', text: 'Оптимальне рішення для отримання професійної відповіді на конкретне питання.', bullets: ['Консультація до 60 хвилин', 'Письмове резюме (за потреби)', 'Рекомендації та план дій'] }, { icon: BriefcaseBusiness, title: 'Пакет для бізнесу', price: 'від 15 000 ₴ / міс.', text: 'Комплексний супровід вашого бізнесу на вигідних умовах.', bullets: ['Необмежені консультації', 'Підготовка документів', 'Супровід договорів та угод', 'Претензійно-позовна робота'], popular: true }, { icon: Landmark, title: 'Судовий супровід', price: 'від 10 000 ₴', text: 'Професійне представництво в суді та захист ваших прав.', bullets: ['Аналіз справи', 'Підготовка документів', 'Представництво в суді', 'Супровід до отримання рішення'] }]
  return <Layout><Hero title="Юридичні послуги" eyebrow="Головна  ›  Послуги" intro="Професійна правова підтримка для бізнесу та приватних клієнтів. Комплексні рішення, що захищають ваші інтереси та забезпечують впевненість у кожному кроці." action={false} compact />
    <section className="section shell"><SectionHeading>Наші послуги</SectionHeading><div className="grid grid--4">{serviceCards.map((item) => <ServiceCard detailed item={item} key={item.title} />)}</div></section>
    <section className="section shell"><SectionHeading>Формати співпраці та вартість</SectionHeading><div className="grid grid--3 pricing">{prices.map((item) => <article className="price-card" key={item.title}>{item.popular && <span className="popular">Найпопулярніше</span>}<item.icon /><h3>{item.title}</h3><b>{item.price}</b><p>{item.text}</p><ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul><Link className="btn btn--outline btn--full" to="/contacts#form">{item.title === 'Разова консультація' ? 'Замовити консультацію' : 'Обговорити умови'}</Link></article>)}</div><p className="price-note"><Info /> Вартість залежить від складності справи та обсягу робіт. Точну ціну визначаємо після первинної консультації.</p></section>
    <section className="section shell"><SectionHeading>Поширені запитання</SectionHeading><FaqAccordion /></section><section className="shell section"><CtaBand /></section>
  </Layout>
}

function ServiceDetailPage() {
  const { slug } = useParams()
  const service = serviceCards.find((item) => item.slug === slug)
  const detail = service && serviceDetails[slug]
  if (!service || !detail) return <NotFound />
  const Icon = service.icon
  return <Layout>
    <Hero title={service.title} eyebrow="Послуги Kyiv Legal Group" intro={detail.lead} action="Обговорити вашу ситуацію" compact />
    <section className="section shell service-detail-overview">
      <div className="service-detail-overview__intro"><Icon /><div><span className="eyebrow">Що входить у послугу</span><h2>Практичне рішення для вашої ситуації</h2><p>{service.text}</p><p>{detail.note}</p></div></div>
      <div className="grid grid--2">{detail.outcomes.map((outcome, index) => <FeatureCard key={outcome} icon={[BadgeCheck, ShieldCheck, Target, CircleCheck][index]} title={outcome} text={index === 0 ? 'Працюємо з фактами, документами та цілями саме вашої справи.' : index === 1 ? 'Пояснюємо юридичну частину зрозуміло й без складних формулювань.' : index === 2 ? 'Будуємо рішення так, щоб зменшити ризики для вас або бізнесу.' : 'Залишаємо чіткий результат, з яким можна рухатися далі.'} />)}</div>
    </section>
    <section className="section shell"><SectionHeading>Як відбувається робота</SectionHeading><div className="service-detail-process">{detail.stages.map((stage, index) => <article key={stage}><span>{index + 1}</span><h3>{stage}</h3><p>{index === 0 ? 'Уточнюємо деталі, строк і бажаний результат.' : index === 1 ? 'Підбираємо правові інструменти та перевіряємо ризики.' : index === 2 ? 'Погоджуємо кроки та тримаємо вас у курсі процесу.' : 'Передаємо результат і лишаємося на зв’язку.'}</p></article>)}</div></section>
    <section className="section shell service-detail-cta"><div><h2>{detail.ctaHeading}</h2><p>Залиште заявку — юрист зв’яжеться з вами у робочий час та уточнить деталі.</p><div className="service-detail-cta__contacts"><a href={contact.phoneHref}><Phone />{contact.phone}</a><a href={`mailto:${contact.email}`}><Mail />{contact.email}</a></div></div><div className="form-card" id="form"><SectionHeading>Отримайте консультацію</SectionHeading><ConsultationForm defaultTopic={service.title} /></div></section>
    <section className="section shell"><SectionHeading>Інші послуги</SectionHeading><div className="grid grid--3">{serviceCards.filter((item) => item.slug !== slug).map((item) => <ServiceCard key={item.slug} item={item} />)}</div></section>
  </Layout>
}

function AboutPage() {
  const values = [[Scale, 'Чесність', 'Ми діємо відкрито та прозоро у кожній співпраці.'], [Award, 'Відповідальність', 'Беремо відповідальність за результат і доводимо справи до кінця.'], [ShieldCheck, 'Довіра', 'Будуємо довгострокові відносини на основі довіри та поваги.'], [Handshake, 'Партнерство', 'Працюємо як єдина команда з клієнтом заради спільної мети.']]
  const team = [['Андрій Мельник', 'Партнер, керівник практики корпоративного права'], ['Ірина Довженко', 'Партнер, керівник практики судових спорів'], ['Максим Гончар', 'Партнер, керівник практики податкового права']]
  return <Layout><Hero title="Про Kyiv Legal Group" eyebrow="ПРАВО. ДОВІРА. РЕЗУЛЬТАТ." intro="Ми — колективна фірма, яка поєднує глибоку експертизу, стратегічне мислення та індивідуальний підхід для вирішення найскладніших правових питань." action={false} compact />
    <section className="section shell split-mission"><div><h2>Наша філософія<br />та місія</h2><p>Kyiv Legal Group створена з вірою в силу права та відповідальність перед кожним клієнтом.</p><p>Наша місія — надавати правові рішення, які захищають інтереси клієнтів сьогодні та створюють основу для їхнього майбутнього.</p><p>Ми прагнемо бути не просто юридичним радником, а надійним партнером, який розуміє вашу справу та діє в інтересах вашого бізнесу.</p><Link className="btn btn--outline" to="/services">Дізнатися більше про наші послуги</Link></div><div className="grid grid--2">{[[UsersRound, 'Клієнтоорієнтованість', 'Розуміємо ваші цілі та пропонуємо рішення, що працюють для вас.'], [BadgeCheck, 'Професіоналізм', 'Глибокі знання права та постійне підвищення експертизи команди.'], [LockKeyhole, 'Конфіденційність', 'Гарантуємо повний захист інформації та приватності клієнта.'], [Target, 'Результативність', 'Фокус на досягненні конкретного, вимірюваного результату.']].map(([icon, title, text]) => <FeatureCard key={title} icon={icon} title={title} text={text} />)}</div></section>
    <section className="section shell"><FounderBanner long /></section>
    <section className="section shell"><SectionHeading>Наші цінності</SectionHeading><div className="grid grid--4">{values.map(([icon, title, text]) => <FeatureCard key={title} icon={icon} title={title} text={text} />)}</div></section>
    <section className="section shell"><SectionHeading>Наш шлях</SectionHeading><div className="timeline">{[['2012', 'Заснування Kyiv Legal Group. Початок роботи з корпоративними клієнтами та приватними особами.'], ['2016', 'Розширення практик та команди. Визнання на ринку та зростання кількості успішних проєктів.'], ['2020', 'Запуск нових напрямів: податкове консультування та міжнародне право.'], ['2024', 'Вихід на новий рівень сервісу. Посилення експертизи та партнерської мережі.']].map(([year, text]) => <article key={year}><b>{year}</b><span /><p>{text}</p></article>)}</div></section>
    <section className="section shell"><SectionHeading>Наша команда</SectionHeading><div className="grid grid--3">{team.map(([name, role], index) => <article className="team-card" key={name}><img src={portrait} alt="" style={{ objectPosition: `${50 + index * 8}% 32%` }} /><div><h3>{name}</h3><p>{role}</p><small>{index === 0 ? '15+ років досвіду у супроводі бізнесу, M&A та корпоративних структурах.' : index === 1 ? 'Спеціаліст із вирішення складних господарських та комерційних спорів у судах.' : 'Експерт у податковому плануванні, супроводі перевірок та оскарженні податкових рішень.'}</small></div></article>)}</div></section>
    <section className="section shell"><SectionHeading>Наші компетенції</SectionHeading><div className="competencies"><span><Scale />Асоціація правників України</span><span><ShieldCheck />The Law Society of Ukraine</span><span><Building2 />EUCON LEGAL GROUP</span><span><BadgeCheck />ISO 9001:2015</span><span><Star />Визнання клієнтів 4.9/5</span></div></section><section className="shell section"><CtaBand title="Готові працювати з командою, що захищає ваш успіх?" /></section>
  </Layout>
}

function AdvantagesPage() {
  const features = [[UsersRound, 'Глибока експертиза', 'Понад 12 років практики та сотні успішних справ у ключових галузях права.'], [FilePenLine, 'Прозоре ціноутворення', 'Чіткі умови співпраці та відсутність прихованих платежів.'], [ShieldCheck, 'Конфіденційність', 'Гарантуємо повний захист вашої інформації та адвокатську таємницю.'], [Zap, 'Швидка реакція', 'Оперативно відповідаємо на запити та беремося за справу без зволікань.'], [Target, 'Індивідуальна стратегія', 'Розробляємо рішення, що враховують ваші цілі, ризики та особливості бізнесу.'], [BriefcaseBusiness, 'Бізнес-орієнтований підхід', 'Думаємо як партнер вашого бізнесу та фокусуємося на результаті.']]
  const cases = [['Корпоративне право', 'Супровід угоди M&A', 'Повний юридичний супровід придбання бізнесу в сфері логістики.', 'Успішне закриття угоди та інтересів клієнта.'], ['Податкове право', 'Податковий спір', 'Скасований податкове повідомлення-рішення на суму 8,6 млн грн.', 'Економія коштів та збереження репутації компанії.'], ['Господарські спори', 'Стягнення заборгованості', 'Стягнуто заборгованість за договором поставки у розмірі 4,2 млн грн.', 'Повне відшкодування боргу та судових витрат.']]
  return <Layout><Hero title="Наші переваги" intro="Поєднуємо глибоку експертизу, персональний підхід і сучасні рішення, щоб забезпечити ваш успіх." action={false} compact />
    <section className="section shell"><SectionHeading>Що нас відрізняє</SectionHeading><div className="grid grid--3">{features.map(([icon, title, text]) => <FeatureCard key={title} icon={icon} title={title} text={text} />)}</div></section>
    <section className="section shell"><SectionHeading>Чому ми vs типові юридичні послуги</SectionHeading><div className="comparison"><div><h3>Kyiv Legal Group</h3>{['Персональний підхід до кожного клієнта', 'Прозора комунікація та зрозумілі кроки', 'Орієнтація на результат і захист інтересів', 'Проактивні рішення та мінімізація ризиків', 'Постійна підтримка на кожному етапі'].map((item) => <p key={item}><CircleCheck />{item}</p>)}</div><div><h3>Типові юридичні послуги</h3>{['Шаблонний підхід без урахування деталей', 'Непрозорі умови та додаткові витрати', 'Фокус на процесі, а не на результаті', 'Реакція на проблеми, а не їх запобігання', 'Обмежений супровід та нерегулярна комунікація'].map((item) => <p key={item}><X />{item}</p>)}</div></div></section>
    <section className="section shell"><SectionHeading>Наші результати в цифрах</SectionHeading><div className="results-strip">{[[ShieldCheck, '450+', 'успішних справ'], [UsersRound, '230+', 'клієнтів довіряють нам'], [Clock3, '<24 год', 'середній час відповіді'], [Gavel, '92%', 'виграних справ'], [Star, '4.9/5', 'середній рейтинг клієнтів']].map(([icon, value, label]) => <div key={value}><span>{typeof icon === 'function' && null}</span>{(() => { const Icon = icon; return <Icon /> })()}<b>{value}</b><small>{label}</small></div>)}</div></section>
    <section className="section shell"><SectionHeading>Приклади успішних кейсів</SectionHeading><div className="grid grid--3">{cases.map(([tag, title, text, result]) => <article className="case-card" key={title}><span>{tag}</span><h3>{title}</h3><p>{text}</p><b>Результат:</b><p>{result}</p><Link to="/contacts#form">Детальніше <ArrowRight /></Link></article>)}</div></section>
    <section className="section shell"><div className="wide-quote"><QuoteMark /><div><p>Команда Kyiv Legal Group — це поєднання професіоналізму, швидкості та людяного підходу. Завжди відчуваємо себе в надійних руках.</p><b>Андрій Мельник</b><small>Директор, ТОВ «Логістик Груп»</small></div><span className="stars">★★★★★</span></div></section><section className="section shell"><CtaBand title="Готові працювати з командою, що захищає ваш успіх?" /></section>
  </Layout>
}

function ReviewsPage() {
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const reviews = [['Ірина Левченко', 'Власниця IT-компанії', 'Команда Kyiv Legal Group супроводжувала нас під час виходу на новий ринок. Все чітко, прозоро і вчасно. Результатом задоволена.'], ['Олександр Ткаченко', 'Генеральний директор', 'Дякуємо за успішний супровід договорів та захист інтересів у складних переговорах. Відчувається досвід і стратегічний підхід.'], ['Марія Ковальчук', 'Приватний клієнт', 'Отримала професійну підтримку у сімейному питанні. Дуже делікатно, з розумінням і реальним результатом.'], ['Дмитро Бондар', 'Власник стартапу', 'Юристи, які справді розбираються у бізнесі та думають як надійний партнер. Допомогли уникнути ризиків.'], ['Наталія Гончар', 'Фінансовий директор', 'Професійна команда, яка швидко знаходить рішення навіть у найскладніших ситуаціях. Завжди на зв’язку та в курсі справи.'], ['Віталій Савчук', 'Власник виробництва', 'Супровід перевірки та вирішення спору з контролюючими органами пройшли успішно. Дякую за компетентність.'], ['Олена Романюк', 'Приватний клієнт', 'Допомогли з оформленням нерухомості та захистом моїх прав. Усе зрозуміло, спокійно і без зайвої бюрократії.'], ['Сергій Мельник', 'CEO логістичної компанії', 'Надійний партнер для бізнесу. Супроводжують нас уже не перший рік. Цінуємо за якість, оперативність і результат.']]
  const featured = [
    ['Андрій Нікітюк', 'Власник бізнесу', 'Професіоналізм, глибоке розуміння права та щира турбота про клієнта — саме те, що вирізняє Kyiv Legal Group.', 'Команда не просто вирішує юридичні питання, а стає надійним партнером у найважливіші моменти. Рекомендую всім, хто цінує результат і спокій.'],
    ['Ірина Довженко', 'CEO, IT-компанія «SoftLine»', 'Юристи працюють швидко, дуже уважно до деталей і пропонують варіанти, які дійсно можна застосувати в бізнесі.', 'Наша команда отримує своєчасні відповіді та зрозумілий план дій з кожного питання.'],
    ['Максим Гончар', 'Підприємець', 'Надійні партнери у складній судовій справі — від першої зустрічі до фінального рішення.', 'Ціную чесну оцінку перспектив, оперативність та повний контроль процесу.'],
  ]
  const [name, role, quote, text] = featured[featuredIndex]
  const moveFeatured = (direction) => setFeaturedIndex((current) => (current + direction + featured.length) % featured.length)
  return <Layout><Hero title="Відгуки клієнтів" intro="Реальний досвід співпраці та довіра, що підтверджує наш професіоналізм." action="Отримати консультацію" secondAction={{ label: 'Наші послуги', href: '/services' }} compact />
    <section className="section shell"><div className="review-feature"><button aria-label="Попередній відгук" onClick={() => moveFeatured(-1)}><ChevronRight /></button><div className="review-feature__content" key={name}><QuoteMark /><blockquote>{quote}</blockquote><p>{text}</p><div className="review-feature__person"><div className="avatar">{name.split(' ').map((part) => part[0]).join('')}</div><span><b>{name}</b><small>{role}</small></span><strong className="stars">★★★★★</strong></div></div><aside><small>Середня оцінка<br />наших клієнтів</small><b>4.9</b><span className="stars">★★★★★</span><small>на основі 128 відгуків</small><Link className="btn btn--outline" to="/contacts#form">Залишити відгук</Link></aside><button aria-label="Наступний відгук" onClick={() => moveFeatured(1)}><ChevronRight /></button></div></section>
    <section className="section shell"><SectionHeading>Відгуки наших клієнтів</SectionHeading><div className="grid grid--4 reviews-grid">{reviews.map(([name, role, text]) => <Testimonial key={name} name={name} role={role} text={text} tiny />)}</div></section>
    <section className="section shell"><SectionHeading>Наші результати — ваша впевненість</SectionHeading><div className="results-strip results-strip--four">{[[Landmark, 'Стягнення боргу', '9,200,000 грн', 'Повністю задоволено позовні вимоги'], [BadgeCheck, 'Податковий спір', '3,5 млн грн', 'Економія для клієнта'], [Target, 'Захист бізнесу', 'Успішно', 'Перевірку ДФС без штрафних санкцій'], [Building2, 'Реєстрація компанії', '3 дні', 'Від ідеї до реєстрації під ключ']].map(([icon, title, value, label]) => { const Icon = icon; return <div key={title}><Icon /><small>{title}</small><b>{value}</b><small>{label}</small></div> })}</div></section>
    <section className="section shell"><SectionHeading>Нам довіряють</SectionHeading><div className="trust-row">{[['TechNova', 'IT Solutions'], ['BuildCore', 'Будівельна компанія'], ['AgroVision', 'Агрохолдинг'], ['Fintegra', 'Фінансові рішення'], ['Medicus', 'Медичний центр'], ['LogiTrans', 'Логістична компанія']].map(([name, type]) => <div key={name}><b>{name}</b><small>{type}</small></div>)}</div></section><section className="section shell"><CtaBand /></section>
  </Layout>
}

function ContactsPage() {
  const contactFaq = [['Як швидко ви відповідаєте на запити?', 'Ми відповідаємо на всі запити протягом робочого дня. Якщо питання термінове — телефонуйте, будь ласка.'], ['Чи можлива онлайн-консультація?', 'Так, ми проводимо консультації телефоном, у месенджерах або через відеозв’язок.'], ['Чи працюєте ви у вихідні?', 'За попереднім записом можливі консультації у вихідні та поза звичайним графіком.'], ['Як підготуватися до консультації?', 'Сформулюйте запит і, за можливості, підготуйте документи, що стосуються ситуації.']]
  return <Layout><Hero title="Контакти" intro="Ми завжди на зв’язку, щоб надати вам професійну правову допомогу та відповісти на ваші питання. Зв’яжіться з нами зручним для вас способом або залиште заявку — ми відповімо найближчим часом." action="Зателефонувати" actionHref={contact.phoneHref} actionExternal secondAction={{ label: 'Написати в Telegram', href: 'https://t.me/kyivlegalgroup', external: true }} compact />
    <section className="section shell contact-form-layout"><article className="contacts-card"><SectionHeading>Наші контакти</SectionHeading><ContactDetails /></article><article className="form-card" id="form"><SectionHeading>Напишіть нам</SectionHeading><ConsultationForm /></article></section>
    <section className="section shell"><OfficeMap /></section>
    <section className="section shell contact-lower"><article className="find-card"><h2>Як нас знайти</h2><div><TrainFront /><p><b>Метро</b>м. Олімпійська — 5 хв пішки<br />м. Палац Спорту — 7 хв пішки</p></div><div><CarFront /><p><b>На автомобілі</b>Зручний під’їзд з центру. Парковка у БЦ «Олімпійський» для відвідувачів.</p></div><div><CircleParking /><p><b>Паркування</b>Підземний паркінг БЦ «Олімпійський». В’їзд з вул. Жилянська.</p></div></article><article className="urgent-card"><Phone /><h2>Термінова консультація</h2><p>Потрібна невідкладна правова допомога? Зв’яжіться з нами — ми надамо швидке рішення.</p><a href={contact.phoneHref}>{contact.phone}</a><small>Пн – Пт: 09:00 – 18:00</small><a className="btn btn--outline btn--full" href={contact.phoneHref}>Зателефонувати зараз</a><a className="telegram-link" href="https://t.me/kyivlegalgroup"><Send />Написати в Telegram</a></article><article className="faq-card"><h2>Поширені запитання</h2><FaqAccordion items={contactFaq} /></article></section>
  </Layout>
}

function ContactDetails() { return <div className="contact-details"><div><MapPin /><p><b>Адреса офісу</b>01001, м. Київ, вул. Велика Васильківська, 72, БЦ «Олімпійський», 7 поверх, офіс 708</p></div><div><Phone /><p><b>Телефон</b><a href={contact.phoneHref}>{contact.phone}</a></p></div><div><Mail /><p><b>Email</b><a href={`mailto:${contact.email}`}>{contact.email}</a></p></div><div><Send /><p><b>Telegram</b><a href="https://t.me/kyivlegalgroup">{contact.telegram}</a></p></div><div><Clock3 /><p><b>Графік роботи</b>Пн – Пт: 09:00 – 18:00<br />Сб – Нд: вихідні</p></div></div> }

function OfficeMap() {
  const mapQuery = 'вул. Велика Васильківська, 72, Київ, Україна'
  const encodedQuery = encodeURIComponent(mapQuery)

  return <div className="office-map">
    <iframe
      title="Kyiv Legal Group на карті"
      src={`https://www.google.com/maps?q=${encodedQuery}&output=embed`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
    <a className="office-map__route" href={`https://www.google.com/maps/search/?api=1&query=${encodedQuery}`} target="_blank" rel="noreferrer">
      <MapPin size={17} />
      Побудувати маршрут
      <ArrowRight size={16} />
    </a>
  </div>
}

const legalPrivacy = [
  ['Загальні положення', 'Ця Політика конфіденційності визначає порядок обробки та захисту персональних даних користувачів сайту kyivlegalgroup.ua. Ми поважаємо вашу приватність і забезпечуємо належний рівень захисту даних.'],
  ['Які дані ми збираємо', 'Ми можемо збирати такі категорії персональних даних: ім’я, прізвище, номер телефону, адреса електронної пошти, назва компанії, посада, а також іншу інформацію, яку ви добровільно надаєте через форму зворотного зв’язку, заявки, підписку на розсилку або під час консультацій.'],
  ['Як ми використовуємо інформацію', 'Ваші дані використовуються з таких цілей: надання юридичних послуг; зв’язок з вами щодо ваших запитів; підготовка документів та договорів; інформування про наші послуги та події (за вашою згодою); покращення роботи сайту та якості обслуговування клієнтів.'],
  ['Передача третім особам', 'Ми не продаємо та не передаємо ваші персональні дані третім особам, окрім випадків, коли це необхідно для виконання договору, передбачено законодавством або вимагається уповноваженими органами.'],
  ['Захист даних', 'Ми впроваджуємо технічні та організаційні заходи для захисту ваших персональних даних від несанкціонованого доступу, втрати, зміни, розголошення або знищення. Доступ до даних мають лише уповноважені співробітники.'],
  ['Cookies', 'Сайт використовує файли cookie для забезпечення коректної роботи, аналітики трафіку та покращення користувацького досвіду. Ви можете налаштувати використання cookie у налаштуваннях вашого браузера.'],
  ['Права користувача', 'Відповідно до Закону України «Про захист персональних даних», ви маєте право знати, які ваші персональні дані обробляються; вимагати доступу до своїх даних та їх виправлення; відкликати згоду на обробку даних; вимагати видалення своїх даних за наявності законних підстав.'],
  ['Контакти', 'Якщо у вас виникли запитання щодо цієї Політики або ви бажаєте реалізувати свої права, будь ласка, зв’яжіться з нами за телефонами, електронною поштою або за адресою офісу.'],
]

const legalOffer = [
  ['Терміни та визначення', 'Оферта — цей документ, розміщений на сайті kyivlegalgroup.ua, що є публічною пропозицією Виконавця укласти договір про надання юридичних послуг. Замовник — фізична або юридична особа, яка приймає умови цієї оферти та звертається до Виконавця для отримання юридичних послуг.'],
  ['Предмет оферти', 'Виконавець зобов’язується надати Замовнику юридичні послуги відповідно до обраної послуги та умов цієї оферти, а Замовник зобов’язується оплатити такі послуги. Перелік послуг, їхній зміст та вартість оприлюднені на сайті Виконавця та можуть уточнюватися індивідуально.'],
  ['Порядок надання послуг', 'Замовник залишає заявку на сайті, зв’язується з Виконавцем телефоном, електронною поштою або через інші канали комунікації. Виконавець узгоджує з Замовником обсяг послуг, строки, вартість та інші істотні умови. Послуги надаються після підтвердження умов співпраці та оплати.'],
  ['Вартість і порядок оплати', 'Вартість послуг визначається на сайті або в індивідуальній пропозиції Виконавця. Оплата здійснюється у порядку та строки, погоджені сторонами. Виконавець має право вимагати попередню оплату.'],
  ['Права та обов’язки сторін', 'Виконавець зобов’язується надавати послуги професійно, добросовісно та у встановлені строки. Замовник зобов’язується надавати достовірну інформацію та документи, необхідні для надання послуг, та своєчасно оплачувати послуги.'],
  ['Відповідальність сторін', 'Сторони несуть відповідальність за невиконання або неналежне виконання своїх зобов’язань відповідно до законодавства України та умов договору. Виконавець не несе відповідальності за наслідки, що виникли через надання Замовником недостовірної інформації.'],
  ['Конфіденційність', 'Сторони зобов’язуються не розголошувати конфіденційну інформацію, отриману під час співпраці, крім випадків, передбачених законом.'],
  ['Форс-мажор', 'Сторони звільняються від відповідальності за невиконання зобов’язань у разі дії обставин непереборної сили, що підтверджується відповідними документами.'],
  ['Строк дії оферти', 'Ця оферта набирає чинності з моменту її розміщення на сайті та діє безстроково до моменту відкликання Виконавцем.'],
  ['Реквізити виконавця', 'ТОВ «Kyiv Legal Group». Код ЄДРПОУ: 45678901. Юридична адреса: м. Київ, вул. Велика Васильківська, 72.'],
]

function LegalHero({ title, breadcrumb, date }) { return <section className="legal-hero"><div className="shell"><div><h1>{title}</h1><p className="breadcrumbs">Головна <ChevronRight /> {breadcrumb}</p>{date && <p className="updated"><CalendarDays />Останнє оновлення: 30 квітня 2024 року</p>}</div><div className="legal-hero__art"><img src={portrait} alt="" /></div></div></section> }

function LegalPage({ type }) {
  const isPrivacy = type === 'privacy'; const title = isPrivacy ? 'Політика\nконфіденційності' : 'Публічна оферта'; const sections = isPrivacy ? legalPrivacy : legalOffer
  return <Layout><LegalHero title={title} breadcrumb={isPrivacy ? 'Політика конфіденційності' : 'Публічна оферта'} date={isPrivacy} />
    <section className="legal-content shell"><aside className="legal-sidebar"><h2>Зміст</h2>{sections.map(([heading], index) => <a href={`#legal-${index + 1}`} key={heading}><b>{index + 1}</b>{heading}</a>)}{isPrivacy && <div className="data-card"><ShieldCheck /><h3>Запит на доступ до даних або їх видалення</h3><p>Ви можете будь-коли запросити доступ до своїх персональних даних, їх виправлення або видалення.</p><Link className="btn btn--outline btn--full" to="/contacts#form">Надіслати запит</Link></div>}</aside><article className="legal-article">{!isPrivacy && <p className="legal-intro">Цей документ є офіційною публічною офертою ТОВ «Kyiv Legal Group» на укладення договору про надання юридичних послуг на викладених нижче умовах.</p>}{sections.map(([heading, text], index) => <section id={`legal-${index + 1}`} key={heading}><h2>{index + 1}. {heading}</h2><p>{text}</p>{isPrivacy && index === 6 && <ul><li>знати, які ваші персональні дані обробляються;</li><li>вимагати доступу до своїх даних та їх виправлення;</li><li>відкликати згоду на обробку даних;</li><li>вимагати видалення своїх даних.</li></ul>}</section>)}{!isPrivacy && <div className="legal-requisites"><Building2 /><div><p><b>ТОВ «Kyiv Legal Group»</b><br />Код ЄДРПОУ: 45678901<br />ІПН: 456789012345<br />Юридична адреса: {contact.address}</p></div><div><p><Phone />{contact.phone}<br /><Mail />{contact.email}<br />IBAN: UA12 3456 7890 1234 5678 9012 3456 78</p></div></div>}</article></section>
  </Layout>
}

function NotFound() { return <Layout><section className="not-found shell"><h1>Сторінку не знайдено</h1><p>Можливо, вона була переміщена або посилання застаріло.</p><Link className="btn" to="/">На головну</Link></section></Layout> }

function App() {
  return <Routes><Route path="/" element={<HomePage />} /><Route path="/services" element={<ServicesPage />} /><Route path="/services/:slug" element={<ServiceDetailPage />} /><Route path="/about" element={<AboutPage />} /><Route path="/advantages" element={<AdvantagesPage />} /><Route path="/reviews" element={<ReviewsPage />} /><Route path="/contacts" element={<ContactsPage />} /><Route path="/privacy" element={<LegalPage type="privacy" />} /><Route path="/offer" element={<LegalPage type="offer" />} /><Route path="*" element={<NotFound />} /></Routes>
}

export default App
