import { describe, expect, it } from 'vitest'
import { solutions, referenceLinks } from './library'

describe('tiltaksbibliotek v0.4', () => {
  it('contains a substantial variety of technology and aids', () => {
    expect(solutions.length).toBeGreaterThanOrEqual(80)
    expect(solutions.filter(s => s.kind==='technology').length).toBeGreaterThan(35)
    expect(solutions.filter(s => s.kind==='aid').length).toBeGreaterThan(25)
    expect(solutions.some(s => s.kind==='nontech')).toBe(true)
  })
  it('keeps unique IDs and valid category metadata', () => {
    expect(new Set(solutions.map(s=>s.id)).size).toBe(solutions.length)
    expect(solutions.every(s=>s.title.trim()&&s.group.trim()&&s.intro.trim())).toBe(true)
  })
  it('every entry contains review information and linked source IDs', () => {
    const ids=new Set(referenceLinks.map(x=>x.id))
    for(const s of solutions){
      expect(s.before.length).toBeGreaterThan(0)
      expect(s.limitations.length).toBeGreaterThan(0)
      expect(s.alternatives.length).toBeGreaterThan(0)
      expect(s.followUp.length).toBeGreaterThan(0)
      expect(s.sourceIds.length).toBeGreaterThan(0)
      expect(s.sourceIds.every(id=>ids.has(id))).toBe(true)
    }
  })
  it('includes the specifically requested practical aids', () => {
    for(const term of ['Doff','Søsterhjelp','toalettstol']){
      expect(solutions.some(s=>s.title.toLocaleLowerCase('nb-NO').includes(term.toLocaleLowerCase('nb-NO')))).toBe(true)
    }
    expect(solutions.find(s=>s.id==='compression-doff')?.searchTerms).toContain('doffen')
    expect(solutions.find(s=>s.id==='toilet-commode')?.searchTerms).toContain('dostol')
  })
  it('shows no misleading automatic endorsement in aid metadata', () => {
    for(const s of solutions.filter(s=>s.kind==='aid')){
      expect(s.before.join(' ')).not.toBe('')
      expect(s.limitations.join(' ')).not.toBe('')
    }
  })
})
