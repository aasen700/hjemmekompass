import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronRight, ClipboardList, Compass, Heart, Home, Info, Lightbulb, Menu, RotateCcw, ShieldCheck, X } from 'lucide-react'
import { attitudes, deepQuestions, fourChoices, priorities, screeningQuestions, topicCards, visitImportance, type Answers, type AssessmentMode, type Question } from './data/assessment'
import { makeAssessment } from './engine/recommendations'

type Page = 'home' | 'intent' | 'screen' | 'deep' | 'results' | 'library'
const title: Record<Page, string> = { home: 'Hjem', intent: 'Brukerens ønsker', screen: 'Trygghet og fall', deep: 'Fordypning', results: 'Oppsummering', library: 'Tiltaksbibliotek' }

function QuestionCard({ question, value, onChange }: { question: Question; value?: string; onChange: (value: string) => void }) {
  return <fieldset className="question">
    <legend>{question.title}</legend>
    {question.help && <p className="muted small">{question.help}</p>}
    <div className="options">{question.options.map(o => <button key={o.value} type="button" className={'option ' + (value === o.value ? 'selected' : '')} aria-pressed={value === o.value} onClick={() => onChange(o.value)}>{o.label}{value === o.value && <Check size={16}/>}</button>)}</div>
  </fieldset>
}
const services = [
  { title: 'Digital trygghetsalarm', detail: 'Kan gi mulighet til å tilkalle hjelp. Må vurderes ut fra brukerens mestring, dekning og responstjeneste.' },
  { title: 'Fallsensor', detail: 'Kan være aktuell ved særskilte behov. Kan gi falske alarmer eller unnlate å registrere fall.' },
  { title: 'Automatisk nattlys', detail: 'Kan støtte tryggere ferdsel. Må vurderes opp mot bolig, forflytning og brukerens ønsker.' },
  { title: 'Digitalt tilsyn', detail: 'Krever særskilt faglig, juridisk og personvernmessig vurdering; erstatter ikke automatisk fysiske besøk.' },
  { title: 'Fallforebygging og boligtilpasning', detail: 'Ikke-teknologiske tiltak, vurdering av hjelpemidler og eventuell ergo-/fysioterapi.' }
]

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [mode, setMode] = useState<AssessmentMode>('quick')
  const [answers, setAnswers] = useState<Answers>({})
  const [goals, setGoals] = useState<string[]>([])
  const [attitude, setAttitude] = useState('unknown')
  const [visits, setVisits] = useState('unknown')
  const [menuOpen, setMenuOpen] = useState(false)
  const assessment = useMemo(() => makeAssessment(answers, attitude, visits), [answers, attitude, visits])
  const answered = screeningQuestions.filter(q => answers[q.id] && answers[q.id] !== 'unknown').length
  const step = ({ intent: 1, screen: 2, deep: 2, results: 3 } as Partial<Record<Page, number>>)[page] ?? 0
  const navigate = (next: Page) => { setPage(next); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const reset = () => { setAnswers({}); setGoals([]); setAttitude('unknown'); setVisits('unknown'); setMode('quick'); navigate('home') }
  const setAnswer = (id: string, val: string) => setAnswers(p => ({ ...p, [id]: val }))
  const toggleGoal = (value: string) => setGoals(p => p.includes(value) ? p.filter(x => x !== value) : [...p, value])
  const renderQuestions = (qs: Question[]) => <div className="questions">{qs.map(q => <QuestionCard key={q.id} question={q} value={answers[q.id]} onChange={v => setAnswer(q.id, v)}/>)}</div>

  return <div className="app">
    <aside className={'sidebar ' + (menuOpen ? 'is-open' : '')}>
      <button className="brand" onClick={() => navigate('home')}><span className="brand-mark"><Compass size={23}/></span><span>Hjemme<span className="brand-light">Kompass</span><small>Kartlegging med mennesket i sentrum</small></span></button>
      <nav aria-label="Hovedmeny">
        {([['home','Hjem',Home],['intent','Ny kartlegging',ClipboardList],['library','Tiltaksbibliotek',BookOpen],['results','Oppsummering',Lightbulb]] as const).map(([p,t,I]) => <button key={p} className={'nav-link '+(page===p?'active':'')} onClick={()=>navigate(p)}><I size={19}/>{t}</button>)}
      </nav>
      <div className="sidebar-foot"><Heart size={17}/> <span>Teknologi skal støtte mennesker, ikke erstatte faglig skjønn.</span></div>
    </aside>
    {menuOpen && <button className="scrim" onClick={()=>setMenuOpen(false)} aria-label="Lukk meny"/>}
    <main className="main">
      <header className="topbar"><button className="mobile-menu icon-btn" aria-label="Åpne meny" onClick={()=>setMenuOpen(v=>!v)}>{menuOpen?<X/>:<Menu/>}</button><div className="breadcrumb">HjemmeKompass <ChevronRight size={14}/> <strong>{title[page]}</strong></div><span className="top-pill"><ShieldCheck size={15}/> Faglig prototype</span></header>
      <div className="content">
        {page==='home' && <>
          <div className="intro-row"><div><p className="eyebrow">VELKOMMEN TIL HJEMMEKOMPASS</p><h1>En tryggere vei til gode valg.</h1><p className="lead">Et enkelt, personsentrert støtteverktøy for kartlegging av mestring, trygghet og velferdsteknologi i hjemmesykepleien.</p><button className="primary" onClick={()=>navigate('intent')}>Start kartlegging <ArrowRight size={17}/></button></div><div className="hero-art" aria-hidden="true"><div className="sun"/><div className="hill h1"/><div className="hill h2"/><div className="house"><div className="roof"/><div className="door"/></div><div className="path"/></div></div>
          <div className="section-title"><div><p className="eyebrow">SLIK FUNGERER DET</p><h2>Fra behov til muligheter</h2></div></div>
          <div className="how-grid">{[['01','Hva er viktig?','Start med brukerens mål, ressurser og ønsker.'],['02','Kartlegg i eget tempo','Ta en rask gjennomgang eller fordyp deg.'],['03','Få faglig støtte','Se mulige tiltak, forbehold og videre avklaringer.']].map(([n,t,d])=><div className="how-card" key={n}><span className="how-num">{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div>
          <div className="section-title"><div><p className="eyebrow">KARTLEGGINGSOMRÅDER</p><h2>Utforsk temaene</h2></div><span className="small muted">Første modul er klar til utprøving</span></div>
          <div className="topic-grid">{topicCards.map((t,i)=><button key={t.id} className={'topic-card '+(t.active?'topic-active':'topic-disabled')} onClick={()=>t.active && navigate('intent')} disabled={!t.active}><span className="topic-icon">{i===0?<ShieldCheck size={22}/>:i===3?<Heart size={22}/>:<ClipboardList size={22}/>}</span><strong>{t.title}</strong><small>{t.description}</small><span className="topic-bottom">{t.active?'Åpne kartlegging':'Kommer senere'} <ArrowRight size={15}/></span></button>)}</div>
          <div className="notice"><Info size={19}/><p><strong>Viktig om prototypen:</strong> Ikke legg inn reelle helseopplysninger. Innholdet er ikke klinisk validert. Verktøyet gir ikke automatiske vedtak eller vurderinger av forsvarlighet.</p></div>
        </>}
        {(['intent','screen','deep','results'] as Page[]).includes(page) && <div className="progress" aria-label="Fremdrift">{['Brukerens ønsker','Kartlegging','Oppsummering'].map((s,i)=><div key={s} className={'progress-step '+(step>=i+1?'current':'')}><span>{i+1}</span><small>{s}</small></div>)}</div>}
        {page==='intent' && <>
          <p className="eyebrow">STEG 1 AV 3</p><h1>Hva er viktig for brukeren?</h1><p className="lead">Start med brukerens perspektiv. Velg det som er relevant, uten navn eller andre identifiserende opplysninger.</p>
          <section className="panel"><h2>Brukerens mål og ønsker</h2><p className="muted">Hva er viktig i hverdagen? Flere valg er mulig.</p><div className="goal-grid">{priorities.map(g=><button key={g} aria-pressed={goals.includes(g)} className={'goal '+(goals.includes(g)?'selected':'')} onClick={()=>toggleGoal(g)}>{g}{goals.includes(g)&&<Check size={16}/>}</button>)}</div></section>
          <section className="panel"><h2>Hvordan stiller brukeren seg til teknologi?</h2><div className="choice-list">{attitudes.map(a=><button key={a.value} aria-pressed={attitude===a.value} onClick={()=>setAttitude(a.value)} className={'wide-choice '+(attitude===a.value?'selected':'')}><span><strong>{a.label}</strong><small>{a.detail}</small></span>{attitude===a.value&&<Check size={18}/>}</button>)}</div></section>
          <section className="panel"><h2>Hva betyr hjemmebesøk for den sosiale kontakten?</h2><p className="muted small">Dette vurderes ut fra brukerens egen opplevelse, ikke bare antall kontakter i nettverket.</p><div className="choice-list">{visitImportance.map(a=><button key={a.value} aria-pressed={visits===a.value} onClick={()=>setVisits(a.value)} className={'wide-choice '+(visits===a.value?'selected':'')}><span><strong>{a.label}</strong><small>{a.detail}</small></span>{visits===a.value&&<Check size={18}/>}</button>)}</div></section>
          <div className="bottom-actions"><button className="secondary" onClick={()=>navigate('home')}><ArrowLeft size={17}/> Tilbake</button><button className="primary" onClick={()=>navigate('screen')}>Videre til kartlegging <ArrowRight size={17}/></button></div>
        </>}
        {page==='screen' && <>
          <p className="eyebrow">STEG 2 AV 3 · FØRSTE MODUL</p><h1>Trygghet og fall</h1><p className="lead">Utforsk opplevd trygghet, fall og muligheten til å tilkalle hjelp. Du kan fordype deg når det er relevant.</p>
          <div className="mode-switch" aria-label="Kartleggingsmodus"><button className={mode==='quick'?'selected':''} onClick={()=>setMode('quick')}>Hurtigkartlegging</button><button className={mode==='deep'?'selected':''} onClick={()=>setMode('deep')}>Grundig kartlegging</button></div>
          <div className="panel"><div className="panel-head"><div><p className="eyebrow">INNLEDENDE SPØRSMÅL</p><h2>Brukerens trygghet hjemme</h2></div><span className="count">{answered} av 4 avklart</span></div>{renderQuestions(screeningQuestions)}</div>
          <div className="subtle-panel"><div><h3>Vil du undersøke dette nærmere?</h3><p>Fordypning er valgfri og kan åpnes uten å starte kartleggingen på nytt.</p></div><button className="secondary" onClick={()=>navigate('deep')}>Åpne fordypning <ArrowRight size={17}/></button></div>
          <div className="bottom-actions"><button className="secondary" onClick={()=>navigate('intent')}><ArrowLeft size={17}/> Tilbake</button><button className="primary" onClick={()=>navigate(mode==='deep'?'deep':'results')}>{mode==='deep'?'Fortsett til fordypning':'Se oppsummering'} <ArrowRight size={17}/></button></div>
        </>}
        {page==='deep' && <>
          <p className="eyebrow">STEG 2 AV 3 · VALGFRI FORDYPNING</p><h1>Undersøk tryggheten nærmere</h1><p className="lead">Svar bare på det som er relevant. Ubesvarte spørsmål behandles som «ikke avklart».</p>
          <section className="panel"><div className="panel-head"><h2>Fordypning: Trygghet og fall</h2><span className="count">{assessment.deepAnswered} av {assessment.deepTotal} avklart</span></div>{renderQuestions(deepQuestions)}</section>
          <div className="bottom-actions"><button className="secondary" onClick={()=>navigate('screen')}><ArrowLeft size={17}/> Tilbake</button><button className="primary" onClick={()=>navigate('results')}>Se oppsummering <ArrowRight size={17}/></button></div>
        </>}
        {page==='results' && <>
          <p className="eyebrow">STEG 3 AV 3</p><h1>Oppsummering</h1><p className="lead">Et foreløpig grunnlag for videre faglig vurdering – ikke en beslutning om tjenester eller valg av teknologi.</p>
          <div className="results-metrics"><div><span>{assessment.screeningAnswered} / {assessment.screeningTotal}</span><small>Innledende spørsmål avklart</small></div><div><span>{assessment.deepAnswered} / {assessment.deepTotal}</span><small>Fordypningsspørsmål avklart</small></div><div><span>{assessment.suggestions.length}</span><small>Mulige tiltak å vurdere</small></div></div>
          <section className="panel"><h2>Brukerens perspektiv</h2><p className="muted">Viktige mål: {goals.length?goals.join(', '):'Ikke kartlagt'}</p><p className="muted">Teknologi: {attitudes.find(a=>a.value===attitude)?.label}</p><p className="muted">Hjemmebesøk: {visitImportance.find(a=>a.value===visits)?.label}</p></section>
          <section className="panel"><h2>Identifiserte behov</h2>{assessment.needs.length?<ul className="plain-list">{assessment.needs.map(n=><li key={n}><span className="list-dot"/>{n}</li>)}</ul>:<p className="muted">Ingen konkrete utfordringer identifisert gjennom besvarte spørsmål. Dette utelukker ikke behov.</p>}</section>
          <div className="section-title"><h2>Mulige tiltak for videre vurdering</h2></div>
          {assessment.suggestions.length?<div className="results-list">{assessment.suggestions.map(s=><article key={s.id} className="result-card"><div className="result-top"><span className={'tag '+(s.kind==='technology'?'tech':'')}>{s.kind==='technology'?'Velferdsteknologi':'Annet tiltak'}</span></div><h3>{s.title}</h3><p>{s.reason}</p>{s.caution&&<div className="caution"><Info size={17}/>{s.caution}</div>}<details><summary>Hva må vurderes videre?</summary><ul>{s.considerations.map(c=><li key={c}>{c}</li>)}</ul></details></article>)}</div>:<div className="panel"><p className="muted">Ingen tiltak foreslått på foreliggende grunnlag. Vurder behov for ytterligere kartlegging.</p></div>}
          <section className="panel"><h2>Manglende informasjon og videre avklaringer</h2>{assessment.unknowns.length?<ul className="plain-list">{assessment.unknowns.map(n=><li key={n}><span className="list-dot"/>{n}</li>)}</ul>:<p className="muted">Ingen ubesvarte punkter i dette begrensede spørsmålssettet. Faglig vurdering kreves fortsatt.</p>}</section>
          <div className="notice"><Info size={19}/><p>Prototypen er ikke kvalitetssikret for klinisk bruk. Ingen resultater er lagret eller sendt til en server. Bruk bare fiktive opplysninger.</p></div>
          <div className="bottom-actions"><button className="secondary" onClick={()=>navigate('deep')}><ArrowLeft size={17}/> Endre kartlegging</button><button className="secondary" onClick={()=>{if(window.confirm('Slette alle svar og starte på nytt?'))reset()}}><RotateCcw size={17}/> Nullstill</button></div>
        </>}
        {page==='library' && <><p className="eyebrow">TILTAKSBIBLIOTEK</p><h1>Muligheter, ikke fasitsvar</h1><p className="lead">Generelle teknologityper og andre tiltak som kan være aktuelle. Biblioteket er foreløpig og ikke knyttet til bestemte leverandører.</p><div className="results-list">{services.map(s=><article className="result-card" key={s.title}><h3>{s.title}</h3><p>{s.detail}</p><span className="tag">Krever individuell vurdering</span></article>)}</div></>}
        <footer>HjemmeKompass · Faglig prototype v0.1 · Ingen identifiserende opplysninger · Ingen lagring av svar</footer>
      </div>
    </main>
  </div>
}
