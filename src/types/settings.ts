import type { RxJsonSchema } from 'rxdb'

export interface Setting {
  key: string
  value: string
}

export const settingsSchema: RxJsonSchema<Setting> = {
  version: 0,
  primaryKey: 'key',
  type: 'object',
  properties: {
    key: {
      type: 'string',
      maxLength: 100,
    },
    value: {
      type: ['string', 'number', 'boolean'],
    },
  },
  required: ['key', 'value'],
}
