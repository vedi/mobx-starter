
export default {
  fields: {
    _id: {
      label: 'id',
      showInTable: true,
    },
    username: {
      default: '',
      rules: 'required',
      showInForm: true,
      showInTable: true,
    },
    password: {
      default: '',
      rules: 'required',
      inputType: 'password',
      showInForm: true,
    },
  },
  title: 'User',
  listTitle: 'Users',
  resource: 'users',
};
