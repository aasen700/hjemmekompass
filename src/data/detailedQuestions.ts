import { fourChoices, threeChoices, type Question } from './assessment'

type FollowUp = Question & { when?: { id: string; values: string[] } }
const q = (id: string, title: string, parent: string, values: string[] = ['yes'], help?: string): FollowUp => ({
  id, title, help, options: threeChoices, when: { id: parent, values }
})
const qp = (id: string, title: string, parent: string, values: string[] = ['yes'], help?: string): FollowUp => ({
  id, title, help, options: fourChoices, when: { id: parent, values }
})

/** 
 * Focused questions distinguish needs before a related aid can be shown.
 * Only fictional cases. Not validated clinical screening.
 */
export const detailedQuestions: Record<string, FollowUp[]> = {
  fall: [
    q('fall_bed_night', 'Har brukeren utfordringer med å komme seg opp eller til toalettet om natten?', 'night_fear'),
    q('fall_steps', 'Er terskler eller trinn et konkret problem for fremkommelighet?', 'recent_fall'),
    q('fall_stove', 'Er det opplevd risiko knyttet til å bruke komfyren?', 'feels_safe', ['no', 'partly']),
    q('fall_fire_alert', 'Har brukeren vansker med å oppfatte ordinære lydalarmer?', 'feels_safe', ['no', 'partly']),
    q('fall_wandering', 'Forekommer det at brukeren ikke finner veien hjem fra kjente omgivelser?', 'feels_safe', ['no', 'partly'],
      'Dette kan gi grunn til en bredere faglig vurdering. Ikke automatisk indikasjon for GPS.'),
    q('fall_door_alert', 'Er det et konkret behov for varsling ved døråpning?', 'night_fear')
  ],
  meds: [
    q('meds_packaging', 'Er det vanskelig å åpne pakninger eller håndtere doser fysisk?', 'meds_manage'),
    q('meds_dose_help', 'Er det behov for hjelp til selve utdelingen, utover en påminnelse?', 'meds_manage'),
    q('meds_schedule', 'Er det etablerte doseringstidspunkt og en ansvarlig oppfølgingsordning?', 'meds_manage')
  ],
  selfcare: [
    q('selfcare_toilet_transfer', 'Er det vanskelig å reise seg eller sette seg på toalettet?', 'selfcare_difficulty'),
    q('selfcare_toilet_distance', 'Er det vanskelig å nå toalettet i tide eller på natten?', 'selfcare_difficulty'),
    q('selfcare_shower', 'Er det vanskelig eller utrygt å stå under dusjing?', 'selfcare_difficulty'),
    q('selfcare_compression', 'Trenger brukeren hjelp til å ta av eller på kompresjonsstrømper?', 'selfcare_difficulty'),
    q('selfcare_dress_reach', 'Er bøying eller å nå føtter/klær et hinder ved påkledning?', 'selfcare_difficulty'),
    q('selfcare_buttons', 'Er det vanskelig å håndtere knapper eller glidelåser?', 'selfcare_difficulty'),
    q('selfcare_toilet_hygiene', 'Er det vansker med toalettstell eller hygiene etter toalettbesøk?', 'selfcare_difficulty')
  ],
  nutrition: [
    q('nutrition_hand', 'Gjør redusert grep eller håndfunksjon spising vanskelig?', 'nutrition_difficulty'),
    q('nutrition_one_hand', 'Trenger brukeren hjelp til å samle mat på bestikket?', 'nutrition_difficulty'),
    q('nutrition_drinking', 'Er det vanskelig å holde eller løfte en drikkekopp?', 'nutrition_difficulty'),
    q('nutrition_swallow', 'Er det mistanke om svelgevansker eller utrygt matinntak?', 'nutrition_difficulty',
      ['yes'], 'Et positivt svar tilsier ordinær helsefaglig vurdering, ikke automatisk spisehjelpemiddel.'),
    q('nutrition_stove', 'Oppstår det risiko eller utrygghet ved bruk av komfyr?', 'nutrition_difficulty')
  ],
  memory: [
    q('memory_time', 'Er det spesielt vanskelig å skille mellom dag, dato og tidspunkt?', 'memory_orientation'),
    q('memory_wayfinding', 'Har brukeren problemer med å finne veien hjem eller orientere seg ute?', 'memory_orientation'),
    q('memory_voice', 'Er muntlige påminnelser enklere å forstå enn tekst eller skjerm?', 'memory_difficulty'),
    q('memory_door', 'Foreligger et konkret behov for varsel ved passering av ytterdør?', 'memory_orientation')
  ],
  social: [
    q('social_transport', 'Er transport eller forflytning en barriere for å delta sosialt?', 'social_more'),
    q('social_hearing', 'Begrenser syn eller hørsel muligheten for samtaler?', 'social_more'),
    q('social_visit_value', 'Vil redusert antall hjemmebesøk svekke ønsket menneskelig kontakt?', 'social_more')
  ],
  activity: [
    q('activity_walk', 'Trenger brukeren fysisk støtte ved gange?', 'activity_difficulty'),
    q('activity_wheel', 'Er gange vanskelig over avstander som er viktige i hverdagen?', 'activity_difficulty'),
    q('activity_bed', 'Er det vanskelig å komme opp, snu seg eller forflytte seg i seng?', 'activity_difficulty'),
    q('activity_transfer', 'Krever forflytning mellom seng, stol eller toalett hjelp?', 'activity_difficulty'),
    q('activity_stairs', 'Er trapp eller nivåforskjell en vesentlig hindring?', 'activity_difficulty'),
    q('activity_reach', 'Er det vanskelig å nå ting uten å strekke eller bøye seg langt?', 'activity_difficulty'),
    q('activity_sitting', 'Er sittestilling, komfort eller trykkbelastning en utfordring?', 'activity_difficulty')
  ],
  digital: [
    q('digital_hearing', 'Er det vanskelig å oppfatte tale, telefon eller lydvarsler?', 'digital_support'),
    q('digital_control', 'Vil brukeren selv prøve enklere fjern- eller stemmestyring i boligen?', 'digital_support'),
    q('digital_talk', 'Er det behov for alternativ måte å kommunisere på?', 'digital_support'),
    qp('digital_wishes', 'Ønsker brukeren å prøve ny digital teknologi?', 'digital_support')
  ]
}
