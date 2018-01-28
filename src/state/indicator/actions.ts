import * as constants from './constants'

/**
 * Select or deselect indicator interface with payload
 */
export interface IndicatorSelection {
    type: constants.INDICATOR_SELECT;
    payload: {
        id: string
        selected: boolean
    }
}

export interface IndicatorUpdate {
    type: constants.INDICATOR_UPDATE;
    payload: {
        id: string
        selected: boolean
        weight: number
    }
}

export type IncrementAction = IndicatorSelection | IndicatorUpdate;

/**
 * Select indicator for ranking
 * @param {string} id of indicator
 * @returns {IndicatorSelection}
 */
export function selectIndicator(id: string): IndicatorSelection {
    return {
        type: constants.INDICATOR_SELECT,
        payload: {
            id,
            selected: true,
        }
    };
}

/**
 * Select indicator for ranking
 * @param {string} id of indicator
 * @returns {IndicatorSelection}
 */
export function deselectIndicator(id: string): IndicatorSelection {
    return {
        type: constants.INDICATOR_SELECT,
        payload: {
            id,
            selected: false,
        }
    };
}