import type { Answers } from '../data/assessment'
import { allQuestions, moduleById } from '../data/modules'
import { solutions } from '../data/library'

export type Evidence = { id: string; values: string[] }
export type MatchingRule = {
  solutionId: string
  topic: string
  need: string
  explanation: string
  when: Evidence[]
  exclude?: Evidence[]
  check?: string[]
  priority: number
  specialist?: boolean
}
export type TailoredMatch = {
  solutionId: string
  title: string
  kind: 'technology' | 'aid' | 'nontech'
  topic: string
  need: string
  reason: string
  evidence: string[]
  checks: string[]
  warnings: string[]
  status: 'possible' | 'clarify'
  statusDescription: string
  priority: number
}
const y=(id:string):Evidence=>({id,values:['yes']})
const n=(id:string):Evidence=>({id,values:['no','partly']})
const c=(id:string):Evidence=>({id,values:['yes','partly']})
const e=(id:string,...values:string[]):Evidence=>({id,values})
const r=(solutionId:string,topic:string,need:string,explanation:string,when:Evidence[],priority:number,
  extra:Partial<Pick<MatchingRule,'exclude'|'check'|'specialist'>>={}):MatchingRule=>({solutionId,topic,need,explanation,when,priority,...extra})

/**
 * Rules are deliberately conservative: a concrete positive need must be recorded.
 * A solution being in the 87-entry library is never sufficient to generate a suggestion.
 * No numeric clinical risk score, no automated eligibility or legal decision.
 */
export const matchingRules: MatchingRule[] = [
  r('fall-prevention','fall','Fall og trygg ferdsel','Registrerte fall, nestenfall eller utfordringer i hjemmet gir grunnlag for å vurdere forebyggende og praktiske tiltak.',[y('recent_fall')],1),
  r('fall-prevention','fall','Fall og trygg ferdsel','Hindringer i boligen bør undersøkes før en teknologisk løsning velges.',[y('obstacles')],1),
  r('nightlight','fall','Nattlig belysning','Behovet gjelder konkret utilstrekkelig lys under nattlig forflytning.',[y('night_lighting')],2),
  r('alarm','fall','Mulighet for å tilkalle hjelp','Utrygghet er registrert, og en manuell alarm kan eventuelt utforskes dersom brukeren kan betjene den.',[n('feels_safe')],4,{exclude:[n('can_call'),n('alarm_usable')],check:['can_call','alarm_usable','response_ready']}),
  r('alarm','fall','Mulighet for å tilkalle hjelp','Fallhendelse gjør mulighet for å varsle om behov for hjelp relevant å avklare.',[y('recent_fall')],4,{exclude:[n('can_call'),n('alarm_usable')],check:['can_call','alarm_usable','response_ready']}),
  r('fall-sensor','fall','Fall uten evne til selv å varsle','Fall er oppgitt sammen med vansker med å tilkalle hjelp. Automatisk varsling kan derfor undersøkes.',[y('recent_fall'),n('can_call')],3,{specialist:true,check:['response_ready']}),
  r('night-observation','fall','Nattlig tilsyn','Et konkret behov for nattlig tilsyn er oppgitt. Formål, fysiske alternativer og juridiske vilkår må vurderes.',[y('night_observation')],8,{specialist:true}),
  r('toilet-commode','fall','Nattlige toalettbesøk','Nattlig forflytning til toalett er oppgitt som utfordring.',[y('fall_bed_night')],4),
  r('ramp','fall','Trinn og terskler','Trinn eller terskler er registrert som en konkret hindring.',[y('fall_steps')],4),
  r('stove-guard','fall','Trygg matlaging','Det er oppgitt risiko ved bruk av komfyr.',[y('fall_stove')],6),
  r('fire-linked','fall','Tilpasset brannvarsling','Brukeren oppfatter ikke ordinær lydvarsling pålitelig.',[y('fall_fire_alert')],7),
  r('gps','fall','Orientering utenfor hjemmet','Vansker med å finne hjem gir grunn til å drøfte trygg ferdsel og eventuelt lokalisering – ikke til automatisk GPS-tildeling.',[y('fall_wandering')],9,{specialist:true}),
  r('door-sensor','fall','Konkret dørvarsling','Et særskilt behov for varsel ved døråpning er registrert.',[y('fall_door_alert')],9,{specialist:true}),
  r('clinical-med-review','meds','Trygg legemiddelhåndtering','Det er meldt utfordringer med håndtering eller dagens oppfølging.',[y('meds_manage')],1),
  r('clinical-med-review','meds','Trygg legemiddelhåndtering','Brukeren opplever at eksisterende hjelp ikke fungerer tilfredsstillende.',[n('meds_support')],1),
  r('dispenser','meds','Glemte doser','Brukeren beskriver glemte doser; en dispenser kan utredes etter individuell egnethetsvurdering.',[y('meds_reminders')],4,{specialist:true,exclude:[n('meds_understand'),n('meds_physical'),y('meds_dose_help')],check:['meds_understand','meds_physical','meds_followup','meds_schedule']}),
  r('reminders','meds','Glemte doser','Et avgrenset påminnelsesbehov er registrert.',[y('meds_reminders')],6,{exclude:[y('meds_dose_help'),n('meds_understand')],check:['meds_understand']}),
  r('selfcare-aids','selfcare','Praktisk egenmestring','Vansker med daglig stell er registrert; konkret funksjon og brukerens mål må kartlegges.',[y('selfcare_difficulty')],8),
  r('toilet-commode','selfcare','Toalett nær brukeren','Brukeren har problemer med å nå toalettet i tide eller om natten.',[y('selfcare_toilet_distance')],2),
  r('raised-toilet','selfcare','Oppreisning fra toalett','Vansker med å komme opp fra toalettet kan tilsi at riktig sittehøyde vurderes.',[y('selfcare_toilet_transfer')],4),
  r('toilet-rails','selfcare','Oppreisning fra toalett','Behov for støtte ved toalettforflytning er identifisert.',[y('selfcare_toilet_transfer')],3),
  r('shower-chair','selfcare','Trygg dusjing','Stående dusj er beskrevet som vanskelig eller utrygg.',[y('selfcare_shower')],2),
  r('shower-commode','selfcare','Trygg dusjing','Behov for sittende dusj gjør kombinerte løsninger aktuelle å undersøke.',[y('selfcare_shower')],7),
  r('compression-doff','selfcare','Kompresjonsstrømper','Hjelp til av- og påtaking av kompresjonsstrømper er oppgitt.',[y('selfcare_compression')],2),
  r('stocking-frame','selfcare','Kompresjonsstrømper','Det er et konkret behov for enklere håndtering av kompresjonsstrømper.',[y('selfcare_compression')],3),
  r('dressing-stick','selfcare','Påkledning og rekkevidde','Vansker med å bøye seg eller nå klær er oppgitt.',[y('selfcare_dress_reach')],2),
  r('button-hook','selfcare','Finmotorikk ved påkledning','Brukeren har problemer med knapper eller glidelåser.',[y('selfcare_buttons')],3),
  r('smart-toilet','selfcare','Toaletthygiene','Det er spesifikke vansker med toalettstell eller hygiene.',[y('selfcare_toilet_hygiene')],6,{specialist:true}),
  r('nutrition-support','nutrition','Måltider og ernæring','Utfordringer med måltider eller inntak krever konkret faglig kartlegging og støtte.',[y('nutrition_difficulty')],1),
  r('nutrition-support','nutrition','Måltider og ernæring','Utilstrekkelig ernæring eller væske er bekymringen; ordinær oppfølging må vurderes.',[y('nutrition_concern')],1),
  r('meal-reminders','nutrition','Glemte måltider','Glemte måltider er oppgitt, slik at enkle påminnelser kan vurderes som supplement.',[y('nutrition_remind')],5,{exclude:[y('nutrition_swallow')]}),
  r('adapted-cutlery','nutrition','Grep ved måltider','Redusert håndfunksjon gjør vanlig bestikk vanskelig.',[y('nutrition_hand')],3),
  r('non-slip-mat','nutrition','Grep ved måltider','Redusert håndfunksjon gir vansker med å stabilisere redskapene.',[y('nutrition_hand')],5),
  r('plate-guard','nutrition','Samle mat på bestikket','Brukeren trenger hjelp til å samle maten på bestikket.',[y('nutrition_one_hand')],3),
  r('handled-cup','nutrition','Drikkehjelpemiddel','Det er vanskelig å holde eller løfte en kopp.',[y('nutrition_drinking')],3,{exclude:[y('nutrition_swallow')]}),
  r('stove-guard','nutrition','Komfyr og sikkerhet','Det er registrert et konkret risikomoment ved komfyren.',[y('nutrition_stove')],7),
  r('daily-plan','memory','Hverdagsstruktur','Hukommelsesutfordringer gir grunn til å utforske tilrettelagte rutiner.',[y('memory_difficulty')],2),
  r('calendar','memory','Dagsstruktur og avtaler','Brukeren ønsker støtte med avtaler, kalender eller rutiner.',[y('memory_calendar')],3,{exclude:[n('memory_messages')],check:['memory_messages','memory_senses']}),
  r('talking-clock','memory','Tid og orientering','Det er spesielt utfordrende å orientere seg om dag og tid.',[y('memory_time')],3),
  r('voice-reminders','memory','Muntlige påminnelser','Brukeren oppfatter muntlige beskjeder bedre enn skjermtekst.',[y('memory_voice')],4,{exclude:[n('memory_messages')]}),
  r('gps','memory','Orientering ute','Problemer med å finne veien hjem er oppgitt. Før lokalisering må juridiske, etiske og praktiske forhold avklares.',[y('memory_wayfinding')],8,{specialist:true}),
  r('door-sensor','memory','Varsel ved ytterdør','Det er et konkret behov for dørsensor/varsling; formål og lovlig bruk må vurderes.',[y('memory_door')],8,{specialist:true}),
  r('social-activities','social','Ønsket sosial kontakt','Brukeren ønsker mer sosial kontakt eller deltakelse.',[y('social_more')],1),
  r('social-activities','social','Ønsket sosial kontakt','Brukeren opplever utilstrekkelig sosial kontakt.',[n('social_enough')],1),
  r('video-calls','social','Digital sosial kontakt','Brukeren har uttrykt ønske om å prøve digital kontakt.',[y('social_video')],4,{exclude:[e('social_network','no')],check:['social_network']}),
  r('amplified-phone','social','Hørbar kommunikasjon','Syn eller hørsel vanskeliggjør samtaler og kontakt.',[y('social_hearing')],5),
  r('manual-wheelchair','social','Deltakelse utenfor hjemmet','Forflytning eller transport er registrert som hinder for kontakt.',[y('social_transport')],8,{specialist:true}),
  r('fall-prevention','activity','Mobilitet og aktivitet','Vansker med viktige aktiviteter tilsier videre funksjonsvurdering.',[y('activity_difficulty')],2),
  r('rollator','activity','Støtte under gange','Brukeren trenger støtte under gange.',[y('activity_walk')],3),
  r('manual-wheelchair','activity','Mobilitet over avstand','Brukeren har utfordringer med gangdistanser som er viktige i hverdagen.',[y('activity_wheel')],5),
  r('powered-wheelchair','activity','Mobilitet over avstand','Brukeren har vansker med å tilbakelegge relevante avstander.',[y('activity_wheel')],9,{specialist:true}),
  r('sister-pole','activity','Forflytning i seng','Brukeren har vansker med å snu seg eller komme opp i seng.',[y('activity_bed')],3,{specialist:true}),
  r('bed-rail','activity','Forflytning i seng','Støtte ved oppreisning eller leieendring kan vurderes.',[y('activity_bed')],4,{specialist:true}),
  r('transfer-board','activity','Overflytting mellom flater','Brukeren har konkrete utfordringer med overflytting.',[y('activity_transfer')],4,{specialist:true}),
  r('powered-lift','activity','Overflytting mellom flater','Brukeren trenger bistand ved overflytting; løfter må vurderes av kvalifisert personell.',[y('activity_transfer')],9,{specialist:true}),
  r('ramp','activity','Trapp og nivåforskjell','Nivåforskjeller er en konkret barriere.',[y('activity_stairs')],3),
  r('stair-lift','activity','Trapp og nivåforskjell','Trapp hindrer viktig daglig aktivitet.',[y('activity_stairs')],7,{specialist:true}),
  r('grabber','activity','Rekkevidde og tilgjengelighet','Brukeren har problemer med å nå lette gjenstander.',[y('activity_reach')],3),
  r('pressure-cushion','activity','Sitting og komfort','Brukeren opplever utfordringer med å sitte eller trykkbelastning.',[y('activity_sitting')],6,{specialist:true}),
  r('digital-training','digital','Digital mestring','Behov for opplæring eller støtte til teknologi er oppgitt.',[y('digital_support')],2),
  r('hearing-aid-support','digital','Hørbar kommunikasjon','Brukeren har problemer med å oppfatte lyd eller samtaler.',[y('digital_hearing')],3),
  r('visual-alert','digital','Oppfattelse av varsler','Lydvarsler oppfattes dårlig; alternative varslingsformer kan vurderes.',[y('digital_hearing')],4),
  r('voice-home','digital','Betjening av boligen','Brukeren har uttrykt ønske om fjern-/stemmestyring.',[y('digital_control')],6,{check:['digital_access','digital_senses']}),
  r('aac-device','digital','Kommunikasjon','Det er identifisert et særskilt behov for alternativ kommunikasjon.',[y('digital_talk')],5,{specialist:true})
]
const questionTitle=new Map(allQuestions.map(q=>[q.id,q.title]))
const solutionById=new Map(solutions.map(s=>[s.id,s]))
const highRisk=new Set(['gps','door-sensor','night-observation','dispenser','fall-sensor','powered-lift','smart-toilet','aac-device'])

export function getTailoredMatches(
  answers:Answers, technologyAttitude:string, selectedTopics:string[], visitImportance:string,
):TailoredMatch[] {
  const included=new Set(selectedTopics.filter(topic=>!!moduleById[topic]))
  const get=(id:string)=>answers[id]??'unknown'
  const matches:TailoredMatch[]=[]
  const matchesEvidence=(criterion:Evidence)=>criterion.values.includes(get(criterion.id))
  for(const rule of matchingRules) {
    if(!included.has(rule.topic) || !rule.when.every(matchesEvidence))continue
    if(rule.exclude?.some(matchesEvidence))continue
    const solution=solutionById.get(rule.solutionId)
    if(!solution)continue
    // Do not suggest technology when the person explicitly declines it.
    if(solution.kind==='technology'&&technologyAttitude==='no')continue
    // Do not silently ignore social contact and an explicit wish against replacing visits.
    const missing=(rule.check??[]).filter(id=>get(id)==='unknown')
    const techUnknown=solution.kind==='technology' && technologyAttitude!=='positive'
    const reviewRequired=rule.specialist || highRisk.has(solution.id)
    const status:TailoredMatch['status']=missing.length||techUnknown||reviewRequired?'clarify':'possible'
    const evidence=rule.when.map(signal=>{
      const label=questionTitle.get(signal.id)??signal.id
      const value=get(signal.id)
      const answer=value==='partly'?'Delvis':value==='no'?'Nei':'Ja'
      return answer+': '+label
    })
    const checks=[
      ...missing.map(id=>'Må avklares: '+(questionTitle.get(id)??id)),
      ...(techUnknown?['Brukerens holdning til teknologi må avklares før videre vurdering.']:[]),
      ...(reviewRequired?['Krever individuell faglig vurdering, egnethet og nødvendige rettslige avklaringer.']:[]),
      ...solution.before.slice(0,2)
    ]
    const warnings=[
      ...(solution.id==='dispenser'?['Må ikke tolkes som vedtak om dispenser. Helsetilsynet fremhever egnethetsvurdering, opplæring og oppfølging.']:[]),
      ...(['gps','door-sensor','night-observation'].includes(solution.id)?['Varsling, lokalisering og digitalt tilsyn krever konkret vurdering av lovgrunnlag, beslutningskompetanse, eventuell motstand og privatliv.']:[]),
      ...(['fall-sensor','alarm'].includes(solution.id)?['Forutsetter avklart mottak, ansvar og respons på varsler.']:[]),
      ...(solution.kind==='technology'&&visitImportance==='very'?['Hjemmebesøk har stor sosial betydning; teknologi kan ikke automatisk erstatte dem.']:[])
    ]
    matches.push({
      solutionId:solution.id, title:solution.title, kind:solution.kind, topic:rule.topic,
      need:rule.need,reason:rule.explanation,evidence,checks:[...new Set(checks)],
      warnings,priority:rule.priority,status,
      statusDescription:status==='clarify'?'Må avklares før eventuell utprøving':'Aktuelt å utforske – ikke godkjent eller tildelt'
    })
  }
  // Merge duplicate interventions while preserving independent evidence and need coverage.
  const unique=new Map<string,TailoredMatch>()
  for(const item of matches.sort((a,b)=>a.priority-b.priority||a.title.localeCompare(b.title,'nb-NO'))) {
    const previous=unique.get(item.solutionId)
    if(!previous)unique.set(item.solutionId,item)
    else unique.set(item.solutionId,{
      ...previous,
      evidence:[...new Set([...previous.evidence,...item.evidence])],
      warnings:[...new Set([...previous.warnings,...item.warnings])],
      checks:[...new Set([...previous.checks,...item.checks])]
    })
  }
  // No more than two choices for the same specific need, regardless of catalog size.
  const counts=new Map<string,number>()
  return [...unique.values()].filter(item=>{
    const name=item.topic+':'+item.need
    const count=counts.get(name)??0
    if(count>=2)return false
    counts.set(name,count+1)
    return true
  }).sort((a,b)=>a.priority-b.priority||a.title.localeCompare(b.title,'nb-NO'))
}
