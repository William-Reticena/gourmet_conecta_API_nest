import { DishTypeEnum } from '../enum'
import { getKeyByValue } from './get-key-by-value.helper'

export const getDishStringValue = (category: number): string => getKeyByValue(category, DishTypeEnum)
