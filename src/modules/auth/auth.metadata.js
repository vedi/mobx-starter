
export default {
  fields: {
    username: {
      default: '',
      rules: 'required',
    },
    password: {
      default: '',
      rules: 'required',
      options: { type: 'password' },
    },
  },
};
