# HjemmeKompass

**Faglig prototype v0.2 – kun fiktive caser, ikke til klinisk bruk.**

Mobiltilpasset, personsentrert kartlegging og regelbasert beslutningsstøtte for ansatte i hjemmesykepleien. Ingen kontoer eller backend.

## Lokalt oppsett

Krever Node.js 20+.

~~~bash
npm install
npm run dev
npm run test
npm run build
~~~

## Funksjonalitet

- Begynn med brukerens mål, ønsker, holdning til teknologi og betydningen av hjemmebesøk for sosial kontakt.
- Velg ett, flere eller alle åtte kartleggingsområdene.
- Hurtigkartlegging med grunnspørsmål og valgfri fordypning med dynamisk foreslåtte oppfølgingsspørsmål.
- Man kan alltid vise alle fordypningsspørsmål og avslutte tidlig.
- Oppsummering viser nøyaktig hvilke områder som er valgt, hva som er avklart og hva som ikke er kartlagt.
- Regelbasert beslutningsstøtte viser mulige teknologiske og ikke-teknologiske tiltak, begrunnelser og faglige forbehold.
- Ingen lagring av svar, innlogging, utskrift eller journalintegrasjon.

## Sikkerhet og faglige begrensninger

**Spørsmål, triggere og tiltakstekster er uvalidert faglig utkast.** Ikke bruk ekte helseopplysninger, heller ikke uten navn. Nettsiden gir ikke diagnoser, risikoskår, automatisk vurdering av beslutningskompetanse, forsvarlighet eller vedtak.

Før eventuell reell bruk kreves faglig kvalitetssikring av hver modul, kildearbeid, juridisk og personvernmessig vurdering samt mobil- og tilgjengelighetstesting. Merk at svarene ligger midlertidig i appens minne frem til siden lukkes; ikke bruk ekte pasientdata under utvikling.

Spørsmålsbibliotek: src/data/modules.ts. Beslutningsregler: src/engine/recommendations.ts.
