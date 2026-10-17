import { describe, expect, it } from 'vitest'
import { makeAssessment } from './recommendations'

describe('transparent decision support', () => {
  it('does not propose specific measures when every answer is unknown', () => {
    const r = makeAssessment({}, 'unknown', 'unknown')
    expect(r.suggestions).toHaveLength(0)
    expect(r.screeningAnswered).toBe(0)
    expect(r.unknowns.length).toBeGreaterThan(0)
  })
  it('considers fall prevention and alarm suitability after fall and inability to call', () => {
    const r = makeAssessment({ recent_fall: 'yes', can_call: 'no' }, 'positive', 'some')
    expect(r.suggestions.map(s => s.id)).toContain('fall-prevention')
    expect(r.suggestions.find(s => s.id === 'alarm')?.caution).toBeTruthy()
    expect(r.suggestions.map(s => s.id)).toContain('fall-sensor')
  })
  it('respects a refusal of technology', () => {
    const r = makeAssessment({ recent_fall: 'yes', can_call: 'no' }, 'no', 'very')
    expect(r.suggestions.some(s => s.kind === 'technology')).toBe(false)
    expect(r.suggestions.map(s => s.id)).toContain('human-support')
    expect(r.suggestions.map(s => s.id)).toContain('social')
  })
  it('does not interpret unknown as no', () => {
    const r = makeAssessment({ recent_fall: 'unknown', night_fear: 'unknown' }, 'positive', 'less')
    expect(r.suggestions).toHaveLength(0)
    expect(r.unknowns.length).toBeGreaterThan(0)
  })
  it('evaluates, but never auto-approves digital night observation', () => {
    const r = makeAssessment({ night_observation: 'yes' }, 'positive', 'less')
    expect(r.suggestions.find(s => s.id === 'night-observation')?.considerations.join(' ')).toMatch(/rettslig/)
  })
})
