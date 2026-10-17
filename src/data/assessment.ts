/** Faglig prototype: Ikke et validert klinisk kartleggingsinstrument. */
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
