import { deepQuestions, screeningQuestions, type Answers } from '../data/assessment'

export type Suggestion = {
  id: string
  title: string
  kind: 'technology' | 'nontech'
  reason: string
  considerations: string[]
  caution?: string
}

/** Pure, transparent support logic. Never equate missing/unknown answers with "no". */
export function makeAssessment(answers: Answers, technologyAttitude: string, visitImportance: string) {
  const get = (id: string) => answers[id] ?? 'unknown'
  const noTechnology = technologyAttitude === 'no'
  const suggestions: Suggestion[] = []
  const needs: string[] = []
  const unknowns: string[] = []
  const all = [...screeningQuestions, ...deepQuestions]
  for (const q of all) {
    if (get(q.id) === 'unknown') unknowns.push(q.title)
  }

  const fallConcern = get('recent_fall') === 'yes' || get('mobility') === 'yes' || get('obstacles') === 'yes'
  const feelsUnsafe = get('feels_safe') === 'no' || get('feels_safe') === 'partly'
  const callConcern = get('can_call') === 'no' || get('can_call') === 'partly'
  const nightConcern = get('night_fear') === 'yes'
  const socialConcern = visitImportance === 'very'
  if (fallConcern) needs.push('Fall, nestenfall eller utfordringer ved forflytning')
  if (feelsUnsafe) needs.push('Opplevd utrygghet hjemme')
  if (callConcern) needs.push('Utfordringer med å tilkalle hjelp')
  if (nightConcern) needs.push('Utrygghet på nattestid')

  if (fallConcern || feelsUnsafe) suggestions.push({
    id: 'fall-prevention',
    title: 'Fallforebygging og tilrettelegging',
    kind: 'nontech',
    reason: 'Kartleggingen indikerer mulige fallrelaterte utfordringer eller utrygghet.',
    considerations: ['Vurder årsaker til fall og behov for ytterligere fallkartlegging.', 'Vurder boligforhold, hjelpemidler og eventuell ergo-/fysioterapeutisk oppfølging.']
  })

  if (nightConcern || get('night_lighting') === 'yes') suggestions.push({
    id: 'light',
    title: 'Bedre belysning og trygg nattlig ferdsel',
    kind: 'nontech',
    reason: 'Utrygghet om natten eller mangelfull belysning er beskrevet.',
    considerations: ['Undersøk hva som forårsaker utryggheten og hvilke tiltak brukeren ønsker.', 'Kartlegg nattlige forflytninger, framkommelighet og behov for praktisk tilrettelegging.']
  })

  if (!noTechnology && (feelsUnsafe || callConcern || get('recent_fall') === 'yes')) suggestions.push({
    id: 'alarm',
    title: 'Digital trygghetsalarm',
    kind: 'technology',
    reason: 'Opplevd utrygghet, fall eller problemer med å tilkalle hjelp kan gjøre alarmering relevant å vurdere.',
    considerations: ['Kan brukeren forstå, nå og aktivere alarmen?', 'Hvem mottar alarmen og responderer?', 'Hva skjer ved strøm-, nett- eller utstyrssvikt?'],
    caution: get('can_call') === 'no' || get('alarm_usable') === 'no'
      ? 'Det er oppgitt at brukeren ikke kan tilkalle hjelp eller betjene alarm. Manuell alarm må ikke antas egnet.'
      : undefined
  })

  if (!noTechnology && get('recent_fall') === 'yes' && callConcern) suggestions.push({
    id: 'fall-sensor',
    title: 'Fallsensor – behov for nærmere vurdering',
    kind: 'technology',
    reason: 'Fallhendelser kombinert med problemer med å tilkalle hjelp kan gjøre automatisk varsling relevant å undersøke.',
    considerations: ['Vurder begrensninger, falske og uteblitte alarmer.', 'Avklar responstjeneste, brukermedvirkning og om løsningen er tilgjengelig og egnet.'],
    caution: 'En fallsensor forebygger ikke fall og kan ikke garantere varsling ved alle fall.'
  })

  if (!noTechnology && get('night_lighting') === 'yes') suggestions.push({
    id: 'nightlight',
    title: 'Automatisk nattlys',
    kind: 'technology',
    reason: 'Belysning er identifisert som en mulig hindring ved nattlige forflytninger.',
    considerations: ['Vurder montering, strømtilførsel og brukervennlighet.', 'Se tiltaket i sammenheng med øvrig fallforebygging.']
  })

  if (get('night_observation') === 'yes') suggestions.push({
    id: 'night-observation',
    title: noTechnology ? 'Vurdering av nattlig tilsyn' : 'Nattlig tilsyn – fysisk eller eventuelt digitalt',
    kind: 'nontech',
    reason: 'Et konkret mulig behov for nattlig tilsyn er registrert.',
    considerations: [
      'Avklar mål og nødvendighet for tilsynet samt brukerens egne ønsker.',
      'Vurder hva som er faglig forsvarlig, inkludert muligheten for fysisk tilsyn.',
      'Ved digitalt tilsyn: vurder personvern, relevant rettslig grunnlag, beslutningskompetanse, motstand og responstjeneste.'
    ],
    caution: 'Digitalt tilsyn skal ikke innføres automatisk som erstatning for fysiske besøk.'
  })

  if (socialConcern) suggestions.push({
    id: 'social',
    title: 'Ivareta betydningen av hjemmebesøk',
    kind: 'nontech',
    reason: 'Brukeren oppgir at hjemmebesøk er svært viktige for sosial kontakt.',
    considerations: ['Undersøk brukerens ønsker og mulighetene for andre sosiale tilbud.', 'Unngå å erstatte sosialt betydningsfulle besøk uten en individuell vurdering.']
  })

  if (noTechnology && (fallConcern || feelsUnsafe || callConcern)) suggestions.push({
    id: 'human-support',
    title: 'Utforsk tiltak uten ny teknologi',
    kind: 'nontech',
    reason: 'Brukeren ønsker ikke teknologi nå.',
    considerations: ['Drøft praktisk tilrettelegging, eksisterende hjelp og øvrige aktuelle tiltak.', 'Dokumenter brukerens ønsker i virksomhetens godkjente system ved faktisk tjenesteyting.']
  })

  if (technologyAttitude === 'unknown' || technologyAttitude === 'unsure') {
    unknowns.push('Brukerens holdning til teknologi må avklares eller utdypes.')
  }
  if (visitImportance === 'unknown') unknowns.push('Betydningen av sosial kontakt ved hjemmebesøk må avklares.')
  if (get('can_call') !== 'yes' && get('response_ready') !== 'yes' && suggestions.some(s => s.id === 'alarm')) {
    unknowns.push('Alarmering og respons må vurderes konkret før eventuell innføring.')
  }

  return {
    suggestions,
    needs,
    unknowns: [...new Set(unknowns)],
    screeningAnswered: screeningQuestions.filter(q => get(q.id) !== 'unknown').length,
    deepAnswered: deepQuestions.filter(q => get(q.id) !== 'unknown').length,
    screeningTotal: screeningQuestions.length,
    deepTotal: deepQuestions.length,
    noTechnology
  }
}
