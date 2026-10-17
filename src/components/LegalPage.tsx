import { AlertTriangle, ArrowRight, BookOpen, ExternalLink, Info, LockKeyhole, Scale, ShieldCheck, Stethoscope } from 'lucide-react'

const sources=[
  {
    id:'forsvarlig',icon:Stethoscope,title:'Forsvarlighet og faglig ansvar',
    text:'Helsepersonelloven § 4 krever faglig forsvarlig og omsorgsfull hjelp. Verktøyets forslag er ikke en klinisk risikovurdering eller vedtak.',
    points:['Vurder individuelle forhold og brukernes mål.','Følg virksomhetens rutiner for ansvar og dokumentasjon.','Innhent nødvendig kompetanse ved behov.'],
    url:'https://www.helsedirektoratet.no/rundskriv/helsepersonelloven-med-kommentarer/krav-til-helsepersonells-yrkesutovelse/-4.forsvarlighet',label:'Helsedirektoratet: § 4 Forsvarlighet'
  },
  {
    id:'meds',icon:ShieldCheck,title:'Legemiddelhåndtering',
    text:'Helsetilsynets nasjonale tilsyn med medisindispensere viser betydningen av egnethetsvurdering, opplæring og systematisk oppfølging.',
    points:['Ingen dispensere bør velges på grunnlag av et enkelt avkrysset spørsmål.','Avklar hvem som fyller, reagerer på uteblitte doser og håndterer feil.','Skillet mellom påminnelse, utlevering og faktisk inntak må bevares.'],
    url:'https://www.helsetilsynet.no/publikasjoner/rapport-fra-helsetilsynet/2025/medisindispensere-trygghet-brukes-riktig/',label:'Helsetilsynet: Medisindispensere kan gi trygghet (2025)'
  },
  {
    id:'warning',icon:Scale,title:'Varsling, lokalisering og digitalt tilsyn',
    text:'Rett grunnlag avhenger av formål, tiltak, beslutningskompetanse og eventuell motstand. Pasient- og brukerrettighetsloven § 4-6 a er relevant i bestemte situasjoner, men dekker ikke automatisk alle tiltak.',
    points:['Avklar hva tiltaket faktisk skal registrere og hvorfor.','Gjør en individuell vurdering av nødvendighet, minst inngripende alternativ og rettslig grunnlag.','Verktøyet kan aldri avgjøre om et konkret tiltak er lovlig.'],
    url:'https://www.helsedirektoratet.no/rundskriv/pasient-og-brukerrettighetsloven-med-kommentarer/samtykke-til-helsehjelp/bruk-av-varslings-og-lokaliseringsteknologi',label:'Helsedirektoratet: § 4-6 a'
  },
  {
    id:'competence',icon:BookOpen,title:'Beslutningskompetanse og selvbestemmelse',
    text:'Lovverket bruker begrepet beslutningskompetanse fra 1. juni 2026. Vurderingen kan ikke gjøres automatisk av HjemmeKompass.',
    points:['Brukerens ønske om ikke å bruke teknologi må tas på alvor.','Manglende svar betyr ikke at brukeren har samtykket.','Et endelig tiltak krever vurdering etter gjeldende regelverk.'],
    url:'https://www.helsedirektoratet.no/rundskriv/pasient-og-brukerrettighetsloven-med-kommentarer/samtykke-til-helsehjelp/hvem-som-har-samtykkekompetanse',label:'Helsedirektoratet: § 4-3 Beslutningskompetanse'
  },
  {
    id:'privacy',icon:LockKeyhole,title:'Personvern og informasjonssikkerhet',
    text:'Normens veileder beskriver krav og risikoforhold ved behandling av personopplysninger gjennom velferdsteknologiske løsninger.',
    points:['Denne prototypen er åpen og skal bare brukes med fiktive caser.','Selv opplysninger uten navn kan være personopplysninger.','Før reell bruk trengs sikkerhets- og personvernvurdering, og eventuelt DPIA.'],
    url:'https://www.helsedirektoratet.no/normen/informasjonssikkerhet-og-personvern-ved-bruk-av-teknologi-i-kommuner-velferdsteknologi',label:'Normen: Veileder for velferdsteknologi'
  },
  {
    id:'home',icon:Stethoscope,title:'Digital hjemmeoppfølging',
    text:'Helsedirektoratets nasjonale faglige råd omtaler digital hjemmeoppfølging som en individuelt tilpasset og organisert helsetjeneste.',
    points:['Målinger skal ikke tolkes som selvstendige diagnoser.','Det må finnes avtalt behandlings- og responsansvar.','Digital oppfølging må vurderes opp mot behov for fysisk undersøkelse og kontakt.'],
    url:'https://www.helsedirektoratet.no/faglige-rad/digital-hjemmeoppfolging',label:'Helsedirektoratet: Faglige råd'
  }
] as const

export default function LegalPage({onLibrary}:{onLibrary:()=>void}){
  return <div className="legal-page">
    <p className="eyebrow">FAGLIG OG JURIDISK GRUNNLAG</p>
    <h1>Hva krever faglig vurdering?</h1>
    <p className="lead">Vi bygger beslutningsstøtten på offentlig fagstoff og gjeldende regelverk. Dette er en foreløpig kildegjennomgang – <strong>ikke en juridisk godkjenning eller klinisk validering</strong>.</p>
    <div className="legal-alert"><AlertTriangle size={23}/><div><strong>Viktig avgrensning</strong><p>Ingen av tiltakene blir godkjent, vedtatt eller vurdert som forsvarlige av nettsiden. Det krever relevant fagpersonell, ansvarlig virksomhet og eventuelle formelle beslutninger.</p></div></div>
    <div className="legal-grid">{sources.map(({id,icon:Icon,title,text,points,url,label})=><section className="legal-source" key={id}>
      <div className="legal-icon"><Icon size={22}/></div><h2>{title}</h2><p>{text}</p>
      <details><summary>Hva betyr dette for HjemmeKompass?</summary><ul>{points.map(p=><li key={p}>{p}</li>)}</ul></details>
      <a href={url} target="_blank" rel="noopener noreferrer">{label} <ExternalLink size={14}/></a>
    </section>)}</div>
    <section className="panel legal-next"><h2>Hva gjenstår før en godkjent løsning?</h2>
      <p>Vi må gjennomgå alle spørsmål og koblinger mellom svar og tiltak faglig, dokumentere kunnskapsgrunnlag og kontekst, og etablere eierskap, rollefordeling og rutiner for vedlikehold. Ved eventuell behandling av reelle personopplysninger må også personvern og informasjonssikkerhet avklares.</p>
      <button className="secondary" type="button" onClick={onLibrary}>Se tiltaksbiblioteket <ArrowRight size={17}/></button>
    </section>
    <div className="notice"><Info size={19}/><p>Lovtekst og veiledere kan endres. Dato og relevans må gjennomgås på nytt ved senere versjoner. Informasjon her er generell og kan ikke avgjøre rettsgrunnlag i en enkeltsak.</p></div>
  </div>
}
