export default {
  token: 123,

  AuthService: {
    updateToken: (n) => {
      console.log("token atualizado", n);
      return; // <-- fake token returned!
    },
  },
};
