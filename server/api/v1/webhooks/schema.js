/**
 * JSON Schema Creator: https://www.liquid-technologies.com/online-json-to-schema-converter
 *
 */

exports.testSchema = {
  'type': 'object',
  'properties': {
    'name': {'type': 'string'},
    'votes': {'type': 'integer', 'minimum': 1}
  },
  'required': ['votes']
}

exports.textMessageSchema = {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  'type': 'object',
  'properties': {
    'messages': {
      'type': 'array',
      'items': [
        {
          'type': 'object',
          'properties': {
            'from': {
              'type': 'string'
            },
            'id': {
              'type': 'string'
            },
            'timestamp': {
              'type': 'string'
            },
            'text': {
              'type': 'object',
              'properties': {
                'body': {
                  'type': 'string'
                }
              },
              'required': [
                'body'
              ]
            },
            'type': {
              'type': 'string'
            }
          },
          'required': [
            'from',
            'id',
            'timestamp',
            'text',
            'type'
          ]
        }
      ]
    }
  },
  'required': [
    'messages'
  ]
}

exports.locationMessageSchema = {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  'type': 'object',
  'properties': {
    'messages': {
      'type': 'array',
      'items': [
        {
          'type': 'object',
          'properties': {
            'from': {
              'type': 'string'
            },
            'id': {
              'type': 'string'
            },
            'location': {
              'type': 'object',
              'properties': {
                'address': {
                  'type': 'string'
                },
                'latitude': {
                  'type': 'number'
                },
                'longitude': {
                  'type': 'number'
                },
                'name': {
                  'type': 'string'
                },
                'url': {
                  'type': 'string'
                }
              },
              'required': [
                'address',
                'latitude',
                'longitude',
                'name',
                'url'
              ]
            },
            'timestamp': {
              'type': 'string'
            },
            'type': {
              'type': 'string'
            }
          },
          'required': [
            'from',
            'id',
            'location',
            'timestamp',
            'type'
          ]
        }
      ]
    }
  },
  'required': [
    'messages'
  ]
}

exports.imageMessageSchema = {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  'type': 'object',
  'properties': {
    'messages': {
      'type': 'array',
      'items': [
        {
          'type': 'object',
          'properties': {
            'from': {
              'type': 'string'
            },
            'id': {
              'type': 'string'
            },
            'image': {
              'type': 'object',
              'properties': {
                'file': {
                  'type': 'string'
                },
                'id': {
                  'type': 'string'
                },
                'mime_type': {
                  'type': 'string'
                },
                'sha256': {
                  'type': 'string'
                },
                'caption': {
                  'type': 'string'
                }
              },
              'required': [
                'file',
                'id',
                'mime_type',
                'sha256'
              ]
            },
            'timestamp': {
              'type': 'string'
            },
            'type': {
              'type': 'string'
            }
          },
          'required': [
            'from',
            'id',
            'image',
            'timestamp',
            'type'
          ]
        }
      ]
    }
  },
  'required': [
    'messages'
  ]
}

exports.documentMessageSchema = {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  'type': 'object',
  'properties': {
    'messages': {
      'type': 'array',
      'items': [
        {
          'type': 'object',
          'properties': {
            'from': {
              'type': 'string'
            },
            'id': {
              'type': 'string'
            },
            'timestamp': {
              'type': 'string'
            },
            'type': {
              'type': 'string'
            },
            'document': {
              'type': 'object',
              'properties': {
                'caption': {
                  'type': 'string'
                },
                'file': {
                  'type': 'string'
                },
                'id': {
                  'type': 'string'
                },
                'mime_type': {
                  'type': 'string'
                },
                'sha256': {
                  'type': 'string'
                }
              },
              'required': [
                'caption',
                'file',
                'id',
                'mime_type',
                'sha256'
              ]
            }
          },
          'required': [
            'from',
            'id',
            'timestamp',
            'type',
            'document'
          ]
        }
      ]
    }
  },
  'required': [
    'messages'
  ]
}

exports.voiceMessageSchema = {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  'type': 'object',
  'properties': {
    'messages': {
      'type': 'array',
      'items': [
        {
          'type': 'object',
          'properties': {
            'from': {
              'type': 'string'
            },
            'id': {
              'type': 'string'
            },
            'timestamp': {
              'type': 'string'
            },
            'type': {
              'type': 'string'
            },
            'voice': {
              'type': 'object',
              'properties': {
                'file': {
                  'type': 'string'
                },
                'id': {
                  'type': 'string'
                },
                'mime_type': {
                  'type': 'string'
                },
                'sha256': {
                  'type': 'string'
                }
              },
              'required': [
                'file',
                'id',
                'mime_type',
                'sha256'
              ]
            }
          },
          'required': [
            'from',
            'id',
            'timestamp',
            'type',
            'voice'
          ]
        }
      ]
    }
  },
  'required': [
    'messages'
  ]
}

exports.audioMessageSchema = {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  'type': 'object',
  'properties': {
    'messages': {
      'type': 'array',
      'items': [
        {
          'type': 'object',
          'properties': {
            'from': {
              'type': 'string'
            },
            'id': {
              'type': 'string'
            },
            'timestamp': {
              'type': 'string'
            },
            'type': {
              'type': 'string'
            },
            'audio': {
              'type': 'object',
              'properties': {
                'file': {
                  'type': 'string'
                },
                'id': {
                  'type': 'string'
                },
                'mime_type': {
                  'type': 'string'
                },
                'sha256': {
                  'type': 'string'
                },
                'caption': {
                  'type': 'string'
                }
              },
              'required': [
                'file',
                'id',
                'mime_type',
                'sha256',
                'caption'
              ]
            }
          },
          'required': [
            'from',
            'id',
            'timestamp',
            'type',
            'audio'
          ]
        }
      ]
    }
  },
  'required': [
    'messages'
  ]
}

exports.videoMessageSchema = {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  'type': 'object',
  'properties': {
    'messages': {
      'type': 'array',
      'items': [
        {
          'type': 'object',
          'properties': {
            'from': {
              'type': 'string'
            },
            'id': {
              'type': 'string'
            },
            'timestamp': {
              'type': 'string'
            },
            'type': {
              'type': 'string'
            },
            'video': {
              'type': 'object',
              'properties': {
                'file': {
                  'type': 'string'
                },
                'id': {
                  'type': 'string'
                },
                'mime_type': {
                  'type': 'string'
                },
                'sha256': {
                  'type': 'string'
                },
                'caption': {
                  'type': 'string'
                }
              },
              'required': [
                'file',
                'id',
                'mime_type',
                'sha256',
                'caption'
              ]
            }
          },
          'required': [
            'from',
            'id',
            'timestamp',
            'type',
            'video'
          ]
        }
      ]
    }
  },
  'required': [
    'messages'
  ]
}

exports.groupNotificationsSchema = {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  'type': 'object',
  'properties': {
    'messages': {
      'type': 'array',
      'items': [
        {
          'type': 'object',
          'properties': {
            'from': {
              'type': 'string'
            },
            'group_id': {
              'type': 'string'
            },
            'id': {
              'type': 'string'
            },
            'timestamp': {
              'type': 'string'
            },
            'system': {
              'type': 'object',
              'properties': {
                'body': {
                  'type': 'string'
                }
              },
              'required': [
                'body'
              ]
            },
            'type': {
              'type': 'string'
            }
          },
          'required': [
            'from',
            'group_id',
            'id',
            'timestamp',
            'system',
            'type'
          ]
        }
      ]
    }
  },
  'required': [
    'messages'
  ]
}

exports.messageStatusSchema = {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  'type': 'object',
  'properties': {
    'statuses': {
      'type': 'array',
      'items': [
        {
          'type': 'object',
          'properties': {
            'id': {
              'type': 'string'
            },
            'recipient_id': {
              'type': 'string'
            },
            'status': {
              'type': 'string'
            },
            'timestamp': {
              'type': 'string'
            }
          },
          'required': [
            'id',
            'recipient_id',
            'status',
            'timestamp'
          ]
        }
      ]
    }
  },
  'required': [
    'statuses'
  ]
}
