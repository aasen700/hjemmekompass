import { ArrowRight, BookOpen, CircleHelp, ClipboardCheck, HeartHandshake, Info, LockKeyhole, ShieldCheck, Smartphone, Waypoints } from 'lucide-react'

export default function GuidePage({startAssessment,openLibrary}:{startAssessment:()=>void;openLibrary:()=>void}) {
  return <div className="guide-page">
    <p className="eyebrow">OM HJEMMEKOMPASS</p>
    <h1>Brukerens behov først.</h1>
    <p className="lead">HjemmeKompass er et personsentrert støtteverktøy utviklet for å strukturere en samtale om mestring, trygghet, sosial kontakt og mulig velferdsteknologi i hjemmesykepleien.</p>
    <div className="guide-actions"><button className="primary" onClick={startAssessment}>Start kartlegging <ArrowRight size={17}/></button><button className="secondary" onClick={openLibrary}><BookOpen size={17}/> Utforsk tiltaksbiblioteket</button></div>
    <div className="guide-grid">
      {[
        {Icon:HeartHandshake,n:'01',title:'Begynn med personen',text:'Hva er viktig i hverdagen? Hva ønsker brukeren å mestre? Hvilke tjenester og hvilken sosial kontakt har betydning?'},
        {Icon:Waypoints,n:'02',title:'Velg relevante områder',text:'En kort kartlegging kan omfatte ett område. En bred kartlegging kan omfatte alle åtte. Ikke-valgte områder blir markert som ikke kartlagt.'},
        {Icon:ClipboardCheck,n:'03',title:'Fordyp deg ved behov',text:'Velg grunnspørsmål først. Åpne relevante oppfølgingsspørsmål når det er behov – eller vis alle spørsmål manuelt.'},
        {Icon:ShieldCheck,n:'04',title:'Drøft mulige tiltak',text:'Forslagene er ikke vedtak eller godkjenninger. Undersøk både teknologiske og ikke-teknologiske alternativer, sikkerhet og brukerens ønsker.'},
        {Icon:Smartphone,n:'05',title:'Avslutt når tiden krever det',text:'En foreløpig oppsummering viser hva som faktisk er kartlagt og hva som krever videre avklaring.'}
      ].map(({Icon,n,title,text})=><section className="guide-tile" key={n}><span className="guide-tile-icon"><Icon size={22}/></span><span className="eyebrow">{n}</span><h3>{title}</h3><p>{text}</p></section>)}
    </div>
    <section className="panel guide-principles">
      <h2>Faglige prinsipper</h2>
      <div className="guide-rule"><HeartHandshake size={19}/><div><strong>Personsentrert</strong><p>Brukerens egne mål, behov og preferanser skal påvirke vurderingene. Et stort nettverk betyr ikke automatisk at hjemmebesøk er sosialt uviktige.</p></div></div>
      <div className="guide-rule"><CircleHelp size={19}/><div><strong>Usikkerhet synliggjøres</strong><p>«Ikke avklart» og ubesvarte spørsmål betyr ikke «Nei». Verktøyet skal vise begrensningene ved en kort kartlegging.</p></div></div>
      <div className="guide-rule"><ShieldCheck size={19}/><div><strong>Faglig skjønn kan ikke automatiseres bort</strong><p>En mulig teknologi kan kreve nærmere vurdering av funksjon, responstjeneste, opplæring, oppfølging, lovgrunnlag og informasjonssikkerhet.</p></div></div>
      <div className="guide-rule"><LockKeyhole size={19}/><div><strong>Ingen reelle brukeropplysninger i prototypen</strong><p>Nettsiden har ingen pasientkonto eller serverlagring, men helseopplysninger kan likevel være identifiserende. Bruk kun fiktive caser under utvikling.</p></div></div>
    </section>
    <section className="panel guide-principles">
      <h2>Før eventuell bruk i tjenesten</h2>
      <p>Innholdet er ikke klinisk validert. En ansvarlig virksomhet må blant annet vurdere faglig innhold, lokal praksis, roller og ansvar, informasjonssikkerhet, personvern, nødvendig opplæring og hvordan resultatet eventuelt skal dokumenteres i godkjente systemer.</p>
      <div className="notice"><Info size={19}/><p>HjemmeKompass skal hjelpe ansatte å stille bedre spørsmål – ikke beregne hvem som skal få tjenester eller erstatte nødvendig helsefaglig vurdering.</p></div>
    </section>
  </div>
}
