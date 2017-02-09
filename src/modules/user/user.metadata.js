
export default {
  title: 'User',
  listTitle: 'Users',
  resource: 'users',
  schema: {
    type: 'object',
    properties: {
      _id: {
        title: 'id',
        type: 'string',
      },
      username: {
        type: 'string',
        minLength: 1,
      },
      password: {
        type: 'string',
        minLength: 1,
      },
      name: {
        type: 'string',
        minLength: 1,
      },
    },
  },
  list: {
    _id: {
    },
    username: {
      sortable: true,
    },
    name: {
      sortable: true,
    },
  },
  editForm: {
    username: {
    },
    password: {
      inputType: 'password',
    },
    name: {
    },
  },
};
