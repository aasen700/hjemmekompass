import type { Answers } from '../data/assessment'
import { moduleById } from '../data/modules'

/** Flags detailed answers that no longer correspond with explicit screening answers. */
export function findFollowUpConflicts(answers:Answers,selectedTopics:string[]):string[]{
  const conflicts:string[]=[]
  for(const id of selectedTopics){
    const module=moduleById[id]
    if(!module)continue
    for(const q of module.deep){
      if(!q.when)continue
      const answer=answers[q.id]??'unknown'
      const parent=answers[q.when.id]??'unknown'
      if(answer==='unknown'||parent==='unknown'||q.when.values.includes(parent))continue
      const screening=module.screening.find(item=>item.id===q.when?.id)
      conflicts.push(module.title+': Kontroller «'+q.title+'» mot grunnsvaret «'+(screening?.title??q.when.id)+'».')
    }
  }
  return [...new Set(conflicts)]
}
