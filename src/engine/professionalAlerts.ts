import type { Answers } from '../data/assessment'

export type ProfessionalAlert={ id:string; title:string; message:string; sourceUrl:string }
/** Follow-up prompts only, NOT triage, diagnoses, clinical thresholds or decisions. */
export function professionalAlerts(answers:Answers,selectedTopics:string[],visitImportance:string):ProfessionalAlert[]{
  const topics=new Set(selectedTopics)
  const yes=(id:string)=>answers[id]==='yes'
  const no=(id:string)=>answers[id]==='no'||answers[id]==='partly'
  const alerts:ProfessionalAlert[]=[]
  const add=(alert:ProfessionalAlert)=>alerts.push(alert)
  if(topics.has('nutrition')&&yes('nutrition_swallow'))add({
    id:'swallow',title:'Mulige svelgevansker',
    message:'Mistanke om svelgevansker må vurderes av kvalifisert personell etter gjeldende rutiner. Valg av spisehjelpemidler eller måltidspåminnelser erstatter ikke dette.',
    sourceUrl:'https://www.helsedirektoratet.no/rundskriv/helsepersonelloven-med-kommentarer/krav-til-helsepersonells-yrkesutovelse/-4.forsvarlighet'
  })
  if(topics.has('nutrition')&&yes('nutrition_concern'))add({
    id:'nutrition',title:'Bekymring for ernæring eller væske',
    message:'Følg ordinær faglig kartlegging og oppfølging; denne prototypen vurderer ikke ernæringsstatus eller behandlingsbehov.',
    sourceUrl:'https://www.helsedirektoratet.no/rundskriv/helsepersonelloven-med-kommentarer/krav-til-helsepersonells-yrkesutovelse/-4.forsvarlighet'
  })
  if(topics.has('meds')&&(yes('meds_dose_help')||(yes('meds_manage')&&no('meds_support'))))add({
    id:'medication',title:'Legemidler trenger ansvarlig faglig gjennomgang',
    message:'Påminnelser alene kan være utilstrekkelige når det trengs hjelp til selve legemiddelhåndteringen. Egnethet, oppgavefordeling, opplæring og oppfølging må avklares.',
    sourceUrl:'https://www.helsetilsynet.no/publikasjoner/rapport-fra-helsetilsynet/2025/medisindispensere-trygghet-brukes-riktig/'
  })
  if(topics.has('fall')&&no('can_call'))add({
    id:'alarm',title:'Mulighet for å varsle om hjelp må avklares',
    message:'Det er oppgitt at brukeren har vansker med å tilkalle hjelp. En manuell alarm skal ikke antas egnet. Vurder alternative løsninger og responstjeneste.',
    sourceUrl:'https://www.helsedirektoratet.no/forebygging-diagnose-og-behandling/organisering-og-tjenestetilbud/velferdsteknologi-og-digital-hjemmeoppfolging'
  })
  if((topics.has('memory')&&yes('memory_wayfinding'))||(topics.has('fall')&&yes('fall_wandering')))add({
    id:'location',title:'Lokalisering krever særskilt vurdering',
    message:'Mulig behov for trygg orientering ute er oppgitt. GPS eller varsling kan ikke innføres automatisk; formål, rettslig grunnlag, privatliv og respons må vurderes.',
    sourceUrl:'https://www.helsedirektoratet.no/rundskriv/pasient-og-brukerrettighetsloven-med-kommentarer/samtykke-til-helsehjelp/bruk-av-varslings-og-lokaliseringsteknologi'
  })
  if(topics.has('fall')&&yes('night_observation'))add({
    id:'night',title:'Digitalt tilsyn må vurderes særskilt',
    message:'Et tilsynsbehov innebærer ikke i seg selv at digitalt tilsyn er riktig eller lovlig. Vurder fysiske alternativer, formålet, rettslig grunnlag og personvern.',
    sourceUrl:'https://www.helsedirektoratet.no/normen/informasjonssikkerhet-og-personvern-ved-bruk-av-teknologi-i-kommuner-velferdsteknologi'
  })
  if(visitImportance==='very')add({
    id:'social',title:'Sosial verdi av hjemmebesøk',
    message:'Brukeren oppgir at hjemmebesøk gir vesentlig sosial kontakt. Ikke anta at tekniske løsninger kan erstatte dette uten individuell vurdering.',
    sourceUrl:'https://www.helsedirektoratet.no/faglige-rad/digital-hjemmeoppfolging'
  })
  return alerts
}
