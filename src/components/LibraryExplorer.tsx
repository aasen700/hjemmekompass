import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ExternalLink, Search, ShieldAlert, SlidersHorizontal, X } from 'lucide-react'
import { referenceLinks, solutions, type Solution } from '../data/library'

const kindLabel = (kind: Solution['kind']) => kind === 'technology' ? 'Velferdsteknologi' : kind === 'aid' ? 'Praktisk hjelpemiddel' : 'Annet tiltak'

type Props = {
  initialId?: string | null
  onReturnToAssessment?: () => void
}

function Points({items}:{items: string[]}) {
  return <ul className="knowledge-points">{items.map(item=><li key={item}>{item}</li>)}</ul>
}

function SolutionDetail({item,onBack}:{item:Solution;onBack:()=>void}) {
  return <article className="knowledge-detail">
    <button className="text-link knowledge-back" type="button" onClick={onBack}><ArrowLeft size={17}/> Tilbake til biblioteket</button>
    <div className="knowledge-heading"><span className={'tag '+(item.kind==='technology'?'tech':'')}>{kindLabel(item.kind)}</span><span className="knowledge-category">{item.group}</span></div>
    <h2>{item.title}</h2>
    <p className="lead">{item.intro}</p>
    <div className="knowledge-highlight"><BookOpen size={20}/><div><strong>Når kan det være aktuelt?</strong><p>{item.need}</p></div></div>
    <div className="knowledge-sections">
      <section className="panel knowledge-section"><h3>Hvordan fungerer det?</h3><p>{item.function}</p></section>
      <section className="panel knowledge-section"><h3>Hva må kartlegges?</h3><Points items={item.before}/></section>
      <section className="panel knowledge-section"><h3>Begrensninger og risiko</h3><Points items={item.limitations}/></section>
      <section className="panel knowledge-section"><h3>Andre muligheter</h3><Points items={item.alternatives}/></section>
      <section className="panel knowledge-section"><h3>Oppfølging og evaluering</h3><Points items={item.followUp}/></section>
    </div>
    <section className="panel knowledge-section knowledge-sources">
      <h3>Relevante faglige kilder</h3>
      <p>Lenkene er valgt som videre lesning. Bibliotekteksten er et foreløpig arbeidsutkast, ikke en kvalitetssikret gjengivelse av kildene.</p>
      <ul>{item.sourceIds.map(id=>{const source=referenceLinks.find(x=>x.id===id);return source?<li key={id}><a href={source.url} target="_blank" rel="noreferrer noopener">{source.title} <ExternalLink size={14}/></a></li>:null})}</ul>
    </section>
    <div className="notice"><ShieldAlert size={19}/><p>Vurder teknologien eller tiltaket ut fra brukerens ønsker, forsvarlighet, tilgjengelighet og virksomhetens ansvar. HjemmeKompass tildeler ikke tjenester og erstatter ikke faglige vurderinger.</p></div>
  </article>
}

export default function LibraryExplorer({initialId,onReturnToAssessment}:Props) {
  const [selected,setSelected]=useState<string|null>(initialId??null)
  const [query,setQuery]=useState('')
  const [category,setCategory]=useState('Alle områder')
  const [type,setType]=useState<'all'|'technology'|'aid'|'nontech'>('all')
  const quickFind=[{label:'Dostol',query:'dostol'},{label:'Søsterhjelp',query:'søsterhjelp'},{label:'Støttestrømper',query:'støttestrømper'},{label:'GPS',query:'gps'},{label:'Forflytning',area:'Forflytning'},{label:'Bad og toalett',area:'Bad og toalett'}]
  const [visible,setVisible]=useState(12)
  const categories=['Alle områder',...new Set(solutions.map(s=>s.group))]
  const items=useMemo(()=>solutions.filter(s=>{
    if(category!=='Alle områder'&&s.group!==category)return false
    if(type!=='all'&&s.kind!==type)return false
    const text=[s.title,s.intro,s.need,s.group,...s.before,...s.alternatives,...(s.searchTerms??[])].join(' ').toLocaleLowerCase('nb-NO')
    return text.includes(query.toLocaleLowerCase('nb-NO').trim())
  }).sort((a,b)=>a.title.localeCompare(b.title,'nb-NO')),[category,query,type])

  const active=solutions.find(s=>s.id===selected)
  const setSearch=(value:string)=>{setQuery(value);setVisible(12)}
  const setArea=(value:string)=>{setCategory(value);setVisible(12)}
  const setKind=(value: typeof type)=>{setType(value);setVisible(12)}
  return <div className="knowledge-root">
    {active?<SolutionDetail item={active} onBack={()=>setSelected(null)}/>:<>
      <p className="eyebrow">TILTAKSBIBLIOTEK</p>
      <h1>Finn frem til mulighetene.</h1>
      <p className="lead">Utforsk teknologiske og ikke-teknologiske tiltak. Søk i et utvidet bibliotek med velferdsteknologi, praktiske hjelpemidler og ikke-teknologiske tiltak. Utforsk mulige behov, forutsetninger og begrensninger.</p>
      {onReturnToAssessment&&<button className="text-link knowledge-back" type="button" onClick={onReturnToAssessment}><ArrowLeft size={17}/> Tilbake til oppsummeringen</button>}
      <div className="library-quickfind"><span>Hurtigsøk</span>{quickFind.map(q=><button key={q.label} type="button" onClick={()=>{setSearch(q.query??'');setArea(q.area??'Alle områder');setType('all')}}>{q.label}</button>)}</div>
      <div className="library-toolbar">
        <label className="library-search"><Search size={19}/><span className="sr-only">Søk i tiltaksbiblioteket</span><input value={query} type="search" onChange={e=>setSearch(e.target.value)} placeholder="Søk etter tiltak, behov eller teknologi..."/></label>
        <label className="library-filter"><SlidersHorizontal size={17}/><span className="sr-only">Filtrer etter område</span><select value={category} onChange={e=>setArea(e.target.value)}>{categories.map(c=><option key={c} value={c}>{c}</option>)}</select></label>
      </div>
      <div className="library-type-tabs" aria-label="Filtrer etter type">
        {([{id:'all',text:'Alle tiltak'},{id:'technology',text:'Velferdsteknologi'},{id:'aid',text:'Hjelpemidler'},{id:'nontech',text:'Andre tiltak'}] as const).map(opt=><button key={opt.id} type="button" aria-pressed={type===opt.id} className={type===opt.id?'selected':''} onClick={()=>setKind(opt.id)}>{opt.text}</button>)}
      </div>
      <div className="library-count"><CheckCircle2 size={15}/>{items.length} av {solutions.length} tiltak vist</div>
      {items.length?<div className="knowledge-grid">{items.slice(0,visible).map(item=><button type="button" className="knowledge-card" key={item.id} onClick={()=>{setSelected(item.id);window.scrollTo({top:0,behavior:'smooth'})}}>
        <span className="knowledge-card-top"><span className="knowledge-category">{item.group}</span><span className={'tag '+(item.kind==='technology'?'tech':'')}>{kindLabel(item.kind)}</span></span>
        <strong>{item.title}</strong><span className="knowledge-card-intro">{item.intro}</span><span className="knowledge-card-foot">Les om tiltaket <ArrowRight size={16}/></span>
      </button>)}</div>:<div className="panel library-empty"><h3>Ingen tiltak funnet</h3><p className="muted">Prøv et annet søkeord eller fjern filtrene.</p><button className="secondary" onClick={()=>{setQuery('');setCategory('Alle områder');setType('all');setVisible(12)}}><X size={15}/> Tøm søk og filtre</button></div>}
      {items.length>visible&&<button className="secondary library-loadmore" type="button" onClick={()=>setVisible(v=>v+12)}>Vis 12 flere tiltak ({items.length-visible} gjenstår) <ArrowRight size={16}/></button>}
      <div className="notice"><ShieldAlert size={19}/><p>Biblioteket inneholder generelle tiltakstyper og eksempler på navngitte hjelpemidler, ikke godkjente produktanbefalinger. Innholdet er til faglig gjennomgang og testing med fiktive caser.</p></div>
    </>}
  </div>
}
