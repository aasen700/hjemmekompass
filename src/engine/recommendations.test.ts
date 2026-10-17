import { describe, expect, it } from 'vitest'
import { makeAssessment } from './recommendations'
import { modules, suggestedDeepQuestions } from '../data/modules'

describe('personsentrert og transparent beslutningsstøtte', () => {
  it('starts with zero suggestions and never treats unknown as a negative answer', () => {
    const r = makeAssessment({}, 'unknown', 'unknown', modules.map(m => m.id))
    expect(r.suggestions).toHaveLength(0)
    expect(r.screeningAnswered).toBe(0)
    expect(r.unknowns.length).toBeGreaterThan(0)
  })
  it('is scoped to selected modules and ignores stale answers', () => {
    const r = makeAssessment({ meds_manage:'yes', recent_fall:'yes' }, 'positive', 'some', ['social'])
    expect(r.suggestions).toHaveLength(0)
    expect(r.needs).toHaveLength(0)
    expect(r.screeningTotal).toBe(2)
  })
  it('identifies non-digital fall prevention and manual-alarm constraints', () => {
    const r = makeAssessment({recent_fall:'yes',can_call:'no'},'positive','some',['fall'])
    expect(r.suggestions.some(s => s.id==='fall-prevention')).toBe(true)
    expect(r.suggestions.find(s => s.id==='alarm')?.caution).toMatch(/Manuell/)
  })
  it('respects wishes not to use technology in every module', () => {
    const r = makeAssessment({recent_fall:'yes',meds_manage:'yes',social_more:'yes',social_video:'yes'},'no','very',['fall','meds','social'])
    expect(r.suggestions.some(s=>s.kind==='technology')).toBe(false)
    expect(r.suggestions.some(s=>s.id==='social-visits')).toBe(true)
  })
  it('avoids implying that a dispenser is approved', () => {
    const r = makeAssessment({meds_manage:'yes',meds_understand:'no'},'positive','some',['meds'])
    expect(r.suggestions.find(s=>s.id==='dispenser')?.caution).toMatch(/barrierer/)
    expect(r.suggestions.some(s=>s.id==='med-review')).toBe(true)
  })
  it('suggests video only after explicit interest, not only after loneliness', () => {
    expect(makeAssessment({social_more:'yes'},'positive','some',['social']).suggestions.some(s=>s.id==='video-calls')).toBe(false)
    expect(makeAssessment({social_more:'yes',social_video:'yes'},'positive','some',['social']).suggestions.some(s=>s.id==='video-calls')).toBe(true)
  })
  it('requires an explicit night observation need before presenting that option', () => {
    expect(makeAssessment({night_fear:'yes'},'positive','some',['fall']).suggestions.some(s=>s.id==='night-observation')).toBe(false)
    const r=makeAssessment({night_observation:'yes'},'positive','some',['fall'])
    expect(r.suggestions.find(s=>s.id==='night-observation')?.considerations.join(' ')).toMatch(/rettslig/)
  })
  it('shows only triggered deep questions unless user requests all', () => {
    const m=modules.find(m=>m.id==='meds')!
    expect(suggestedDeepQuestions(m,{})).toHaveLength(0)
    expect(suggestedDeepQuestions(m,{meds_manage:'yes'}).length).toBeGreaterThan(0)
    expect(suggestedDeepQuestions(m,{},true)).toHaveLength(m.deep.length)
  })
  it('all modules have unique question ids and valid follow-up triggers', () => {
    const ids=modules.flatMap(m=>[...m.screening,...m.deep].map(q=>q.id))
    expect(new Set(ids).size).toBe(ids.length)
    for(const m of modules) for(const q of m.deep) if(q.when) expect(m.screening.some(s=>s.id===q.when!.id)).toBe(true)
  })
  it('reports unaddressed screening questions and only opened follow-ups', () => {
    const notOpened=makeAssessment({meds_manage:'yes'},'positive','some',['meds'])
    const opened=makeAssessment({meds_manage:'yes'},'positive','some',['meds'],['meds'])
    expect(opened.unknowns.length).toBeGreaterThan(notOpened.unknowns.length)
  })
})
