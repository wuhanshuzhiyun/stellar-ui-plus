export const unitType = ['fen', 'yuan'] as const
export type UnitType = (typeof unitType)[number]
export const digitsType = [-1, 0, 1, 2] as const
export type DigitsType = (typeof digitsType)[number]
export const styleType = [1, 2, 3] as const
export type StyleType = (typeof styleType)[number]
