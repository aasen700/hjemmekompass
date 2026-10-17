# Faglige prinsipper – HjemmeKompass v0.1

**Status: Prototype til utprøving med fiktive caser. Ikke validert eller godkjent for klinisk bruk.**

## Formål
HjemmeKompass er et personsentrert kartleggings- og beslutningsstøtteverktøy for ansatte i hjemmesykepleien. Verktøyet kan synliggjøre behov, ressurser, brukerens egne mål og mulige tiltak. Det gjør ingen automatiske tjenestevedtak, vurderer ikke samtykke/beslutningskompetanse og erstatter ikke faglig skjønn.

## Brukerflyt
1. Avklar hva som er viktig for brukeren og vedkommendes holdning til teknologi.
2. Gjennomfør hurtigkartlegging (fire screeningspørsmål i første modul).
3. Velg frivillig fordypning – det samme spørsmålsbiblioteket ligger bak.
4. Se forslag som **mulig grunnlag for videre vurdering**, aldri som en anbefaling eller tildeling.
5. Gjennomgå oppsummering, manglende informasjon og faglige forbehold.

## Beslutningsmotor
- Transparent regelbasert motor, uten generativ KI.
- Manglende og «Ikke avklart» tolkes aldri som «Nei».
- Mulige tiltak krever vurdering av gjennomførbarhet, respons og risiko.
- Teknologimotstand eller avslag skal ikke automatisk ignoreres.
- Sosial kontakt ved hjemmebesøk må synliggjøres når relevant.
- Også ikke-teknologiske alternativer må vurderes.

## Personvern og sikkerhet
- Ingen identifiserende pasientfelt eller kontoer.
- Svar holdes kun i React-minnet mens appen er åpen. Ingen API for innsending og ingen browserlagring.
- Ikke legg inn reelle helseopplysninger i denne prototypen. Selv opplysninger uten navn kan være personopplysninger.
- Ingen lagring eller utskrift til kommunalt journalsystem.
- Informasjonssikkerhet, lovgrunnlag, klinisk innhold og eventuell DPIA må vurderes av ansvarlig virksomhet før bruk med reelle personer.
- Utviklingsrepoet kan være offentlig: legg aldri pasientopplysninger, tilgangsnøkler eller interne dokumenter i repoet.

## Kvalitetssikring før klinisk bruk
- Kildebelegg og faglig kvalitetssikring av spørsmål, tiltak, kontraindikasjoner og responstjeneste.
- Gjennomgang av personvern, pasient- og brukerrettigheter, relevant helse- og omsorgslovgivning og lokale rutiner.
- Brukertesting med hjemmesykepleiere på mobil og PC.
- Tilgjengelighetstesting (WCAG), ende-til-ende-tester og realistiske fiktive brukerforløp.
