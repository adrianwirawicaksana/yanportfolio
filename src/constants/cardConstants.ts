/**
 * Configuration for card rotation animation
 */
export const CARD_ROTATIONS = [-20, -10, 0, 10, 20] as const;
export const MOBILE_CARD_ROTATIONS = [-12, 0, 12] as const;

/**
 * Configuration for card vertical offset
 */
export const CARD_Y_OFFSETS = [40, 20, 0, 20, 40] as const;
export const MOBILE_CARD_Y_OFFSETS = [15, 0, 15] as const;

/**
 * Configuration for card scale
 */
export const CARD_SCALES = [1, 1, 1, 1, 1] as const;
export const MOBILE_CARD_SCALES = [0.95, 1.15, 0.95] as const;

/**
 * Negative horizontal margin offset between cards (for overlap effect)
 */
export const CARD_MARGIN_OFFSET = -80 as const;
export const MOBILE_CARD_MARGIN_OFFSET = -50 as const;

/**
 * Number of top rare cards to display
 */
export const TOP_CARDS_COUNT = 5 as const;

/**
 * Number of top rare cards to display mobile
 */
export const TOP_CARDS_COUNT_IN_MOBILE = 3 as const;
