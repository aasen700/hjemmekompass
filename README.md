# HjemmeKompass

**Faglig prototype v0.1 – ikke til klinisk bruk.**

Mobilførst, personsentrert kartlegging og regelbasert beslutningsstøtte for hjemmesykepleien. Første modul er **Trygghet og fall**. De øvrige syv modulene er foreløpig synlige som «Kommer senere».

## Teknologi
React 18, TypeScript, Vite, Tailwind CSS og Lucide-ikoner. Ingen backend, innlogging, sporing eller lagring av kartleggingssvar.

## Kom i gang
Krever Node.js 20+.

~~~bash
npm install
npm run dev
~~~

Åpne adressen Vite viser i terminalen (normalt http://localhost:5173).

## Tester og bygg
~~~bash
npm run test
npm run build
~~~

GitHub Actions kjører tester og bygg for pushes og pull requests. Første versjon må gjennom teknisk testing og faglig kvalitetssikring før videre bruk.

## Brukerflyt
1. Start fra mobil eller desktop.
2. Velg brukerens mål, holdning til teknologi og betydningen av hjemmebesøk.
3. Gjennomfør fire innledende spørsmål om trygghet og fall.
4. Åpne valgfri fordypning med syv spørsmål.
5. Få forslag til **mulige** tiltak, begrunnelser, avklaringer og tydelig markering av ubesvarte spørsmål.
6. Nullstill ved avslutning. Ingen data lagres i nettleserlagring eller på server.

## Avgrensning
- Kun fiktive brukeropplysninger. Ikke skriv inn reelle helseopplysninger i prototypen.
- Ingen automatisk tjenestetildeling, diagnose, risikovurdering eller godkjenning av teknologi.
- Regler og innhold er utkast til faglig gjennomgang.
- Enhetene må ikke brukes til kartlegging av virkelige pasienter før virksomheten har vurdert sikkerhet, lovgrunnlag og klinisk egnethet.

Se [faglige prinsipper](docs/faglige-prinsipper.md) og [kartleggingsmodulen](docs/kartlegging/trygghet-og-fall.md).

## Videre
Kvalitetssikre første modul, lage tilpassede spørsmål for de øvrige syv modulene, teste med fiktive caser og dokumentere kildegrunnlag. Deretter tilgjengelighets- og mobiltesting.
