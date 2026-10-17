/** Prototype content: requires clinical and legal quality assurance before real-world use. */
export type Answer = 'yes' | 'partly' | 'no' | 'unknown'
export type Answers = Record<string, string>
export type Question = {
  id: string
  title: string
  help?: string
  options: { value: string; label: string }[]
}
export type AssessmentMode = 'quick' | 'deep'

export const fourChoices = [
  { value: 'yes', label: 'Ja' },
  { value: 'partly', label: 'Delvis' },
  { value: 'no', label: 'Nei' },
  { value: 'unknown', label: 'Ikke avklart' }
]
export const threeChoices = [
  { value: 'yes', label: 'Ja' },
  { value: 'no', label: 'Nei' },
  { value: 'unknown', label: 'Ikke avklart' }
]

export const priorities = [
  'Trygghet hjemme',
  'Å mestre hverdagen selv',
  'Sosial kontakt',
  'Å kunne bo hjemme',
  'Minst mulig teknologi',
  'Annet / ønsker ikke å svare'
]

export const screeningQuestions: Question[] = [
  { id: 'feels_safe', title: 'Opplever brukeren seg trygg hjemme?', help: 'Ta utgangspunkt i hvordan brukeren selv opplever situasjonen.', options: fourChoices },
  { id: 'recent_fall', title: 'Har brukeren falt eller vært nær ved å falle?', help: 'Gjelder både fall og nestenfall som brukeren eller ansatte kjenner til.', options: threeChoices },
  { id: 'can_call', title: 'Kan brukeren tilkalle hjelp ved behov?', help: 'For eksempel ved fall, akutt utrygghet eller andre situasjoner.', options: fourChoices },
  { id: 'night_fear', title: 'Opplever brukeren utrygghet om natten?', help: 'Spør gjerne hva utryggheten skyldes.', options: threeChoices }
]

export const deepQuestions: Question[] = [
  { id: 'mobility', title: 'Er det utfordringer med gange, oppreisning eller forflytning?', options: threeChoices },
  { id: 'obstacles', title: 'Er det hindringer eller andre fallrisikofaktorer i boligen?', help: 'Eksempler: terskler, løse tepper eller dårlige gangsoner.', options: threeChoices },
  { id: 'alarm_present', title: 'Har brukeren allerede en trygghetsalarm?', options: threeChoices },
  { id: 'alarm_usable', title: 'Kan brukeren forstå, nå og utløse alarmen ved behov?', help: 'Vurder også hva som skjer dersom brukeren ikke kan utløse den selv.', options: fourChoices },
  { id: 'response_ready', title: 'Er det avklart hvem som tar imot og følger opp varsler?', options: threeChoices },
  { id: 'night_lighting', title: 'Er belysningen utilstrekkelig ved nattlige forflytninger?', options: threeChoices },
  { id: 'night_observation', title: 'Er det et konkret behov for tilsyn om natten?', help: 'Et tilsynsbehov må vurderes faglig og er ikke i seg selv en indikasjon for digitalt tilsyn.', options: threeChoices }
]

export const topicCards = [
  { id: 'fall', title: 'Trygghet og fall', description: 'Trygghet, fallrisiko og mulighet til å få hjelp.', icon: 'shield', active: true },
  { id: 'meds', title: 'Legemidler', description: 'Håndtering, påminnelser og mestring.', icon: 'pill', active: false },
  { id: 'nutrition', title: 'Mat og ernæring', description: 'Måltider og ernæringsrelaterte behov.', icon: 'utensils', active: false },
  { id: 'social', title: 'Sosial kontakt', description: 'Nettverk, samvær og tilhørighet.', icon: 'users', active: false },
  { id: 'memory', title: 'Hukommelse', description: 'Orientering, struktur og påminnelser.', icon: 'brain', active: false },
  { id: 'selfcare', title: 'Personlig stell', description: 'Daglige rutiner og egenmestring.', icon: 'heart', active: false },
  { id: 'activity', title: 'Bevegelse', description: 'Mobilitet, aktivitet og deltakelse.', icon: 'footprints', active: false },
  { id: 'digital', title: 'Digital mestring', description: 'Interesse, erfaring og forutsetninger.', icon: 'monitor', active: false }
] as const

export const attitudes = [
  { value: 'positive', label: 'Positiv til teknologi', detail: 'Åpen for å prøve nye løsninger.' },
  { value: 'unsure', label: 'Usikker', detail: 'Trenger informasjon eller støtte.' },
  { value: 'no', label: 'Ønsker ikke teknologi nå', detail: 'Brukerens ønsker må respekteres.' },
  { value: 'unknown', label: 'Ikke avklart', detail: 'Må undersøkes nærmere.' }
]

export const visitImportance = [
  { value: 'very', label: 'Svært viktig', detail: 'Besøk gir vesentlig sosial kontakt.' },
  { value: 'some', label: 'Noe viktig', detail: 'Besøk er én av flere sosiale arenaer.' },
  { value: 'less', label: 'Mindre viktig', detail: 'Brukeren oppgir å ha annen sosial kontakt.' },
  { value: 'unknown', label: 'Ikke avklart', detail: 'Betydningen er ikke undersøkt.' }
]
