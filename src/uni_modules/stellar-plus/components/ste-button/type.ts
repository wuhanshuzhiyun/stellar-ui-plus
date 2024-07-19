export const modeType = [100, 200, 300, 400] as const
export type ModeType = (typeof modeType)[number]
