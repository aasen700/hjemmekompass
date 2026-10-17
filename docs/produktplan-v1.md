# Produktplan – fra prototype til v1

## Retning
HjemmeKompass skal gi en helhetlig og personsentrert kartlegging til bruk som **støtte for faglige vurderinger**, ikke et skjema som fatter vedtak eller automatisk avgjør valg av velferdsteknologi. Målgruppe er ansatte i hjemmesykepleien. Mobil er førsteprioritet.

## Innhold og UX som allerede er bygget
- Åtte kartleggingsområder som kan velges individuelt eller sammen.
- Hurtigkartlegging og valgfri fordypning; ubesvarte spørsmål synliggjøres.
- Innledende brukerperspektiv: mål, ressurser, teknologipreferanser og sosial betydning av hjemmebesøk.
- Forklarbar, regelbasert kobling fra behov til mulige tiltak.
- Faglig oppsummering med kartleggingsomfang, begrensninger og status for videre drøfting.
- Søk- og filterbart tiltaksbibliotek med 17 oppslag. Hvert oppslag inneholder relevante behov, virkemåte, avklaringer, begrensninger, alternativer, oppfølging og videre kilder.
- Veiledningsside, responsivt grensesnitt og tilbakestilling med bekreftelse.
- Ingen identifiserende felter eller permanent lagring av svar.

## Innholdsarbeid før v1 regnes som klar til faglig testing
1. Kildekontroll og faglig gjennomgang av ordlyden i alle spørsmål.
2. Kildekontroll av hver kobling mellom spørsmålsresultat og tiltak.
3. Vurdering av om de åtte temaene dekker formålet uten unødig overlapp.
4. Gå gjennom alle risikoforhold (legemidler, varsling, nattlig tilsyn, digital overvåkning).
5. Språkvask av bibliotek og beslutningsstøtte; dokumenter versjon og faglig ansvarlig.
6. Avklar faktisk tiltenkt bruk, eierskap, oppdateringsansvar og hvordan løsningen kan forvaltes.

## Testing etter at innholds-/UX-strukturen er stabil
- Brukerreiser i fiktive scenarier, både hurtigkartlegging og fordypning.
- Mobilskjermer, nettbrett og PC, én-håndsbetjening, tastatur og skjermleser.
- Feilscenarier: tom kartlegging, ubesvarte spørsmål, ingen teknologi ønsket, motstridende opplysninger og navigasjon mellom områder.
- Fagpersoners vurdering av om forslag er relevante og om begrensningene er tydelige.
- Kontroll av WCAG-relevante krav og konsekvensene av eventuell framtidig lagring/eksport.

## Sikkerhetsgrense
Denne prototypen er **ikke godkjent for reelle pasientopplysninger eller klinisk bruk**. Klinisk og juridisk kvalitetssikring kan ikke utsettes til etter at verktøyet tas i bruk. Automatiske bygge- og enhetstester kjøres fortsatt kontinuerlig for å fange tekniske regressjoner.
