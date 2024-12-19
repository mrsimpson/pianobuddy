export interface Song {
  id: string;
  name: string;
  xmlContent: string;
  createdAt: number;
  updatedAt: number;
}

export const songSchema = {
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100
    },
    name: {
      type: 'string'
    },
    xmlContent: {
      type: 'string'
    },
    createdAt: {
      type: 'number'
    },
    updatedAt: {
      type: 'number'
    }
  },
  required: ['id', 'name', 'xmlContent', 'createdAt', 'updatedAt']
};