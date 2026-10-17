import { describe, expect, it } from 'vitest'
import { getTailoredMatches, matchingRules } from './matching'
import { solutions } from '../data/library'
import { allQuestions, modules } from '../data/modules'

const ids=(answers:Record<string,string>,topics:string[],attitude='positive',visits='some')=>
  getTailoredMatches(answers,attitude,topics,visits).map(x=>x.solutionId)

describe('tilpasset beslutningsstøtte – klinisk ikke-validert prototype',()=>{
  it('viser ikke alle de 87 tiltakene uten konkrete positive behov',()=>{
    expect(solutions.length).toBeGreaterThanOrEqual(85)
    expect(ids({},modules.map(m=>m.id))).toEqual([])
    expect(ids({selfcare_difficulty:'no'},['selfcare'])).toEqual([])
  })
  it('er strengt begrenset til valgte temaer',()=>{
    expect(ids({selfcare_compression:'yes'},['meds'])).toEqual([])
    expect(ids({meds_manage:'yes'},['selfcare'])).toEqual([])
  })
  it('foreslår ikke strømpepåtrekker eller toalettstol på et generelt stell-svar',()=>{
    const found=ids({selfcare_difficulty:'yes'},['selfcare'])
    expect(found).not.toContain('compression-doff')
    expect(found).not.toContain('toilet-commode')
    expect(found).toContain('selfcare-aids')
  })
  it('finner relevante hjelpemidler ved presise problemstillinger',()=>{
    const found=ids({selfcare_difficulty:'yes',selfcare_compression:'yes',selfcare_toilet_distance:'yes',selfcare_shower:'yes'},['selfcare'])
    expect(found).toContain('compression-doff')
    expect(found).toContain('toilet-commode')
    expect(found).toContain('shower-chair')
    expect(found.length).toBeLessThan(10)
  })
  it('viser ikke manuell trygghetsalarm som egnet ved manglende evne til å varsle',()=>{
    const found=ids({recent_fall:'yes',can_call:'no',alarm_usable:'no'},['fall'])
    expect(found).not.toContain('alarm')
    expect(found).toContain('fall-sensor')
  })
  it('foreslår dispenser bare når glemsel er kartlagt og evne til håndtering ikke er avkreftet',()=>{
    expect(ids({meds_manage:'yes'},['meds'])).not.toContain('dispenser')
    expect(ids({meds_manage:'yes',meds_reminders:'yes'},['meds'])).toContain('dispenser')
    expect(ids({meds_manage:'yes',meds_reminders:'yes',meds_physical:'no'},['meds'])).not.toContain('dispenser')
    expect(ids({meds_manage:'yes',meds_reminders:'yes',meds_dose_help:'yes'},['meds'])).not.toContain('dispenser')
  })
  it('viser ingen teknologiske tiltak ved eksplisitt ønske om ikke å bruke teknologi',()=>{
    const matches=getTailoredMatches({meds_reminders:'yes',social_video:'yes',selfcare_compression:'yes',memory_wayfinding:'yes'},'no',['meds','social','selfcare','memory'],'very')
    expect(matches.every(m=>m.kind!=='technology')).toBe(true)
    expect(matches.some(m=>m.solutionId==='compression-doff')).toBe(true)
  })
  it('skiller mulighet fra krav om nærmere vurdering og gir begrunnelse',()=>{
    const matches=getTailoredMatches({meds_manage:'yes',meds_reminders:'yes'},'unknown',['meds'],'very')
    const match=matches.find(m=>m.solutionId==='dispenser')
    expect(match?.status).toBe('clarify')
    expect(match?.evidence.some(x=>x.includes('Ja:'))).toBe(true)
    expect(match?.checks.some(x=>x.includes('Brukerens holdning'))).toBe(true)
    expect(match?.warnings.join(' ')).toMatch(/Helsetilsynet/)
  })
  it('GPS krever spesifikk orienteringsutfordring og er aldri automatisk juridisk avklart',()=>{
    expect(ids({memory_orientation:'yes'},['memory'])).not.toContain('gps')
    const match=getTailoredMatches({memory_wayfinding:'yes'},'positive',['memory'],'some').find(m=>m.solutionId==='gps')
    expect(match?.status).toBe('clarify')
    expect(match?.warnings.join(' ')).toMatch(/lovgrunnlag/)
  })
  it('viser ikke videosamtaler ved ensomhet alene eller uten kontaktperson',()=>{
    expect(ids({social_more:'yes'},['social'])).not.toContain('video-calls')
    expect(ids({social_video:'yes',social_network:'no'},['social'])).not.toContain('video-calls')
    expect(ids({social_video:'yes',social_network:'yes'},['social'])).toContain('video-calls')
  })
  it('ignorerer detaljerte svar dersom et eksplisitt motsigende grunnsvar er registrert',()=>{
    const answers={selfcare_difficulty:'no',selfcare_compression:'yes',selfcare_toilet_distance:'yes'}
    const result=ids(answers,['selfcare'])
    expect(result).not.toContain('compression-doff')
    expect(result).not.toContain('toilet-commode')
  })
  it('filtrerer ut forslag med manglende definisjoner eller spørsmål',()=>{
    const solutionIds=new Set(solutions.map(s=>s.id))
    const questionIds=new Set(allQuestions.map(q=>q.id))
    for(const rule of matchingRules){
      expect(solutionIds.has(rule.solutionId)).toBe(true)
      expect(modules.some(m=>m.id===rule.topic)).toBe(true)
      for(const signal of [...rule.when,...(rule.exclude??[])])expect(questionIds.has(signal.id)).toBe(true)
      for(const id of rule.check??[])expect(questionIds.has(id)).toBe(true)
    }
  })
  it('maks to tiltak per konkret behov, ingen rangering som klinisk risikoskår',()=>{
    const matches=getTailoredMatches({
      selfcare_difficulty:'yes',selfcare_toilet_transfer:'yes',selfcare_toilet_distance:'yes',
      selfcare_compression:'yes',selfcare_shower:'yes',selfcare_buttons:'yes'
    },'positive',['selfcare'],'some')
    const counts=new Map<string,number>()
    for(const m of matches){
      const key=m.topic+':'+m.need;counts.set(key,(counts.get(key)??0)+1)
    }
    expect([...counts.values()].every(n=>n<=2)).toBe(true)
    expect(matches.every(m=>m.reason.length>15&&m.evidence.length>0)).toBe(true)
  })
})
