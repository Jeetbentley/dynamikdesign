export interface Material {
  name: string
  process: 'FDM' | 'SLA'
  strength: number // 1-5
  flexibility: number // 1-5
  heat: number // 1-5
  detail: number
  cost: number
  postProcess: number
  bestFor: string[]
}

export const materials: Material[] = [
  {
    name: 'PLA',
    process: 'FDM',
    strength: 3,
    flexibility: 1,
    heat: 1,
    detail: 3,
    cost: 5,
    postProcess: 4,
    bestFor: ['Concept models', 'Display parts', 'Jigs'],
  },
  {
    name: 'PETG',
    process: 'FDM',
    strength: 4,
    flexibility: 2,
    heat: 3,
    detail: 3,
    cost: 4,
    postProcess: 3,
    bestFor: ['Functional parts', 'Enclosures', 'Brackets'],
  },
  {
    name: 'ABS',
    process: 'FDM',
    strength: 4,
    flexibility: 2,
    heat: 4,
    detail: 3,
    cost: 4,
    postProcess: 5,
    bestFor: ['Automotive parts', 'Heat-exposed parts', 'Vapor smoothing'],
  },
  {
    name: 'ASA',
    process: 'FDM',
    strength: 4,
    flexibility: 2,
    heat: 4,
    detail: 3,
    cost: 3,
    postProcess: 4,
    bestFor: ['Outdoor parts', 'UV resistance', 'Automotive'],
  },
  {
    name: 'TPU 95A',
    process: 'FDM',
    strength: 3,
    flexibility: 5,
    heat: 2,
    detail: 2,
    cost: 3,
    postProcess: 2,
    bestFor: ['Gaskets', 'Wearables', 'Vibration damping'],
  },
  {
    name: 'Standard Resin',
    process: 'SLA',
    strength: 2,
    flexibility: 1,
    heat: 1,
    detail: 5,
    cost: 3,
    postProcess: 3,
    bestFor: ['Visual models', 'Architecture', 'Detail work'],
  },
  {
    name: 'Tough Resin',
    process: 'SLA',
    strength: 3,
    flexibility: 2,
    heat: 2,
    detail: 5,
    cost: 2,
    postProcess: 3,
    bestFor: ['Functional prototypes', 'Snap-fits', 'Medical demos'],
  },
  {
    name: 'Flexible Resin',
    process: 'SLA',
    strength: 2,
    flexibility: 5,
    heat: 1,
    detail: 4,
    cost: 2,
    postProcess: 3,
    bestFor: ['Wearables', 'Soft components', 'Grips'],
  },
  {
    name: 'Clear Resin',
    process: 'SLA',
    strength: 2,
    flexibility: 1,
    heat: 1,
    detail: 5,
    cost: 2,
    postProcess: 4,
    bestFor: ['Optics', 'Lightpipes', 'Showcase parts'],
  },
]
