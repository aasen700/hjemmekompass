/** Faglig informasjonsbibliotek. Uvalidert prototype, ikke kliniske anbefalinger. */
import { expandedSolutions } from './expandedCatalog'
export type Solution = {
  id: string
  title: string
  group: 'Trygghet' | 'Legemidler' | 'Hverdag' | 'Sosial kontakt' | 'Aktivitet' | 'Digital mestring' | 'Forflytning' | 'Bad og toalett' | 'Personlig stell' | 'Mat og ernæring' | 'Bolig og miljø' | 'Kommunikasjon' | 'Hukommelse og orientering' | 'Digital hjemmeoppfølging'
  kind: 'technology' | 'aid' | 'nontech'
  intro: string
  need: string
  function: string
  before: string[]
  limitations: string[]
  alternatives: string[]
  followUp: string[]
  sourceIds: string[]
  suggestionIds?: string[]
  searchTerms?: string[]
}

export const referenceLinks = [
  { id: 'directorate', title: 'Helsedirektoratet – Velferdsteknologi', url: 'https://www.helsedirektoratet.no/forebygging-diagnose-og-behandling/organisering-og-tjenestetilbud/velferdsteknologi-og-digital-hjemmeoppfolging/velferdsteknologi' },
  { id: 'medication', title: 'Helsetilsynet – Medisindispensere kan gi trygghet når de brukes riktig (2025)', url: 'https://www.helsetilsynet.no/publikasjoner/rapport-fra-helsetilsynet/2025/medisindispensere-trygghet-brukes-riktig/' },
  { id: 'supervision', title: 'Helsetilsynet – Fremtidens omsorg: Innføring av velferdsteknologi (2025)', url: 'https://www.helsetilsynet.no/publikasjoner/tilsynsmeldingen/2025/fremtidens-omsorg-innfoering-velferdsteknologi-kommunene/' },
  { id: 'privacy', title: 'Normen – Informasjonssikkerhet og personvern ved velferdsteknologi', url: 'https://www.helsedirektoratet.no/normen/informasjonssikkerhet-og-personvern-ved-bruk-av-teknologi-i-kommuner-velferdsteknologi/innledning' },
  { id: 'digital-observation', title: 'Helsetilsynet – Vurderinger etter tilsyn med digitalt tilsyn og døralarm', url: 'https://www.helsetilsynet.no/tilsyn/tilsynssaker/2025/rapport-tilsynssak-bruk-digitalt-tilsyn-elektronisk-doeralarm/helsetilsynets-vurderinger?b=toc_1127215' },
  { id: 'overview', title: 'Helsedirektoratet – Rapportering av velferdsteknologi', url: 'https://www.helsedirektoratet.no/veiledere/registrering-av-iplos-data-i-kommunen/rapportering-av-velferdsteknologi' },
  { id: 'reporting', title: 'Helsedirektoratet – Definisjoner og rapportering av velferdsteknologi', url: 'https://www.helsedirektoratet.no/veiledere/registrering-av-iplos-data-i-kommunen/rapportering-av-velferdsteknologi' },
  { id: 'nav-aids', title: 'NAV – Finn hjelpemiddel', url: 'https://finnhjelpemiddel.nav.no/' },
  { id: 'nav-bed', title: 'NAV – Senger, madrasser, tilbehør og forflytning', url: 'https://www.nav.no/senger-og-madrasser' },
  { id: 'nav-doff', title: 'NAV – Strømpepåtrekker Doff NDonner', url: 'https://finnhjelpemiddel.nav.no/produkt/6e53fe99-5b81-469d-b628-c43ff9fea55b' },
  { id: 'sister', title: 'NAV – Bruksanvisning søsterhjelp / løftebøyle', url: 'https://finnhjelpemiddel.nav.no/imageproxy/file/brugsvejl/65464.pdf' },
  { id: 'digital-health', title: 'Helsedirektoratet – Digital hjemmeoppfølging', url: 'https://www.helsedirektoratet.no/forebygging-diagnose-og-behandling/organisering-og-tjenestetilbud/velferdsteknologi-og-digital-hjemmeoppfolging' }
] as const

const coreSolutions: Solution[] = [
  {
    id: 'alarm', title: 'Digital trygghetsalarm', group: 'Trygghet', kind: 'technology',
    intro: 'Varslingsløsning som kan gjøre det mulig å be om hjelp fra hjemmet.',
    need: 'Kan utforskes ved utrygghet eller vansker med å komme i kontakt med hjelp når det trengs.',
    function: 'Brukeren aktiverer en alarm, og et avtalt mottak følger opp. Ulike løsninger har ulik rekkevidde, funksjon og krav til infrastruktur.',
    before: ['Kan brukeren forstå, finne og betjene alarmen?', 'Er dekning og tilgjengelighet dokumentert i aktuelle rom og situasjoner?', 'Hvem tar imot, vurderer og responderer på varselet?', 'Hvordan sikres informasjon, opplæring og plan ved teknisk svikt?'],
    limitations: ['Manuell aktivering er ikke egnet hvis brukeren ikke kan utløse alarmen i aktuelle hendelser.', 'En alarm forebygger ikke fall eller andre hendelser.', 'Responstid og faktisk hjelpeberedskap kan ikke antas uten lokal avklaring.'],
    alternatives: ['Fallforebygging og boligtilpasning', 'Praktisk bistand og fysiske besøk', 'Automatisk varsling etter nærmere vurdering'],
    followUp: ['Avtal prøvebruk og dokumenterte varslingstester.', 'Avklar ansvar for funksjonskontroll og oppfølging av hendelser.'],
    sourceIds: ['directorate','supervision'], suggestionIds: ['alarm']
  },
  {
    id: 'fall-sensor', title: 'Fallsensor', group: 'Trygghet', kind: 'technology',
    intro: 'Sensor som forsøker å registrere fallhendelser og kan sende varsel.',
    need: 'Kan vurderes dersom fall er et problem og brukeren har vansker med å be om hjelp.',
    function: 'Avhengig av teknologien vurderes bevegelse, kroppsstilling eller andre signaler mot en forhåndsdefinert hendelse.',
    before: ['Er brukeren kjent med hva sensoren registrerer og ikke registrerer?', 'Er varsler, responstjeneste og nødvendig reserveprosedyre avklart?', 'Passer teknologiens funksjon til brukerens aktivitet og situasjon?'],
    limitations: ['Ikke alle fall blir registrert, og falske alarmer kan forekomme.', 'Fallsensor er ikke i seg selv et fallforebyggende tiltak.', 'Sensorer og varsling må vurderes opp mot personvern og relevant regelverk.'],
    alternatives: ['Fallforebygging og ergoterapi', 'Trygghetsalarm dersom den kan betjenes', 'Tilrettelagt bolig og fysiske tjenester'],
    followUp: ['Test og evaluer i den faktiske brukssituasjonen etter lokal prosedyre.', 'Undersøk om varsler følges opp og om løsningens egnethet endres over tid.'],
    sourceIds: ['directorate','supervision','privacy'], suggestionIds: ['fall-sensor']
  },
  {
    id: 'nightlight', title: 'Automatisk nattlys', group: 'Trygghet', kind: 'technology',
    intro: 'Lys som aktiveres ved bevegelse eller etter et bestemt tidsmønster.',
    need: 'Kan være relevant dersom dårlig belysning bidrar til utfordringer ved nattlig forflytning.',
    function: 'Sensor eller timer aktiverer belysning i korridor, ved seng eller langs vanlige ganglinjer.',
    before: ['Hvor oppstår utryggheten, og hva er årsaken?', 'Kan lyset plasseres uten å skape blending eller nye hindringer?', 'Er strømforsyning, drift og vedlikehold avklart?'],
    limitations: ['Lys alene løser ikke fallrisiko knyttet til sykdom, svimmelhet eller funksjonssvikt.', 'Uheldig montering og kabler kan skape nye hindringer.'],
    alternatives: ['Fast tilpasset belysning', 'Fjerning av terskler og løse tepper', 'Ergoterapeutisk boligvurdering'],
    followUp: ['Spør brukeren om tiltaket oppleves nyttig og trygt.', 'Vurder helheten i nattlige rutiner.'],
    sourceIds: ['directorate'], suggestionIds: ['nightlight','light']
  },
  {
    id: 'night-observation', title: 'Digitalt tilsyn', group: 'Trygghet', kind: 'technology',
    intro: 'Teknologi som kan formidle informasjon eller varsler fra hjemmet, for eksempel sensorer eller kamera.',
    need: 'Kun aktuelt å utrede når det foreligger et konkret identifisert tilsynsbehov.',
    function: 'Ulike typer sensorer eller avtalte kameraobservasjoner kan utløse informasjon eller varsler. Løsningens omfang varierer.',
    before: ['Hva er formålet og hvorfor vurderes digitalt tilsyn fremfor andre løsninger?', 'Hva ønsker brukeren, og hvilke rettslige og etiske forhold må vurderes?', 'Hvem skal følge med, respondere og sikre drift/varsling?', 'Hvordan ivaretas privatliv, sikkerhet og forholdet til fysisk menneskelig kontakt?'],
    limitations: ['Teknologien garanterer ikke oppdagelse av kritiske hendelser.', 'Feil oppsett og manglende oppfølging kan gi alvorlig svikt.', 'Kan være inngripende; må ikke tas i bruk ut fra en generell avkrysning i kartleggingen.'],
    alternatives: ['Individuelt tilpassede fysiske tilsyn', 'Tiltak rettet mot årsaken til utryggheten', 'Tilrettelegging av miljø og rutiner'],
    followUp: ['Gjennomfør lokal risikovurdering og test av hele varslingskjeden.', 'Avtal evaluering med brukeren og ansvarlig tjeneste.'],
    sourceIds: ['privacy','digital-observation','supervision'], suggestionIds: ['night-observation']
  },
  {
    id: 'dispenser', title: 'Elektronisk medisindispenser', group: 'Legemidler', kind: 'technology',
    intro: 'Løsning som kan bidra med tidsbestemt utlevering og eventuelt påminnelser ved legemiddelhåndtering.',
    need: 'Kan utforskes når brukeren har behov for støtte til legemiddelrutiner, dersom løsningen er egnet.',
    function: 'Et system kan gjøre planlagte doser tilgjengelige og gi signaler om at de skal tas. Varslingsmuligheter avhenger av løsning og oppsett.',
    before: ['Kan brukeren forstå og reagere på varsler og håndtere utstyret?', 'Er egnethet vurdert av ansvarlig helsepersonell?', 'Hvem har ansvar for påfyll, kontroll, legemiddelendringer og uteblitte doser?', 'Finnes rutiner ved feil, strømbrudd og manglende utlevering?'],
    limitations: ['Dispenseren bekrefter ikke alltid at legemidlet faktisk blir tatt.', 'Løsningen fritar ikke kommunen for ansvar for egnethetsvurdering og oppfølging.', 'Faglige legemiddelbeslutninger må ikke tas av dette støtteverktøyet.'],
    alternatives: ['Gjennomgang av legemiddelrutiner', 'Ordinær hjelp til legemiddelhåndtering', 'Enkle påminnelser der det er tilstrekkelig'],
    followUp: ['Planlegg opplæring og vurdering av faktisk mestring.', 'Evaluer jevnlig om løsningen fortsatt er egnet og trygg.'],
    sourceIds: ['medication','supervision'], suggestionIds: ['dispenser','med-review']
  },
  {
    id: 'reminders', title: 'Påminnelser om legemidler og rutiner', group: 'Legemidler', kind: 'technology',
    intro: 'Enkle digitale signaler eller beskjeder knyttet til avtalte hverdagsoppgaver.',
    need: 'Kan undersøkes ved et avgrenset påminnelsesbehov.',
    function: 'Lyd, lys eller tekst presenterer en påminnelse til bestemt tid.',
    before: ['Kan brukeren oppfatte, forstå og følge påminnelsen?', 'Er det tilstrekkelig med påminnelse, eller trengs hjelp til selve oppgaven?', 'Hvem vedlikeholder innholdet og sikrer riktig informasjon?'],
    limitations: ['En påminnelse erstatter ikke forsvarlig legemiddelhåndtering.', 'Varsel alene dokumenterer ikke at oppgaven er gjennomført.'],
    alternatives: ['Ikke-digitale rutiner og merkede oversikter', 'Eksisterende tjenester og praktisk oppfølging'],
    followUp: ['Vurder om løsningen oppleves nyttig og forståelig.', 'Følg med på endrede behov.'],
    sourceIds: ['directorate','medication'], suggestionIds: ['routine-prompts']
  },
  {
    id: 'calendar', title: 'Digital kalender og påminnelsesskjerm', group: 'Hverdag', kind: 'technology',
    intro: 'Oversikt over avtaler, oppgaver og aktiviteter med tekst, bilder eller varsler.',
    need: 'Kan være relevant når brukeren ønsker støtte til avtaler og dagsstruktur.',
    function: 'Viser informasjon visuelt eller med påminnelser på skjerm eller enhet.',
    before: ['Kan brukeren oppfatte og forstå informasjonen?', 'Er oppsett og brukergrensesnitt tilpasset syn, hørsel og erfaring?', 'Hvem oppdaterer innhold og avtaler?'],
    limitations: ['Kan bli uoversiktlig hvis den ikke vedlikeholdes.', 'Er ikke nødvendigvis egnet ved store utfordringer med forståelse eller oppfølging.'],
    alternatives: ['Papirkalender og tydelig dagsplan', 'Personlig støtte og faste rutiner'],
    followUp: ['Evaluer om påminnelsene blir forstått og benyttet.', 'Juster mengde og form på informasjon.'],
    sourceIds: ['directorate'], suggestionIds: ['calendar','memory-routines']
  },
  {
    id: 'daily-plan', title: 'Digital dagsplan', group: 'Hverdag', kind: 'technology',
    intro: 'Visuell struktur som kan støtte gjennomføring av daglige rutiner.',
    need: 'Kan være nyttig ved ønske om mer forutsigbarhet i hverdagen.',
    function: 'En skjerm eller applikasjon viser aktiviteter trinnvis eller etter tidsplan.',
    before: ['Ønsker brukeren en slik oversikt?', 'Kan vedkommende forstå og følge instruksjoner?', 'Hvordan vedlikeholdes og oppdateres planen?'],
    limitations: ['En dagsplan erstatter ikke nødvendige tjenester eller praktisk hjelp.', 'For mye informasjon kan skape stress eller forvirring.'],
    alternatives: ['Forenklede faste rutiner', 'Papirbasert dagsplan', 'Personlig veiledning'],
    followUp: ['Undersøk om planen faktisk støtter mestring.', 'Juster ved endringer i funksjon og ønsker.'],
    sourceIds: ['directorate'], suggestionIds: ['routine-prompts']
  },
  {
    id: 'video-calls', title: 'Enkle videosamtaler', group: 'Sosial kontakt', kind: 'technology',
    intro: 'Enkel videokommunikasjon med personer brukeren selv ønsker kontakt med.',
    need: 'Kan støtte sosial kontakt når brukeren ønsker det og har noen å kontakte.',
    function: 'Skjerm og lyd gir mulighet for samtale over nett, eventuelt med forenklet betjening.',
    before: ['Ønsker brukeren digital kontakt?', 'Finnes et reelt nettverk og noen å ringe?', 'Kan løsningen brukes selvstendig eller med opplæring?', 'Hvordan ivaretas privatliv og trygg bruk?'],
    limitations: ['Digital kontakt er ikke det samme som fysisk samvær.', 'Ingen effekt hvis det ikke finnes tilgjengelige samtalepartnere.'],
    alternatives: ['Besøksordning eller aktivitetstilbud', 'Fysiske møter og telefonkontakt', 'Tiltak for å opprettholde betydningsfulle hjemmebesøk'],
    followUp: ['Spør om kontaktformen gir ønsket sosial verdi.', 'Tilpass løsning og opplæring.'],
    sourceIds: ['directorate'], suggestionIds: ['video-calls','social-activities']
  },
  {
    id: 'meal-reminders', title: 'Måltidspåminnelser', group: 'Hverdag', kind: 'technology',
    intro: 'Digitale beskjeder om planlagte måltider og drikke.',
    need: 'Kan utforskes når glemte måltider er en del av utfordringen.',
    function: 'Systemet gir varsel eller viser en enkel måltidsplan.',
    before: ['Har brukeren mat og drikke tilgjengelig?', 'Kan brukeren forstå og handle på påminnelsen?', 'Er det tegn til ernæringsmessig risiko som krever faglig oppfølging?'],
    limitations: ['Varsler alene sikrer ikke tilstrekkelig matinntak.', 'Ernæringsmessig risiko krever ordinær vurdering og oppfølging.'],
    alternatives: ['Matlevering og praktisk mattilrettelegging', 'Ordinær ernæringskartlegging og oppfølging'],
    followUp: ['Evaluer om påminnelser bidrar til måltidsrutiner.', 'Følg opp endringer i behov gjennom tjenesten.'],
    sourceIds: ['directorate'], suggestionIds: ['meal-reminders','nutrition-support']
  },
  {
    id: 'smart-home', title: 'Enkle smarthusfunksjoner', group: 'Hverdag', kind: 'technology',
    intro: 'Automatisering av for eksempel lys og praktiske funksjoner i boligen.',
    need: 'Kan være relevant ved behov for enklere betjening eller orientering hjemme.',
    function: 'Sensorer, brytere eller tidsstyring kan aktivere utvalgte funksjoner.',
    before: ['Hvilken konkret hverdagsutfordring løser funksjonen?', 'Er installasjonen trygg og lett å forstå?', 'Finnes manuell reserve ved feil?'],
    limitations: ['Ikke all forbrukerteknologi er egnet til tjenester som krever høy pålitelighet.', 'Kan skape økt teknisk avhengighet og vedlikeholdsbehov.'],
    alternatives: ['Enklere brytere, tilpasning av boligen og praktisk hjelp', 'Fast belysning og fjerning av barrierer'],
    followUp: ['Undersøk pålitelighet og brukerens mestring.', 'Avklar hvem som bistår ved feil.'],
    sourceIds: ['directorate','privacy'], suggestionIds: ['nightlight']
  },
  {
    id: 'fall-prevention', title: 'Fallforebygging og boligtilpasning', group: 'Trygghet', kind: 'nontech',
    intro: 'Individuell vurdering av aktiviteter, boligforhold og tiltak som kan redusere fallproblematikk.',
    need: 'Aktuelt å undersøke ved fall, nestenfall eller uttrykt utrygghet.',
    function: 'Kartlegging kan gi grunnlag for målrettet tilrettelegging, hjelpemidler, veiledning eller videre faglig oppfølging.',
    before: ['Hvor, når og hvorfor oppstår utfordringene?', 'Hvilke tiltak ønsker brukeren selv?', 'Hvem har nødvendig kompetanse til videre vurdering?'],
    limitations: ['Tiltak må tilpasses den enkelte; generelle råd er ikke nok til en klinisk risikovurdering.'],
    alternatives: ['Trygghetsalarm som supplement ved egnethet', 'Tilpasset belysning og tryggere rutiner'],
    followUp: ['Evaluer funksjon og opplevd trygghet.', 'Gjenta vurdering ved endret situasjon.'],
    sourceIds: ['directorate'], suggestionIds: ['fall-prevention','activity-support']
  },
  {
    id: 'selfcare-aids', title: 'Praktiske hjelpemidler og tilrettelegging', group: 'Aktivitet', kind: 'nontech',
    intro: 'Tilpasning av miljø og oppgaver for å støtte personlig stell og egenmestring.',
    need: 'Kan være aktuelt hvis brukeren ønsker å mestre daglige rutiner med mindre hjelp.',
    function: 'Enklere redskaper, ergonomisk tilrettelegging og opplæring kan støtte gjennomføring.',
    before: ['Hva mestrer brukeren selv og hva ønsker vedkommende å oppnå?', 'Er bolig og utstyr tilpasset?', 'Er en ergoterapivurdering relevant?'],
    limitations: ['Hjelpemidler må ikke brukes som begrunnelse for å unnlate nødvendig hjelp.', 'Tiltak må prøves ut og tilpasses.'],
    alternatives: ['Praktisk bistand', 'Veiledning og faste rutiner'],
    followUp: ['Vurder mestring og trivsel etter endringen.'],
    sourceIds: ['directorate'], suggestionIds: ['selfcare-aids','activity-support']
  },
  {
    id: 'nutrition-support', title: 'Måltidsstøtte og ernæringsfaglig oppfølging', group: 'Hverdag', kind: 'nontech',
    intro: 'Vurdering av behov for støtte til mat, måltider og ernæring.',
    need: 'Relevant når mattilgang, måltider eller matinntak er utfordrende.',
    function: 'Kan innebære praktisk tilrettelegging, matlevering og videre ernæringsfaglig vurdering.',
    before: ['Hva er utfordringen og hva ønsker brukeren?', 'Finnes det tegn til ernæringsmessig risiko?', 'Er ordinær kartlegging og videre oppfølging nødvendig?'],
    limitations: ['Påminnelser alene erstatter ikke ernæringsfaglig oppfølging.', 'Prototypen gjennomfører ingen risikovurdering for underernæring.'],
    alternatives: ['Tilpasset måltidsrutine', 'Måltidspåminnelser som mulig supplement'],
    followUp: ['Følg tjenestens rutiner for evaluering og oppfølging.'],
    sourceIds: ['directorate'], suggestionIds: ['nutrition-support']
  },
  {
    id: 'social-activities', title: 'Fysisk sosial kontakt og aktivitet', group: 'Sosial kontakt', kind: 'nontech',
    intro: 'Tiltak som kan støtte tilhørighet, samtaler og deltakelse på brukerens premisser.',
    need: 'Relevant ved ønske om mer sosial kontakt eller når hjemmebesøk betyr mye.',
    function: 'Kan innebære møteplasser, besøk, telefonkontakt eller andre individuelt passende aktiviteter.',
    before: ['Hva ønsker brukeren, og med hvem?', 'Hva hindrer deltakelse?', 'Hvordan påvirker eventuelle endringer i tjenesten sosial kontakt?'],
    limitations: ['Et stort nettverk betyr ikke nødvendigvis at brukeren opplever tilstrekkelig kontakt.', 'Digital kontakt kan ikke ukritisk erstatte ønsket fysisk samvær.'],
    alternatives: ['Videosamtaler dersom brukeren ønsker det', 'Tilpassede besøksordninger og nærmiljøtilbud'],
    followUp: ['Spør om kontakt og deltakelse oppleves meningsfull.'],
    sourceIds: ['directorate'], suggestionIds: ['social-activities','social-visits']
  },
  {
    id: 'digital-training', title: 'Opplæring og digital mestring', group: 'Digital mestring', kind: 'nontech',
    intro: 'Individuelt tilpasset opplæring og støtte ved bruk av digitale hjelpemidler.',
    need: 'Relevant når teknologien er interessant, men brukerens forutsetninger er uavklarte.',
    function: 'Praktisk gjennomgang og utprøving av relevant løsning med støtte etter behov.',
    before: ['Hva ønsker brukeren å lære?', 'Hva påvirkes av syn, hørsel, håndfunksjon eller erfaring?', 'Hvem kan gi opplæring og hjelpe ved feil?'],
    limitations: ['Opplæring sikrer ikke at alle teknologier er egnet.', 'Skal ikke brukes til å presse frem løsninger brukeren ikke ønsker.'],
    alternatives: ['Enklere grensesnitt', 'Ikke-digitale alternativer', 'Individuell praktisk bistand'],
    followUp: ['Evaluer reell mestring og behov for videre støtte.'],
    sourceIds: ['directorate','supervision'], suggestionIds: ['digital-training']
  },
  {
    id: 'clinical-med-review', title: 'Faglig gjennomgang av legemiddelhåndtering', group: 'Legemidler', kind: 'nontech',
    intro: 'Kartlegging og oppfølging av legemiddelhåndtering innenfor etablert faglig ansvar.',
    need: 'Aktuelt når dagens rutiner eller mestring gir bekymring.',
    function: 'Ansvarlig helsepersonell gjennomgår utfordringene, ansvarsforhold og relevante prosedyrer.',
    before: ['Hva skjer i dag og hvor oppstår utfordringen?', 'Hvem har ansvar for forskrivning, tilrettelegging og administrering?', 'Kreves praktisk hjelp eller tiltak utover påminnelser?'],
    limitations: ['Dette støtteverktøyet kan ikke endre doser, forskrivning eller delegasjon.'],
    alternatives: ['Tilpasset praktisk oppfølging', 'Elektronisk dispenser først etter egnethetsvurdering'],
    followUp: ['Dokumenter og følg opp etter virksomhetens godkjente rutiner.'],
    sourceIds: ['medication'], suggestionIds: ['med-review']
  }
]

export const solutions: Solution[] = [...coreSolutions, ...expandedSolutions]

export const findSolutionForSuggestion = (suggestionId: string) =>
  solutions.find(s => s.suggestionIds?.includes(suggestionId))
