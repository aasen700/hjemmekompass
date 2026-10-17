# HjemmeKompass

**Prototype v0.5 – fiktive caser, ikke klinisk validert eller juridisk godkjent.**

Personsentrert kartlegging og regelbasert beslutningsstøtte for ansatte i hjemmesykepleien. Mobil først.

## Kjør lokalt

Krever Node.js 20+.

~~~bash
npm install
npm run dev
npm run test
npm run build
~~~

## Funksjoner

- Åtte kartleggingsområder og flere konkrete fordypningsspørsmål om funksjon, trygghet, medisiner, ernæring, stell, aktivitet, sosiale ønsker og digital mestring.
- Brukerens mål, ressurser, holdning til teknologi og betydningen av sosial kontakt.
- **Tilpasset beslutningsstøtte:** 87 biblioteksoppslag er ikke 87 forslag. Kun svar som er eksplisitt registrert og er relevante for valgte områder, kan aktivere en regel.
- Regler angir hvilke svar som er grunnlaget for et mulig tiltak, hvilke forutsetninger som må kontrolleres, og om særskilt faglig vurdering er nødvendig.
- Kjente negative forutsetninger kan sperre for uegnede teknologiforslag. «Ønsker ikke teknologi» gjør at ingen teknologiske løsninger foreslås.
- Fordypningssvar som ikke lenger stemmer med grunnsvar, blir ikke brukt som grunnlag for forslag uten videre avklaring.
- Resultatet viser inntil seks tiltak av gangen med mulighet til å vise flere **faktisk begrunnede** alternativer. Maks to per konkret behov.
- Søkbart bibliotek med **87 oppslag**: velferdsteknologi, praktiske hjelpemidler, ikke-teknologiske tiltak, avklaringspunkter, begrensninger, alternativer og lenker til offentlig fagstoff.
- Egen side for faglig og juridisk grunnlag, med lenker til Helsedirektoratet, Helsetilsynet og Normen.
- Manuelle markeringer for videre drøfting er ikke vedtak og ikke journalføring.
- Kontakt i bunnteksten til **Maritha Remes Vestbø**, skaperen av verktøyet.
- Ingen backend, innlogging, pasientprofiler eller sentral lagring; svar holdes kun midlertidig i appminnet.

## Struktur

- src/data/modules.ts og src/data/detailedQuestions.ts: kartlegging og fordypning
- src/engine/matching.ts: positivt svargrunnlag, eksklusjoner, faglige avklaringer og filtrering
- src/engine/consistency.ts: kontroll av endrede og motstridende svar
- src/engine/recommendations.ts: behov og kartleggingsomfang (eldre regelgrunnlag; erstattes gradvis av matching for tiltak)
- src/data/library.ts og src/data/expandedCatalog.ts: tiltak og kilder
- src/components/TailoredResults.tsx: forklarbart resultat
- src/components/LibraryExplorer.tsx: søk, filtrering og tiltaksbeskrivelser
- src/components/GuidePage.tsx og src/components/LegalPage.tsx: forklaring og faglig/juridisk kontekst
- docs/faglig-juridisk-gjennomgang-2026.md: kildebasert kontrollmatrise, begrensninger og gjenstående krav

## Viktige sikkerhetsgrenser

**Dette er ingen godkjent eller validert klinisk løsning.** Ikke legg inn ekte pasientopplysninger. Informasjon kan være identifiserende selv uten navn. Prosjektet lagrer ikke brukerbesvarelser, men det gjør ikke den åpne prototypen egnet for reelle helseopplysninger.

HjemmeKompass diagnostiserer ikke, beregner ikke klinisk risikoskår, avgjør ikke beslutningskompetanse, lovlighet, forsvarlighet, medisindosering eller rett til tjenester.

Kildegjennomgangen dekker relevante **generelle nasjonale regler og faglige hovedprinsipper**, ikke individuell sertifisering av samtlige 87 tiltakstekster eller regler. Før eventuell bruk med reelle personer kreves tverrfaglig faglig og juridisk kvalitetssikring, vurdering av informasjonssikkerhet/personvern og nødvendige lokale godkjenninger og prosesser.

Automatiske tester og bygg kjøres i GitHub Actions.
