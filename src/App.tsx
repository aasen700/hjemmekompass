import { useMemo, useState } from 'react'
import { Activity, Apple, ArrowLeft, ArrowRight, BookOpen, Brain, Check, ChevronRight, ClipboardList, Compass, Heart, Home, Info, Lightbulb, Menu, Monitor, Pill, RotateCcw, ShieldCheck, Shirt, Users, X } from 'lucide-react'
import { attitudes, priorities, strengths, visitImportance, type Answers, type AssessmentMode, type Question } from './data/assessment'
import { modules, moduleById, suggestedDeepQuestions, type AssessmentModule } from './data/modules'
import { makeAssessment } from './engine/recommendations'
import { getTailoredMatches } from './engine/matching'
import TailoredResults from './components/TailoredResults'
import LibraryExplorer from './components/LibraryExplorer'
import GuidePage from './components/GuidePage'

type Page = 'home' | 'intent' | 'topics' | 'screen' | 'deep' | 'results' | 'library' | 'guide'
const pageTitle: Record<Page, string> = { home: 'Hjem', intent: 'Brukerens ønsker', topics: 'Velg områder', screen: 'Kartlegging', deep: 'Fordypning', results: 'Oppsummering', library: 'Tiltaksbibliotek', guide: 'Om verktøyet' }
const icons = [ShieldCheck, Pill, Shirt, Apple, Brain, Users, Activity, Monitor]
function QuestionCard({ question, value, onChange }: { question: Question; value?: string; onChange: (value: string) => void }) {
  return <fieldset className="question">
    <legend>{question.title}</legend>
    {question.help && <p className="muted small">{question.help}</p>}
    <div className="options">{question.options.map(o=><button key={o.value} type="button" className={'option '+(value===o.value?'selected':'')} aria-pressed={value===o.value} onClick={()=>onChange(o.value)}>{o.label}{value===o.value&&<Check size={16}/>}</button>)}</div>
  </fieldset>
}

export default function App() {
  const [page,setPage]=useState<Page>('home')
  const [answers,setAnswers]=useState<Answers>({})
  const [goals,setGoals]=useState<string[]>([])
  const [userStrengths,setUserStrengths]=useState<string[]>([])
  const [reviewStatuses,setReviewStatuses]=useState<Record<string,string>>({})
  const [attitude,setAttitude]=useState('unknown')
  const [visits,setVisits]=useState('unknown')
  const [selectedTopics,setSelectedTopics]=useState<string[]>([])
  const [topicIndex,setTopicIndex]=useState(0)
  const [mode,setMode]=useState<AssessmentMode>('quick')
  const [deepVisited,setDeepVisited]=useState<string[]>([])
  const [showAllDeep,setShowAllDeep]=useState<string[]>([])
  const [menuOpen,setMenuOpen]=useState(false)
  const [libraryItemId,setLibraryItemId]=useState<string|null>(null)
  const current: AssessmentModule = moduleById[selectedTopics[topicIndex] ?? 'fall']
  const assessment=useMemo(()=>makeAssessment(answers,attitude,visits,selectedTopics,deepVisited),[answers,attitude,visits,selectedTopics,deepVisited])
  const matchedMeasures=useMemo(()=>getTailoredMatches(answers,attitude,selectedTopics,visits),[answers,attitude,selectedTopics,visits])
  const step=({intent:1,topics:2,screen:3,deep:3,results:4} as Partial<Record<Page,number>>)[page]??0
  const hasSession=Object.keys(answers).length>0||goals.length>0||userStrengths.length>0||selectedTopics.length>0||attitude!=='unknown'||visits!=='unknown'
  const navigate=(next:Page)=>{setPage(next);setMenuOpen(false);window.scrollTo({top:0,behavior:'smooth'})}
  const setAnswer=(id:string,value:string)=>setAnswers(prev=>({...prev,[id]:value}))
  const startModule=(id:string)=>{const idx=selectedTopics.indexOf(id);if(idx<0)return;setTopicIndex(idx);navigate('screen')}
  const nextModule=()=>{if(topicIndex+1<selectedTopics.length){setTopicIndex(topicIndex+1);navigate('screen')}else navigate('results')}
  const openDeep=()=>{setDeepVisited(p=>p.includes(current.id)?p:[...p,current.id]);navigate('deep')}
  const reset=()=>{setAnswers({});setGoals([]);setUserStrengths([]);setReviewStatuses({});setAttitude('unknown');setVisits('unknown');setSelectedTopics([]);setTopicIndex(0);setMode('quick');setDeepVisited([]);setShowAllDeep([]);navigate('home')}
  const toggleTopic=(id:string)=>setSelectedTopics(p=>p.includes(id)?p.filter(x=>x!==id):modules.filter(m=>p.includes(m.id)||m.id===id).map(m=>m.id))
  const openLibraryForSolution=(id:string)=>{setLibraryItemId(id);navigate('library')}
  const toggleGoal=(value:string)=>setGoals(p=>p.includes(value)?p.filter(x=>x!==value):[...p,value])
  const toggleStrength=(value:string)=>setUserStrengths(p=>p.includes(value)?p.filter(x=>x!==value):[...p,value])
  const renderQuestions=(items:Question[]) => <div className="questions">{items.map(q=><QuestionCard key={q.id} question={q} value={answers[q.id]} onChange={v=>setAnswer(q.id,v)}/>)}</div>
  const screenAnswered=current.screening.filter(q=>answers[q.id]&&answers[q.id]!=='unknown').length
  const filteredDeep=suggestedDeepQuestions(current,answers,showAllDeep.includes(current.id))
  const showMenu=(target:Page)=>{if(target==='library')setLibraryItemId(null);if(target==='screen'){if(selectedTopics.length)startModule(selectedTopics[0]);else navigate('topics')}else navigate(target)}

  return <div className="app">
    <aside className={'sidebar '+(menuOpen?'is-open':'')}>
      <button className="brand" onClick={()=>navigate('home')}><span className="brand-mark"><Compass size={23}/></span><span>Hjemme<span className="brand-light">Kompass</span><small>Kartlegging med mennesket i sentrum</small></span></button>
      <nav aria-label="Hovedmeny">{([['home','Hjem',Home],['intent','Ny kartlegging',ClipboardList],['topics','Kartleggingsområder',ShieldCheck],['library','Tiltaksbibliotek',BookOpen],['guide','Om verktøyet',Info],['results','Oppsummering',Lightbulb]] as const).map(([p,text,Icon])=><button key={p} className={'nav-link '+(page===p?'active':'')} onClick={()=>showMenu(p)}><Icon size={19}/>{text}</button>)}</nav>
      <div className="sidebar-foot"><Heart size={17}/><span>Teknologi skal støtte mennesker, ikke erstatte faglig skjønn.</span></div>
    </aside>
    {menuOpen&&<button className="scrim" onClick={()=>setMenuOpen(false)} aria-label="Lukk meny"/>}
    <main className="main">
      <header className="topbar"><button className="mobile-menu icon-btn" aria-label="Åpne meny" onClick={()=>setMenuOpen(v=>!v)}>{menuOpen?<X/>:<Menu/>}</button><div className="breadcrumb">HjemmeKompass <ChevronRight size={14}/> <strong>{pageTitle[page]}</strong></div><div className="top-actions">{hasSession&&<button type="button" className="reset-header" aria-label="Tilbakestill hele kartleggingen" onClick={()=>{if(window.confirm("Tilbakestille hele kartleggingen? Alle svar og valg slettes og kan ikke gjenopprettes."))reset()}}><RotateCcw size={16} aria-hidden="true"/><span>Tilbakestill</span></button>}<span className="top-pill"><ShieldCheck size={15}/> Faglig prototype</span></div></header>
      <div className="content">
        {page==='home'&&<>
          <div className="intro-row"><div><p className="eyebrow">VELKOMMEN TIL HJEMMEKOMPASS</p><h1>En tryggere vei til gode valg.</h1><p className="lead">Personsentrert kartlegging av trygghet, mestring, sosial kontakt og velferdsteknologi – til støtte for ansatte i hjemmesykepleien.</p><button className="primary" onClick={()=>navigate('intent')}>{hasSession?'Fortsett kartlegging':'Start kartlegging'} <ArrowRight size={17}/></button><button className="home-guide-link text-link" onClick={()=>navigate('guide')}>Slik brukes verktøyet <ArrowRight size={16}/></button></div><div className="hero-art" aria-hidden="true"><div className="sun"/><div className="hill h1"/><div className="hill h2"/><div className="house"><div className="roof"/><div className="door"/></div><div className="path"/></div></div>
          <div className="section-title"><div><p className="eyebrow">SLIK FUNGERER DET</p><h2>Fra behov til muligheter</h2></div></div>
          <div className="how-grid">{[['01','Brukerens perspektiv','Start med mål, ressurser og ønsker.'],['02','Kartlegg i eget tempo','Velg relevante temaer og valgfri fordypning.'],['03','Utforsk mulige tiltak','Se muligheter, forbehold og videre avklaringer.']].map(([n,t,d])=><div className="how-card" key={n}><span className="how-num">{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div>
          <div className="section-title"><div><p className="eyebrow">KARTLEGGINGSOMRÅDER</p><h2>Åtte områder – velg selv</h2></div></div>
          <div className="topic-grid">{modules.map((m,i)=>{const Icon=icons[i];return <button key={m.id} className="topic-card topic-active" onClick={()=>{setSelectedTopics([m.id]);setTopicIndex(0);navigate('intent')}}><span className="topic-icon"><Icon size={22}/></span><strong>{m.title}</strong><small>{m.description}</small><span className="topic-bottom">Start med dette området <ArrowRight size={15}/></span></button>})}</div>
          <div className="notice"><Info size={19}/><p><strong>Viktig:</strong> Denne prototypen er ikke klinisk validert. Bruk bare fiktive caser. Verktøyet gir ikke tjenestevedtak eller automatiske vurderinger av forsvarlighet.</p></div>
        </>}
        {(['intent','topics','screen','deep','results'] as Page[]).includes(page)&&<div className="progress" aria-label="Fremdrift">{['Brukerens ønsker','Velg områder','Kartlegging','Oppsummering'].map((s,i)=><div key={s} className={'progress-step '+(step>=i+1?'current':'')}><span>{i+1}</span><small>{s}</small></div>)}</div>}
        {page==='intent'&&<>
          <p className="eyebrow">STEG 1 AV 4</p><h1>Hva er viktig for brukeren?</h1><p className="lead">Brukerens egne mål er utgangspunktet. Ikke legg inn navn eller andre identifiserende opplysninger.</p>
          <section className="panel"><h2>Brukerens mål og ønsker</h2><p className="muted">Hva er viktig i hverdagen? Velg gjerne flere.</p><div className="goal-grid">{priorities.map(g=><button key={g} aria-pressed={goals.includes(g)} className={'goal '+(goals.includes(g)?'selected':'')} onClick={()=>toggleGoal(g)}>{g}{goals.includes(g)&&<Check size={16}/>}</button>)}</div></section>
          <section className="panel"><h2>Hva fungerer allerede godt?</h2><p className="muted">Brukerens styrker og tilgjengelige ressurser kan være like viktige som utfordringene. Valgfritt – flere valg er mulig.</p><div className="goal-grid">{strengths.map(s=><button key={s} aria-pressed={userStrengths.includes(s)} className={'goal '+(userStrengths.includes(s)?'selected':'')} onClick={()=>toggleStrength(s)}>{s}{userStrengths.includes(s)&&<Check size={16}/>}</button>)}</div></section>
          <section className="panel"><h2>Hvordan stiller brukeren seg til teknologi?</h2><div className="choice-list">{attitudes.map(a=><button key={a.value} aria-pressed={attitude===a.value} onClick={()=>setAttitude(a.value)} className={'wide-choice '+(attitude===a.value?'selected':'')}><span><strong>{a.label}</strong><small>{a.detail}</small></span>{attitude===a.value&&<Check size={18}/>}</button>)}</div></section>
          <section className="panel"><h2>Hva betyr hjemmebesøk for sosial kontakt?</h2><p className="muted small">Vurder brukerens egen opplevelse, ikke bare hvor stort nettverk vedkommende har.</p><div className="choice-list">{visitImportance.map(a=><button key={a.value} aria-pressed={visits===a.value} onClick={()=>setVisits(a.value)} className={'wide-choice '+(visits===a.value?'selected':'')}><span><strong>{a.label}</strong><small>{a.detail}</small></span>{visits===a.value&&<Check size={18}/>}</button>)}</div></section>
          <div className="bottom-actions"><button className="secondary" onClick={()=>navigate('home')}><ArrowLeft size={17}/> Tilbake</button><button className="primary" onClick={()=>navigate('topics')}>Velg kartleggingsområder <ArrowRight size={17}/></button></div>
        </>}
        {page==='topics'&&<>
          <p className="eyebrow">STEG 2 AV 4</p><h1>Hva vil du kartlegge?</h1><p className="lead">Velg ett, flere eller alle åtte områder. Det er like greit å utforske ett relevant behov som å gjennomføre en bred kartlegging.</p>
          <div className="selection-head"><strong>{selectedTopics.length} av 8 områder valgt</strong><div className="selection-actions"><button className="text-link" onClick={()=>setSelectedTopics(modules.map(m=>m.id))}>Velg alle</button><button className="text-link" onClick={()=>setSelectedTopics([])}>Fjern alle</button></div></div>
          <div className="topic-grid">{modules.map((m,i)=>{const Icon=icons[i],selected=selectedTopics.includes(m.id);return <button key={m.id} aria-pressed={selected} className={'topic-card topic-active select-topic '+(selected?'chosen':'')} onClick={()=>toggleTopic(m.id)}><span className="topic-icon"><Icon size={22}/></span><span className="select-check">{selected?<Check size={17}/>:null}</span><strong>{m.title}</strong><small>{m.description}</small><span className="topic-bottom">{m.screening.length} grunnspørsmål · fordypning valgfri</span></button>})}</div>
          <div className="notice"><Info size={19}/><p>Resultatet skal vise nøyaktig hvilke områder som er kartlagt. Ikke-valgte områder blir ikke tolket som normale eller uten behov.</p></div>
          <div className="bottom-actions"><button className="secondary" onClick={()=>navigate('intent')}><ArrowLeft size={17}/> Tilbake</button><button className="primary" disabled={!selectedTopics.length} onClick={()=>{setTopicIndex(0);navigate('screen')}}>Start valgte områder <ArrowRight size={17}/></button></div>
        </>}
        {page==='screen'&&<>
          <p className="eyebrow">STEG 3 AV 4 · OMRÅDE {topicIndex+1} AV {selectedTopics.length}</p><h1>{current.title}</h1><p className="lead">{current.description} Alle spørsmål kan stå ubesvart; dette markeres som ikke avklart.</p>
          <div className="module-progress">{selectedTopics.map((id,i)=><button key={id} className={i===topicIndex?'active':''} onClick={()=>startModule(id)} aria-label={'Gå til '+moduleById[id].title} title={moduleById[id].title}>{i+1}</button>)}</div>
          <div className="mode-switch" aria-label="Kartleggingsmodus"><button className={mode==='quick'?'selected':''} aria-pressed={mode==='quick'} onClick={()=>setMode('quick')}>Hurtigkartlegging</button><button className={mode==='deep'?'selected':''} aria-pressed={mode==='deep'} onClick={()=>setMode('deep')}>Med fordypning</button></div>
          <section className="panel"><div className="panel-head"><div><p className="eyebrow">INNLEDENDE SPØRSMÅL</p><h2>Hva mestrer brukeren?</h2></div><span className="count">{screenAnswered} av {current.screening.length} avklart</span></div>{renderQuestions(current.screening)}</section>
          <div className="subtle-panel"><div><h3>Behov for mer informasjon?</h3><p>Åpne fordypning med relevante spørsmål, eller gå videre uten å miste svarene.</p></div><button className="secondary" onClick={openDeep}>Åpne fordypning <ArrowRight size={17}/></button></div>
          <div className="bottom-actions"><button className="secondary" onClick={()=>topicIndex===0?navigate('topics'):startModule(selectedTopics[topicIndex-1])}><ArrowLeft size={17}/> {topicIndex===0?'Områder':'Forrige område'}</button><button className="primary" onClick={()=>mode==='deep'?openDeep():nextModule()}>{mode==='deep'?'Fordypning':topicIndex+1===selectedTopics.length?'Se oppsummering':'Neste område'} <ArrowRight size={17}/></button></div>
          <button className="text-link" onClick={()=>navigate('results')}>Avslutt kartleggingen og se foreløpig oppsummering</button>
        </>}
        {page==='deep'&&<>
          <p className="eyebrow">STEG 3 AV 4 · VALGFRI FORDYPNING</p><h1>Fordypning: {current.title}</h1><p className="lead">Systemet viser spørsmål som kan være relevante ut fra det som allerede er kartlagt. Du kan alltid åpne alle.</p>
          <section className="panel"><div className="panel-head"><h2>Oppfølgingsspørsmål</h2><span className="count">{current.deep.filter(q=>answers[q.id]&&answers[q.id]!=='unknown').length} av {current.deep.length} avklart</span></div>
            {filteredDeep.length?renderQuestions(filteredDeep):<p className="muted">Ingen spesifikke fordypningsspørsmål er aktivert av svarene så langt. Du kan gå videre eller vise alle spørsmål.</p>}
            {!showAllDeep.includes(current.id)&&<button className="secondary show-all" onClick={()=>setShowAllDeep(p=>[...p,current.id])}>Vis alle {current.deep.length} fordypningsspørsmål</button>}
          </section>
          <div className="bottom-actions"><button className="secondary" onClick={()=>navigate('screen')}><ArrowLeft size={17}/> Tilbake</button><button className="primary" onClick={nextModule}>{topicIndex+1===selectedTopics.length?'Se oppsummering':'Neste område'} <ArrowRight size={17}/></button></div>
          <button className="text-link" onClick={()=>navigate('results')}>Avslutt kartleggingen og se foreløpig oppsummering</button>
        </>}
        {page==='results'&&<>
          <p className="eyebrow">STEG 4 AV 4</p><h1>Oppsummering</h1><p className="lead">Foreløpig støtte til videre faglige vurderinger – ikke en automatisert beslutning om tjenester eller teknologi.</p>
          <div className="results-metrics"><div><span>{assessment.coverage.length} / 8</span><small>Valgte områder</small></div><div><span>{assessment.screeningAnswered} / {assessment.screeningTotal}</span><small>Grunnspørsmål avklart</small></div><div><span>{assessment.deepAnswered} / {assessment.deepTotal}</span><small>Fordypning avklart</small></div></div>
          <section className="panel"><h2>Brukerens perspektiv</h2><p className="muted">Viktige mål: {goals.length?goals.join(', '):'Ikke kartlagt'}</p><p className="muted">Oppgitte ressurser: {userStrengths.length?userStrengths.join(', '):'Ikke kartlagt'}</p><p className="muted">Holdning til teknologi: {attitudes.find(a=>a.value===attitude)?.label}</p><p className="muted">Betydning av hjemmebesøk: {visitImportance.find(a=>a.value===visits)?.label}</p></section>
          <section className="panel"><h2>Omfang og avklaringer</h2><div className="coverage-grid">{modules.map(m=>{const c=assessment.coverage.find(x=>x.id===m.id);return <div className={'coverage-card '+(!c?'unassessed':'')} key={m.id}><strong>{m.title}</strong><small>{c?c.screeningAnswered+' av '+c.screeningTotal+' grunnspørsmål avklart':'Ikke kartlagt'}</small></div>})}</div></section>
          <section className="panel"><h2>Identifiserte behov</h2>{assessment.needs.length?<ul className="plain-list">{assessment.needs.map(n=><li key={n}><span className="list-dot"/>{n}</li>)}</ul>:<p className="muted">Ingen konkrete utfordringer identifisert gjennom besvarte spørsmål. Dette utelukker ikke behov.</p>}</section>
          <TailoredResults matches={matchedMeasures} reviewStatuses={reviewStatuses} setReviewStatuses={setReviewStatuses} openSolution={openLibraryForSolution} goToQuestions={()=>navigate('topics')}/>
                    <section className="panel"><h2>Ikke avklart / videre spørsmål</h2>{assessment.unknowns.length?<ul className="plain-list">{assessment.unknowns.map(n=><li key={n}><span className="list-dot"/>{n}</li>)}</ul>:<p className="muted">Ingen uavklarte grunnspørsmål i valgte områder. Det betyr ikke at en fullstendig faglig vurdering er gjennomført.</p>}</section>
          <div className="notice"><Info size={19}/><p>Ikke klinisk validert. Bruk bare fiktive opplysninger. Besvarelsene holdes kun i minnet mens siden er åpen og lagres ikke sentralt.</p></div>
          <div className="bottom-actions"><button className="secondary" onClick={()=>navigate('topics')}><ArrowLeft size={17}/> Endre områder</button><button className="secondary" onClick={()=>{if(window.confirm('Slette alle svar og starte på nytt?'))reset()}}><RotateCcw size={17}/> Nullstill svar</button></div>
        </>}
        {page==='library'&&<LibraryExplorer key={libraryItemId??'catalog'} initialId={libraryItemId} onReturnToAssessment={selectedTopics.length?()=>navigate('results'):undefined}/>}
        {page==='guide'&&<GuidePage startAssessment={()=>navigate('intent')} openLibrary={()=>{setLibraryItemId(null);navigate('library')}}/>}
        <footer><span>HjemmeKompass · Faglig prototype v0.5 · Kun fiktive caser</span><span>Skaper: <strong>Maritha Remes Vestbø</strong> <a href="tel:+4748456462">48 45 64 62</a> <a href="mailto:marithaov@icloud.com">marithaov@icloud.com</a></span></footer>
      </div>
    </main>
  </div>
}
