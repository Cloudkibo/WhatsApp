exports.testSchema = {
  'type': 'object',
  'properties': {
    'name': {'type': 'string'},
    'votes': {'type': 'integer', 'minimum': 1}
  },
  'required': ['votes']
}
