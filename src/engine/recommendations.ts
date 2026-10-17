import { allQuestions, moduleById, suggestedDeepQuestions } from '../data/modules'
import type { Answers } from '../data/assessment'

export type Suggestion = {
  id: string
  title: string
  kind: 'technology' | 'nontech'
  reason: string
  considerations: string[]
  caution?: string
}
export type Coverage = { id: string; title: string; screeningAnswered: number; screeningTotal: number; deepAnswered: number; deepTotal: number; reviewedDeep: boolean }
export type AssessmentResult = {
  suggestions: Suggestion[]
  needs: string[]
  unknowns: string[]
  screeningAnswered: number
  screeningTotal: number
  deepAnswered: number
  deepTotal: number
  coverage: Coverage[]
  noTechnology: boolean
}

/** Explicit answers only. Unknown/unanswered is never treated as "no" or as an indication. */
export function makeAssessment(answers: Answers, technologyAttitude: string, visitImportance: string, selectedTopics: string[] = ['fall'], expandedTopics: string[] = []): AssessmentResult {
  const get = (id: string) => answers[id] ?? 'unknown'
  const yes = (id: string) => get(id) === 'yes'
  const challenged = (id: string) => ['no', 'partly'].includes(get(id))
  const noTechnology = technologyAttitude === 'no'
  const suggestions: Suggestion[] = []
  const needs: string[] = []
  const unknowns: string[] = []
  const topics = [...new Set(selectedTopics)].filter(id => !!moduleById[id])
  const has = (id: string) => topics.includes(id)
  const add = (s: Suggestion) => { if (!suggestions.some(x => x.id === s.id)) suggestions.push(s) }
  const tech = (s: Suggestion) => { if (!noTechnology) add(s) }
  const coverage: Coverage[] = topics.map(id => {
    const m = moduleById[id]
    const screeningAnswered = m.screening.filter(q => get(q.id) !== 'unknown').length
    const deepAnswered = m.deep.filter(q => get(q.id) !== 'unknown').length
    for (const q of m.screening) if (get(q.id) === 'unknown') unknowns.push(q.title)
    if (expandedTopics.includes(id)) for (const q of suggestedDeepQuestions(m, answers)) {
      if (get(q.id) === 'unknown') unknowns.push(q.title)
    }
    return { id, title: m.title, screeningAnswered, screeningTotal: m.screening.length, deepAnswered, deepTotal: m.deep.length, reviewedDeep: expandedTopics.includes(id) }
  })

  if (has('fall')) {
    const fallConcern = yes('recent_fall') || yes('mobility') || yes('obstacles')
    const feelsUnsafe = challenged('feels_safe')
    const callConcern = challenged('can_call')
    if (fallConcern) needs.push('Fall, nestenfall eller utfordringer med forflytning')
    if (feelsUnsafe) needs.push('Opplevd utrygghet hjemme')
    if (callConcern) needs.push('Vansker med å tilkalle hjelp')
    if (yes('night_fear')) needs.push('Utrygghet om natten')
    if (fallConcern || feelsUnsafe) add({
      id: 'fall-prevention', title: 'Fallforebygging og tilrettelegging', kind: 'nontech',
      reason: 'Kartleggingen beskriver fallrelaterte utfordringer eller utrygghet.',
      considerations: ['Vurder årsaker til fall, funksjon og behov for videre kartlegging.', 'Undersøk bolig, praktiske hjelpemidler og eventuell ergoterapi eller fysioterapi.']
    })
    if (yes('night_fear') || yes('night_lighting')) add({
      id: 'light', title: 'Trygg nattlig ferdsel og belysning', kind: 'nontech',
      reason: 'Brukeren har oppgitt nattlig utrygghet eller utilstrekkelig belysning.',
      considerations: ['Undersøk hva utryggheten skyldes, ønskede tiltak og nattlige forflytninger.']
    })
    if (feelsUnsafe || callConcern || yes('recent_fall')) tech({
      id: 'alarm', title: 'Digital trygghetsalarm', kind: 'technology',
      reason: 'Alarmering kan være relevant å utforske ved utrygghet, fall eller vansker med å få hjelp.',
      considerations: ['Kan brukeren forstå, nå og utløse alarmen?', 'Hvem mottar varsler og responderer?', 'Hva skjer ved teknisk svikt?'],
      caution: get('can_call') === 'no' || get('alarm_usable') === 'no'
        ? 'Mulig manglende evne til å betjene alarmen. Manuell trygghetsalarm må ikke antas egnet.'
        : 'Alarmeringsfunksjon og responstjeneste er ikke automatisk verifisert.'
    })
    if (yes('recent_fall') && callConcern) tech({
      id: 'fall-sensor', title: 'Fallsensor – nærmere vurdering', kind: 'technology',
      reason: 'Fall kombinert med problemer med å tilkalle hjelp kan gi grunn til å undersøke automatisk varsling.',
      considerations: ['Undersøk feilvarsler, uteblitte varsler og responstjeneste.', 'Avklar brukerens ønsker, personvern og lokal tilgjengelighet.'],
      caution: 'En fallsensor forebygger ikke fall og registrerer ikke nødvendigvis alle fall.'
    })
    if (yes('night_lighting')) tech({
      id: 'nightlight', title: 'Automatisk nattlys', kind: 'technology',
      reason: 'Mangelfull belysning ved nattlig forflytning er oppgitt.',
      considerations: ['Vurder plassering, stabil funksjon, strøm og samlet fallforebygging.']
    })
    if (yes('night_observation')) add({
      id: 'night-observation', title: 'Nattlig tilsyn – videre faglig vurdering', kind: 'nontech',
      reason: 'Et mulig konkret behov for nattlig tilsyn er oppgitt.',
      considerations: ['Avklar formål, behov og brukerens ønsker.', 'Vurder fysisk tilsyn og konsekvenser for sosial kontakt.', 'Ved vurdering av digitalt tilsyn: avklar rettslig grunnlag, beslutningskompetanse, eventuelt motstand, personvern og responstjeneste.'],
      caution: 'Digitalt tilsyn kan ikke automatisk erstatte fysiske besøk.'
    })
    if (callConcern && !yes('response_ready')) unknowns.push('Ansvar for varsling og respons må avklares før eventuell innføring.')
  }

  if (has('meds') && (yes('meds_manage') || challenged('meds_support'))) {
    needs.push('Utfordringer med legemiddelrutiner eller eksisterende hjelp')
    add({
      id: 'med-review', title: 'Faglig gjennomgang av legemiddelhåndtering', kind: 'nontech',
      reason: 'Brukeren beskriver utfordringer med legemidler eller eksisterende støtte.',
      considerations: ['Avklar faktisk utfordring og hvem som har ansvar for legemiddelhåndteringen.', 'Bruk gjeldende lokale prosedyrer og ordinær faglig oppfølging.'],
      caution: 'Verktøyet skal ikke brukes til å endre doser, forskrivning eller ansvarsforhold.'
    })
    if (yes('meds_manage') || yes('meds_reminders')) tech({
      id: 'dispenser', title: 'Elektronisk medisindispenser – aktuell for vurdering', kind: 'technology',
      reason: 'Vansker med å huske eller håndtere legemidler kan gjøre en dispenser relevant å undersøke.',
      considerations: ['Kan brukeren forstå varsler og håndtere utstyret?', 'Hvem fyller på, følger opp uteblitte doser og håndterer tekniske avvik?', 'Vurder egnethet sammen med ansvarlig helsepersonell.'],
      caution: challenged('meds_understand') || challenged('meds_physical') ? 'Det er registrert mulige barrierer for selvstendig bruk. Egnethet må undersøkes særskilt.' : 'Ingen klinisk egnethetsvurdering er utført.'
    })
  }

  if (has('selfcare') && (yes('selfcare_difficulty') || challenged('selfcare_goals'))) {
    needs.push('Vansker eller udekkede ønsker knyttet til personlig stell')
    add({ id: 'selfcare-aids', title: 'Tilrettelegging og praktiske hjelpemidler', kind: 'nontech',
      reason: 'Brukeren beskriver utfordringer med personlig stell.',
      considerations: ['Avklar hvilke oppgaver brukeren ønsker å mestre selv.', 'Vurder hjelpemidler og eventuelt ergoterapi, boligtilpasning og praktisk bistand.'] })
    if (yes('selfcare_cues')) tech({ id: 'routine-prompts', title: 'Enkle påminnelser for daglige rutiner', kind: 'technology',
      reason: 'Påminnelser er identifisert som en mulig støtte.',
      considerations: ['Undersøk om brukeren forstår meldinger og ønsker løsningen.', 'Vurder ikke-digitale rutiner som alternativ.'] })
  }

  if (has('nutrition') && (yes('nutrition_difficulty') || challenged('nutrition_routine'))) {
    needs.push('Utfordringer knyttet til måltider eller ernæring')
    add({ id: 'nutrition-support', title: 'Måltidsstøtte og ernæringsfaglig vurdering', kind: 'nontech',
      reason: 'Kartleggingen viser utfordringer med matlaging, matinntak eller måltidsrutiner.',
      considerations: ['Avklar om det er behov for ordinær ernæringskartlegging eller videre vurdering.', 'Undersøk mattilgang, tilberedning, praktisk bistand og brukerens preferanser.'],
      caution: yes('nutrition_concern') ? 'Mulig ernæringsmessig risiko er oppgitt; vurder oppfølging etter gjeldende rutiner, ikke ut fra denne prototypen alene.' : undefined })
    if (yes('nutrition_remind')) tech({ id: 'meal-reminders', title: 'Måltidspåminnelser', kind: 'technology',
      reason: 'Glemte måltider eller behov for påminnelser er oppgitt.',
      considerations: ['Vurder om påminnelser faktisk kan følges og om de er tilstrekkelige.', 'Undersøk ikke-digitale alternativer og eksisterende hjelp.'] })
  }

  if (has('memory') && (yes('memory_difficulty') || yes('memory_orientation'))) {
    needs.push('Behov for støtte til avtaler, orientering eller dagsstruktur')
    add({ id: 'memory-routines', title: 'Tilpasset dagsstruktur og støtte', kind: 'nontech',
      reason: 'Brukeren beskriver utfordringer med hukommelse eller orientering.',
      considerations: ['Utforsk brukerens mål og hvilke rutiner som allerede fungerer.', 'Vurder behov for ordinær faglig kartlegging og tilpasset informasjon.'] })
    if (get('memory_messages') !== 'no') tech({
      id: 'calendar', title: 'Digital kalender eller påminnelsesskjerm', kind: 'technology',
      reason: 'Påminnelser eller dagsstruktur kan være et område å utforske.',
      considerations: ['Kan brukeren oppfatte, forstå og følge meldinger?', 'Vurder syn, hørsel, opplæring og brukerens ønsker.'],
      caution: get('memory_messages') === 'unknown' ? 'Evne til å forstå og bruke påminnelser er ikke avklart.' : undefined
    })
  }

  if (has('social') && (challenged('social_enough') || yes('social_more'))) {
    needs.push('Ønske om eller behov for mer sosial kontakt')
    add({ id: 'social-activities', title: 'Sosiale og fysiske kontaktmuligheter', kind: 'nontech',
      reason: 'Brukeren ønsker mer kontakt eller opplever utilstrekkelig sosial deltakelse.',
      considerations: ['Avklar hvem og hvordan brukeren ønsker kontakt med.', 'Utforsk aktivitetstilbud, besøksordninger og betydningen av eksisterende hjemmebesøk.'] })
    if (yes('social_video')) tech({
      id: 'video-calls', title: 'Enkel løsning for videosamtaler', kind: 'technology',
      reason: 'Brukeren har oppgitt interesse for digital kontakt.',
      considerations: ['Har brukeren noen å kontakte?', 'Vurder digital mestring, opplæring og tilgjengelig utstyr.', 'Digital kontakt skal ikke ukritisk erstatte ønskede fysiske besøk.']
    })
  }

  if (has('activity') && (yes('activity_difficulty') || yes('activity_wishes'))) {
    needs.push('Ønske om økt mobilitet eller deltakelse i aktiviteter')
    add({ id: 'activity-support', title: 'Aktivitetsstøtte, hjelpemidler og tilrettelegging', kind: 'nontech',
      reason: 'Brukeren beskriver funksjonelle utfordringer eller ønske om å mestre mer.',
      considerations: ['Undersøk hvilke aktiviteter som er viktige for brukeren.', 'Vurder behov for ergonomiske hjelpemidler, boligtilpasning, fysioterapi eller ergoterapi.'] })
  }

  if (has('digital') && (yes('digital_support') || challenged('digital_experience'))) {
    needs.push('Behov for støtte til digital mestring')
    add({ id: 'digital-training', title: 'Tilpasset digital opplæring eller alternative løsninger', kind: 'nontech',
      reason: 'Brukeren kan ha behov for opplæring, støtte eller enklere alternativer.',
      considerations: ['Kartlegg syn, hørsel, håndfunksjon, utstyr og erfaring.', 'Avklar hvem som kan gi opplæring og oppfølging.', 'Tilby ikke-digitale alternativer ved behov.'] })
  }

  if (visitImportance === 'very') add({
    id: 'social-visits', title: 'Ivareta sosial betydning av hjemmebesøk', kind: 'nontech',
    reason: 'Brukeren opplever hjemmebesøk som en vesentlig del av sin sosiale kontakt.',
    considerations: ['Undersøk hvordan eventuelle endringer påvirker livskvalitet og deltakelse.', 'Ikke anta at kontakt kan erstattes av teknologi.']
  })
  if (noTechnology && needs.length) add({
    id: 'non-digital-preferences', title: 'Utforsk tiltak uten ny teknologi', kind: 'nontech',
    reason: 'Brukeren ønsker ikke å innføre teknologi nå.',
    considerations: ['Respekter og utforsk brukerens ønsker.', 'Vurder tilgjengelige ikke-teknologiske tiltak og nødvendig videre faglig vurdering.']
  })
  if (technologyAttitude === 'unknown' || technologyAttitude === 'unsure') unknowns.push('Brukerens ønsker knyttet til teknologi må avklares eller utdypes.')
  if (visitImportance === 'unknown') unknowns.push('Betydningen av hjemmebesøk for sosial kontakt må avklares.')
  if (topics.length === 0) unknowns.push('Ingen kartleggingsområder er valgt.')

  // Do not retain data for unselected modules, even if answers are present in memory.
  const ids = new Set(topics.flatMap(id => [...moduleById[id].screening, ...moduleById[id].deep].map(q => q.id)))
  const screeningTotal = coverage.reduce((n,c)=>n+c.screeningTotal,0)
  const deepTotal = coverage.reduce((n,c)=>n+c.deepTotal,0)
  return {
    suggestions, needs: [...new Set(needs)], unknowns: [...new Set(unknowns)],
    screeningAnswered: allQuestions.filter(q => ids.has(q.id) && topics.some(id=>moduleById[id].screening.includes(q)) && get(q.id) !== 'unknown').length,
    deepAnswered: allQuestions.filter(q => ids.has(q.id) && topics.some(id=>moduleById[id].deep.includes(q)) && get(q.id) !== 'unknown').length,
    screeningTotal, deepTotal, coverage, noTechnology
  }
}
