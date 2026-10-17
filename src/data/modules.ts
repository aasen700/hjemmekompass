import { fourChoices, threeChoices, type Answers, type Question } from './assessment'

export type AssessmentModule = {
  id: string
  title: string
  description: string
  screening: Question[]
  deep: (Question & { when?: { id: string; values: string[] } })[]
}

const yesNo = threeChoices
const yesPartial = fourChoices

/** Uvalidert faglig prototype – spørsmålene er ikke et klinisk screeninginstrument. */
export const modules: AssessmentModule[] = [
  {
    id: 'fall', title: 'Trygghet og fall', description: 'Opplevd trygghet, fall og mulighet for å tilkalle hjelp.',
    screening: [
      { id: 'feels_safe', title: 'Opplever brukeren seg trygg hjemme?', options: yesPartial, help: 'Ta utgangspunkt i hvordan brukeren selv opplever situasjonen.' },
      { id: 'recent_fall', title: 'Har brukeren falt eller vært nær ved å falle?', options: yesNo, help: 'Spør om både fall og nestenfall.' },
      { id: 'can_call', title: 'Kan brukeren tilkalle hjelp ved behov?', options: yesPartial },
      { id: 'night_fear', title: 'Opplever brukeren utrygghet om natten?', options: yesNo }
    ],
    deep: [
      { id: 'mobility', title: 'Er det utfordringer med gange, oppreisning eller forflytning?', options: yesNo, when: { id: 'recent_fall', values: ['yes'] } },
      { id: 'obstacles', title: 'Er det hindringer eller fallrisikofaktorer i boligen?', options: yesNo, help: 'For eksempel terskler, løse tepper eller belysning.', when: { id: 'recent_fall', values: ['yes'] } },
      { id: 'alarm_present', title: 'Har brukeren allerede en trygghetsalarm?', options: yesNo, when: { id: 'can_call', values: ['no', 'partly'] } },
      { id: 'alarm_usable', title: 'Kan brukeren forstå, nå og utløse alarmen?', options: yesPartial, when: { id: 'can_call', values: ['no', 'partly'] } },
      { id: 'response_ready', title: 'Er det avklart hvem som tar imot og følger opp varsler?', options: yesNo, when: { id: 'can_call', values: ['no', 'partly'] } },
      { id: 'night_lighting', title: 'Er belysningen utilstrekkelig ved forflytning om natten?', options: yesNo, when: { id: 'night_fear', values: ['yes'] } },
      { id: 'night_observation', title: 'Er det et konkret behov for nattlig tilsyn?', options: yesNo, help: 'Tilsynsbehov krever selvstendig faglig vurdering.', when: { id: 'night_fear', values: ['yes'] } }
    ]
  },
  {
    id: 'meds', title: 'Legemidler', description: 'Rutiner, påminnelser og praktisk mestring av legemidler.',
    screening: [
      { id: 'meds_manage', title: 'Har brukeren vansker med å huske eller håndtere legemidlene sine?', options: yesNo },
      { id: 'meds_support', title: 'Opplever brukeren at dagens hjelp til legemiddelhåndtering fungerer?', options: yesPartial }
    ],
    deep: [
      { id: 'meds_reminders', title: 'Skyldes utfordringene særlig at doser glemmes?', options: yesNo, when: { id: 'meds_manage', values: ['yes'] } },
      { id: 'meds_understand', title: 'Kan brukeren forstå varsler og følge nødvendig instruksjon?', options: yesPartial, when: { id: 'meds_manage', values: ['yes'] } },
      { id: 'meds_physical', title: 'Kan brukeren håndtere en eventuell dispenser fysisk?', options: yesPartial, when: { id: 'meds_manage', values: ['yes'] } },
      { id: 'meds_followup', title: 'Er ansvar for påfyll, uteblitte doser og tekniske feil avklart?', options: yesNo, when: { id: 'meds_manage', values: ['yes'] } }
    ]
  },
  {
    id: 'selfcare', title: 'Personlig stell', description: 'Hygiene, påkledning og selvstendighet i daglige rutiner.',
    screening: [
      { id: 'selfcare_difficulty', title: 'Har brukeren vansker med personlig stell eller påkledning?', options: yesNo },
      { id: 'selfcare_goals', title: 'Får brukeren ivaretatt personlig stell slik vedkommende ønsker?', options: yesPartial }
    ],
    deep: [
      { id: 'selfcare_environment', title: 'Er bad eller andre omgivelser vanskelig tilrettelagt?', options: yesNo, when: { id: 'selfcare_difficulty', values: ['yes'] } },
      { id: 'selfcare_cues', title: 'Kan påminnelser eller en enklere rutine være til hjelp?', options: yesNo, when: { id: 'selfcare_difficulty', values: ['yes'] } },
      { id: 'selfcare_aids', title: 'Er behov for praktiske hjelpemidler vurdert?', options: yesNo, when: { id: 'selfcare_difficulty', values: ['yes'] } }
    ]
  },
  {
    id: 'nutrition', title: 'Mat og ernæring', description: 'Måltider, mattilgang og mestring av daglig matinntak.',
    screening: [
      { id: 'nutrition_difficulty', title: 'Er det utfordringer med matlaging, måltider eller matinntak?', options: yesNo },
      { id: 'nutrition_routine', title: 'Opplever brukeren å mestre måltidsrutinene sine?', options: yesPartial }
    ],
    deep: [
      { id: 'nutrition_remind', title: 'Glemmer brukeren måltider eller trenger påminnelse?', options: yesNo, when: { id: 'nutrition_difficulty', values: ['yes'] } },
      { id: 'nutrition_access', title: 'Er innkjøp, tilberedning eller tilgang til mat en utfordring?', options: yesNo, when: { id: 'nutrition_difficulty', values: ['yes'] } },
      { id: 'nutrition_concern', title: 'Er det bekymring for utilstrekkelig ernæring eller væske?', options: yesNo, help: 'Dette krever ordinær faglig kartlegging etter lokale rutiner.', when: { id: 'nutrition_difficulty', values: ['yes'] } }
    ]
  },
  {
    id: 'memory', title: 'Hukommelse og orientering', description: 'Påminnelser, døgnstruktur og oversikt i hverdagen.',
    screening: [
      { id: 'memory_difficulty', title: 'Har brukeren vansker med å huske avtaler eller daglige oppgaver?', options: yesNo },
      { id: 'memory_orientation', title: 'Opplever brukeren utfordringer med orientering eller dagsstruktur?', options: yesNo }
    ],
    deep: [
      { id: 'memory_messages', title: 'Kan brukeren forstå og følge en enkel påminnelse?', options: yesPartial, when: { id: 'memory_difficulty', values: ['yes'] } },
      { id: 'memory_senses', title: 'Påvirker syn eller hørsel muligheten til å bruke påminnelser?', options: yesNo, when: { id: 'memory_difficulty', values: ['yes'] } },
      { id: 'memory_calendar', title: 'Ønsker brukeren støtte til kalender, dagsplan eller rutiner?', options: yesNo, when: { id: 'memory_orientation', values: ['yes'] } }
    ]
  },
  {
    id: 'social', title: 'Sosial kontakt', description: 'Relasjoner, ensomhet og betydningen av fysiske besøk.',
    screening: [
      { id: 'social_enough', title: 'Opplever brukeren å ha tilstrekkelig sosial kontakt?', options: yesPartial },
      { id: 'social_more', title: 'Ønsker brukeren mer kontakt eller deltakelse?', options: yesNo }
    ],
    deep: [
      { id: 'social_network', title: 'Har brukeren noen vedkommende ønsker mer kontakt med?', options: yesNo, when: { id: 'social_more', values: ['yes'] } },
      { id: 'social_video', title: 'Ønsker brukeren å prøve videosamtaler eller annen digital kontakt?', options: yesNo, when: { id: 'social_more', values: ['yes'] } },
      { id: 'social_hurdles', title: 'Finnes det praktiske barrierer for sosial deltakelse?', options: yesNo, when: { id: 'social_enough', values: ['no', 'partly'] } }
    ]
  },
  {
    id: 'activity', title: 'Bevegelse og aktivitet', description: 'Forflytning, fysisk aktivitet og viktige hverdagsaktiviteter.',
    screening: [
      { id: 'activity_difficulty', title: 'Har brukeren vansker med bevegelse eller aktiviteter som er viktige?', options: yesNo },
      { id: 'activity_wishes', title: 'Ønsker brukeren å mestre flere aktiviteter selv?', options: yesNo }
    ],
    deep: [
      { id: 'activity_home', title: 'Begrenser forhold i boligen muligheten til å bevege seg?', options: yesNo, when: { id: 'activity_difficulty', values: ['yes'] } },
      { id: 'activity_aids', title: 'Er behov for hjelpemidler eller rehabiliteringsstøtte vurdert?', options: yesNo, when: { id: 'activity_difficulty', values: ['yes'] } },
      { id: 'activity_outdoors', title: 'Er det barrierer for å komme seg ut eller delta sosialt?', options: yesNo, when: { id: 'activity_wishes', values: ['yes'] } }
    ]
  },
  {
    id: 'digital', title: 'Digital mestring', description: 'Erfaring, forutsetninger, motivasjon og opplæring.',
    screening: [
      { id: 'digital_experience', title: 'Har brukeren erfaring med digitale løsninger i hverdagen?', options: yesPartial },
      { id: 'digital_support', title: 'Har brukeren behov for støtte eller opplæring ved ny teknologi?', options: yesNo }
    ],
    deep: [
      { id: 'digital_access', title: 'Har brukeren tilgang til egnet utstyr og nettforbindelse?', options: yesNo, when: { id: 'digital_support', values: ['yes'] } },
      { id: 'digital_senses', title: 'Gjør syn, hørsel eller håndfunksjon teknologien vanskelig å bruke?', options: yesNo, when: { id: 'digital_support', values: ['yes'] } },
      { id: 'digital_helper', title: 'Er det avklart hvem som kan bidra med opplæring og teknisk hjelp?', options: yesNo, when: { id: 'digital_support', values: ['yes'] } }
    ]
  }
]

export const moduleById: Record<string, AssessmentModule> = Object.fromEntries(modules.map(m => [m.id, m]))
export const allQuestions = modules.flatMap(m => [...m.screening, ...m.deep])

/** Suggested follow-up questions are shown if screening reveals a relevant concern.
 * A user can always expand the full list. Previously answered questions never disappear. */
export function suggestedDeepQuestions(module: AssessmentModule, answers: Answers, showAll = false) {
  return module.deep.filter(q => showAll || answers[q.id] !== undefined || !q.when || q.when.values.includes(answers[q.when.id] ?? 'unknown'))
}
