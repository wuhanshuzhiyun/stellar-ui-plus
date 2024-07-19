export const positionType = ['topRight', 'topLeft', 'bottomLeft', 'bottomRight'] as const
export type PositionType = (typeof positionType)[number]
