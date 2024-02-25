import { MenuCategoryTypeEnum } from '../enum'
import { getKeyByValue } from './get-key-by-value.helper'

export const getMenuCategoryStringValue = (category: number): string => getKeyByValue(category, MenuCategoryTypeEnum)
