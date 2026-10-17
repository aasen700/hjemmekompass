import { useState } from 'react'
import { ArrowRight, BookOpen, CheckCircle2, CircleHelp, Info, ShieldAlert } from 'lucide-react'
import type { TailoredMatch } from '../engine/matching'

type Props={
  matches:TailoredMatch[]
  reviewStatuses:Record<string,string>
  setReviewStatuses:(next:(prev:Record<string,string>)=>Record<string,string>)=>void
  openSolution:(solutionId:string)=>void
  goToQuestions:()=>void
}
export default function TailoredResults({matches,reviewStatuses,setReviewStatuses,openSolution,goToQuestions}:Props){
  const [visible,setVisible]=useState(6)
  const shown=matches.slice(0,visible)
  const clarification=matches.filter(m=>m.status==='clarify').length
  return <section className="tailored-section" aria-labelledby="tailored-heading">
    <div className="section-title"><div><p className="eyebrow">BEGRUNNET BESLUTNINGSSTØTTE</p><h2 id="tailored-heading">Tiltak knyttet til svarene</h2></div></div>
    <div className="tailored-explanation"><CheckCircle2 size={20}/><p><strong>Ikke alle tiltakene i biblioteket vises.</strong> Bare tiltak med konkrete relevante svar tas med. De er forslag til videre drøfting, ikke tildeling eller dokumentert egnethet. Et kort spørreskjema kan ikke alene fastslå hva som er forsvarlig.</p></div>
    {clarification>0&&<p className="tailored-summary"><ShieldAlert size={16}/> {clarification} av {matches.length} muligheter krever særskilt avklaring før eventuell utprøving.</p>}
    {shown.length>0?<div className="tailored-grid">{shown.map(m=><article className="tailored-card" key={m.solutionId}>
      <div className="tailored-card-top"><span className={'tag '+(m.kind==='technology'?'tech':'')}>{m.kind==='technology'?'Velferdsteknologi':m.kind==='aid'?'Hjelpemiddel':'Annet tiltak'}</span><span className={'match-status '+(m.status==='clarify'?'needs-review':'')}>{m.status==='clarify'?<ShieldAlert size={15}/>:<CircleHelp size={15}/>} {m.statusDescription}</span></div>
      <h3>{m.title}</h3><p className="match-reason">{m.reason}</p>
      <div className="match-evidence"><strong>Hvorfor vises dette?</strong><ul>{m.evidence.map(e=><li key={e}>{e}</li>)}</ul></div>
      <details className="match-checks" open={m.status==='clarify'}><summary>Dette må vurderes før bruk</summary><ul>{m.checks.map(check=><li key={check}>{check}</li>)}</ul>{m.warnings.map(warning=><p className="match-warning" key={warning}><Info size={15}/>{warning}</p>)}</details>
      <button className="result-library-link" type="button" onClick={()=>openSolution(m.solutionId)}><BookOpen size={15}/> Les om tiltaket <ArrowRight size={15}/></button>
      <label className="review-choice"><span>Ansattes foreløpige vurdering</span><select value={reviewStatuses[m.solutionId]??'none'} onChange={e=>setReviewStatuses(p=>({...p,[m.solutionId]:e.target.value}))}>
        <option value="none">Ikke vurdert</option><option value="consider">Aktuelt å utrede</option><option value="notnow">Ikke aktuelt nå</option>
      </select></label>
    </article>)}</div>:<div className="panel tailored-empty"><CircleHelp size={22}/><div><h3>Ingen konkrete tiltak foreslått på oppgitt grunnlag</h3><p>Dette er ikke en konklusjon om at brukeren ikke har behov. Det kan være aktuelt å velge flere områder, svare på fordypningsspørsmål eller foreta ordinær faglig vurdering.</p><button type="button" className="secondary" onClick={goToQuestions}>Tilbake til kartlegging <ArrowRight size={15}/></button></div></div>}
    {matches.length>visible&&<button className="secondary tailored-more" type="button" onClick={()=>setVisible(n=>n+6)}>Vis flere begrunnede muligheter ({matches.length-visible} igjen) <ArrowRight size={16}/></button>}
    {matches.length>0&&<p className="tailored-note">Viser {shown.length} av {matches.length} mulige tiltak utløst av faktiske svar. Biblioteket inneholder også andre hjelpemidler for manuell utforskning.</p>}
  </section>
}
