# Faglig og juridisk kildegjennomgang – HjemmeKompass v0.5

**Status: Dokumentert første gjennomgang, ikke klinisk validering, juridisk godkjenning eller sertifisering. Oppdatert oktober 2026.**

## Formål og faglige grenser

Verktøyet skal hjelpe ansatte å kartlegge funksjon, brukerens mål og aktuelle muligheter. Det skal **ikke** konkludere om diagnoser, ernæringsrisiko, risiko for fall, rett til tjenester, medisindosering, beslutningskompetanse, lovlighet av et inngrep, anskaffelse eller egnethet for medisinsk utstyr. Det skal ikke brukes med ekte brukerdata på en åpen prototype.

En overordnet kildekontroll er utført mot norske offentlige kilder. Alle de 87 oppslagene og samtlige spørsmålsregler er fortsatt **faglige utkast** inntil relevant helsepersonell, personvernansvarlig og juridisk kompetanse har vurdert både innhold, kontekst og organisasjon.

## Kildebasert kontrollmatrise

| Tema | Hva offentlig kilde innebærer for prototypen | Kontrollerbart krav i koden | Kilde |
| --- | --- | --- | --- |
| Brukermedvirkning og informasjon | Valg av velferdsteknologi må ta hensyn til personens informasjon, ønsker og medvirkning. | Et eksplisitt «ønsker ikke teknologi» filtrerer teknologiske forslag. «Ikke avklart» tolkes ikke som aksept. | [Helsetilsynet, medisindispensere 2025](https://www.helsetilsynet.no/publikasjoner/rapport-fra-helsetilsynet/2025/medisindispensere-trygghet-brukes-riktig/) |
| Forsvarlighet | Helsepersonell og virksomhet har plikter til forsvarlig helsehjelp. | Resultatkort merkes som muligheter, aldri som forsvarlig/egnet/vedtatt. | [Helsedirektoratet, helsepersonelloven § 4](https://www.helsedirektoratet.no/rundskriv/helsepersonelloven-med-kommentarer/krav-til-helsepersonells-yrkesutovelse/-4.forsvarlighet) |
| Legemiddelhåndtering | Medisindispenser krever konkret egnethetsvurdering, opplæring, oppfølging og tydelige roller. | «Glemte doser» kan utløse mulig dispenser, men kjent manglende betjeningsevne/hjelp til selve utdelingen sperrer for forenklet forslag; alle dispenserkort krever særskilt faglig gjennomgang. | [Helsetilsynet, rapport 5/2025](https://www.helsetilsynet.no/publikasjoner/rapport-fra-helsetilsynet/2025/medisindispensere-trygghet-brukes-riktig/) |
| Varslings- og lokaliseringsteknologi | § 4-6 a kan være aktuell ved nærmere bestemte vilkår når bruker over 18 år mangler beslutningskompetanse og ikke motsetter seg tiltaket. Ulike formål/tiltak kan ha annet rettslig grunnlag. | GPS, døralarm og digitalt tilsyn skal aldri vises som rettslig avklart; krav om manuell, individuell vurdering. | [Helsedirektoratet, § 4-6 a](https://www.helsedirektoratet.no/rundskriv/pasient-og-brukerrettighetsloven-med-kommentarer/samtykke-til-helsehjelp/bruk-av-varslings-og-lokaliseringsteknologi) |
| Beslutningskompetanse | Fra 1. juni 2026 ble begrepet «samtykkekompetanse» endret til «beslutningskompetanse» med ytterligere lovendringer. | Bruk «beslutningskompetanse»; verktøyet vurderer ikke kompetansen. | [Helsedirektoratet, § 4-3](https://www.helsedirektoratet.no/rundskriv/pasient-og-brukerrettighetsloven-med-kommentarer/samtykke-til-helsehjelp/hvem-som-har-samtykkekompetanse) |
| Særregler ved utviklingshemming | Bruk av varslings- og lokaliseringsteknologi må vurderes etter riktig hjemmel og vilkår, også etter endringer fra september 2025. | Ingen automatisk lovhjemmel eller tillatelse på grunnlag av diagnose. | [Helsedirektoratet, lovfortolkning 2. juli 2025](https://www.helsedirektoratet.no/lov-og-forskrift/lovfortolkninger/nye-regler-om-bruk-av-varslings-og-lokaliseringsteknologi-overfor-personer-med-utviklingshemming) |
| Personvern og informasjonssikkerhet | Kommuner må ha oversikt over risiko, dataflyt, behandlingsgrunnlag og relevante tiltak; DPIA kan være aktuelt. | Ingen kontoer, API, automatisk lagring eller journalsynkronisering. Ekte brukerdata er forbudt i prototypen. | [Normen – personvern ved velferdsteknologi](https://www.helsedirektoratet.no/normen/informasjonssikkerhet-og-personvern-ved-bruk-av-teknologi-i-kommuner-velferdsteknologi/innledning), [Helsedirektoratet – krav og veiledning](https://www.helsedirektoratet.no/forebygging-diagnose-og-behandling/organisering-og-tjenestetilbud/velferdsteknologi-og-digital-hjemmeoppfolging/veiledning-anbefalinger-og-krav) |
| Digital hjemmeoppfølging | Digital hjemmeoppfølging er en individuelt tilpasset tjeneste med definert organisatorisk og klinisk oppfølging. | Målinger, alarmer eller symptomdata tolkes ikke automatisk i kartleggingsmotoren. | [Helsedirektoratet, nasjonale faglige råd](https://www.helsedirektoratet.no/faglige-rad/digital-hjemmeoppfolging) |
| Journalføring | Når helsehjelp ytes, er dokumentasjonsplikt og virksomhetens journalrutiner aktuelle. | Prototype har ingen journalintegrasjon og kan ikke erstatte journalføringen. | [Helsedirektoratet, § 39](https://www.helsedirektoratet.no/rundskriv/helsepersonelloven-med-kommentarer/dokumentasjonsplikt/-39.plikt-til-a-fore-journal) |

## Viktige presiseringer

- **§ 4-6 a er ikke et generelt forhåndssamtykke til all varsling eller digitalt tilsyn.** Bruken avhenger blant annet av formål, tiltakets art, beslutningskompetanse, eventuell motstand og nødvendighet. Det finnes situasjoner der andre bestemmelser er aktuelle. Løsningen fastslår ikke hjemmel.
- **Elektronisk medisindispenser**: Unngå å slå sammen påminnelse, fysisk utlevering, dokumentert inntak og ansvar for medisinering. Dette er forskjellige oppgaver og krav.
- **Hjelpemidler**: At et hjelpemiddel står i katalogen betyr ikke at NAV eller kommunen har besluttet finansiering, at det er egnet for pasienten, eller at produktet er tilgjengelig. En rekke oppslag viser hjelpemiddeltyper og enkle brukseksempler, ikke produsentspesifikke spesifikasjoner.
- **Sosial kontakt**: En digital løsning skal ikke fremstå som en automatisk erstatning for fysiske besøk, særlig der besøk har særskilt sosial betydning.
- **Svelg, ernæring og trykkbelastning**: Positive svar må føre til faglig vurdering, ikke til beslutning om utstyr alene.
- **Alle 87 bibliotekoppslag er informasjonsinnhold**. Forslag genereres kun av eksplisitte, spørsmålsspesifikke beslutningsregler. Oppslag uten kartlagt indikasjon blir i søkbart bibliotek, ikke vist i resultatet.

## Gjenstående verifikasjon før bruk med reelle personer

1. Individuell faglig gjennomgang av hvert av de åtte spørsmålsområdene og hvert av de 87 oppslagene.
2. Kryssjekk regel for regel mot dokumentert kunnskapsgrunnlag og relevante kliniske/kommunale retningslinjer.
3. Vurder hvilke tiltak som eventuelt kan være medisinsk utstyr, og hvilke særskilte krav det utløser.
4. Gjennomgang ved juridisk kompetanse og kommunens personvern-/informasjonssikkerhetsansvarlige.
5. Risikovurdering og eventuell DPIA, behandlingsgrunnlag, sikker drift, databehandlerforhold, tilgangsstyring og dokumentasjonsflyt **før** ekte helseopplysninger brukes.
6. Tverrfaglig utprøving med fiktive caser, inkl. ansvarsfordeling og nødvendige responstjenester.
7. Tilgjengelighetstesting, teknisk sikkerhetsgjennomgang og rutiner for vedlikehold og oppdateringer.

Dette dokumentet er ikke en juridisk vurdering av en bestemt situasjon, og det er ikke dokumentasjon på at HjemmeKompass er ferdig kvalitetssikret.
