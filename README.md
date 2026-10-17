# HjemmeKompass

**Prototype v0.3 – kun til bruk med fiktive caser. Ikke klinisk validert.**

Personsentrert, mobiltilpasset kartlegging og regelbasert beslutningsstøtte for ansatte i hjemmesykepleien.

## Kjør lokalt

Node.js 20+.

~~~bash
npm install
npm run dev
npm run test
npm run build
~~~

## Dette er utviklet
- Åtte kartleggingsområder, valgfri hurtigkartlegging og dynamisk fordypning.
- Brukerens mål, ressurser, holdning til teknologi og betydningen av sosiale hjemmebesøk.
- Etterprøvbar, regelbasert kobling fra svar til mulige teknologiske og ikke-teknologiske tiltak.
- Foreløpig resultatoversikt som viser kartleggingsomfang, ubesvarte områder og status for videre drøfting.
- Søkbart tiltaksbibliotek med 17 detaljerte oppslag og lenker til relevant offentlig fagstoff.
- Veiledningsside med faglige prinsipper og avgrensninger.
- Ingen backend, innlogging, pasientprofiler eller sentral lagring; besvarelsene lever kun i appens minne mens siden er åpen.

## Filer
- src/data/modules.ts: spørsmål og dynamiske fordypningsregler
- src/engine/recommendations.ts: beslutningsstøtte
- src/data/library.ts: tiltaksbibliotek og eksterne kilder
- src/components/LibraryExplorer.tsx: søk, filtrering og detaljsider
- src/components/GuidePage.tsx: introduksjon og faglige grenser
- src/App.tsx: brukerflyt og oppsummering
- docs/produktplan-v1.md: krav før faglig testing

## Viktige forbehold

Spørsmålene og beslutningsreglene er **faglige utkast** og må kildekontrolleres og gjennomgås av relevant fagpersonell før bruk med pasienter. Ikke legg inn ekte helseopplysninger. Det at verktøyet ikke spør etter navn, innebærer ikke i seg selv at opplysningene er anonyme.

HjemmeKompass diagnostiserer ikke, gir ikke risikoskår, vurderer ikke beslutningskompetanse eller om tjenester er forsvarlige, og tildeler ikke helse- og omsorgstjenester.

Godkjent virksomhetsbruk krever avklaring av lovgrunnlag, personvern, informasjonssikkerhet, lokal ansvarsfordeling, prosedyreverk, opplæring og dokumentasjon. GitHub Actions kjører automatiske tester og bygg under utviklingen.
