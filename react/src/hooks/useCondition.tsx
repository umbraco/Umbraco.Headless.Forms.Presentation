import { useContext } from 'react'

import FormContext from '../providers/FormContext'
import {
  FormCondition,
  FormConditionLogicType,
  FormConditionRuleOperatorType,
  FormConditionRule,
  FormConditionActionType,
  FormData,
} from '../types'

const operatorMap = {
  [FormConditionRuleOperatorType.Contains]: (input: string) => (
    value: string | string[],
  ) => value.indexOf(input) > -1,
  [FormConditionRuleOperatorType.EndsWith]: (input: string) => (
    value: string | string[],
  ) => {
    if (Array.isArray(value)) return value.some(x => x.endsWith(input))

    return value.endsWith(input)
  },
  [FormConditionRuleOperatorType.Is]: (input: string) => (
    value: string | string[],
  ) => input === value,
  [FormConditionRuleOperatorType.IsNot]: (input: string) => (
    value: string | string[],
  ) => input !== value,
  [FormConditionRuleOperatorType.GreaterThen]: (input: string) => (
    value: string | string[],
  ) => input > value,
  [FormConditionRuleOperatorType.LessThen]: (input: string) => (
    value: string | string[],
  ) => input < value,
  [FormConditionRuleOperatorType.StartsWith]: (input: string) => (
    value: string | string[],
  ) => {
    if (Array.isArray(value)) return value.some(x => x.endsWith(input))

    return value.startsWith(input)
  },
}

const logicMap = {
  [FormConditionLogicType.All]: (rules: FormConditionRule[], data: FormData) =>
    rules.every(rule => {
      const value = data[rule.field]
      if (!value) return false
      return operatorMap[rule.operator](rule.value)(value)
    }),
  [FormConditionLogicType.Any]: (rules: FormConditionRule[], data: FormData) =>
    rules.some(rule => {
      const value = data[rule.field]
      if (!value) return false
      return operatorMap[rule.operator](rule.value)(value)
    }),
}

const useCondition = (condition?: FormCondition) => {
  const { data } = useContext(FormContext)

  if (!condition) return true
  const c = condition as FormCondition

  const result = logicMap[c.logicType](c.rules, data)

  if (c.actionType === FormConditionActionType.Show) return result

  return !result
}

export default useCondition
