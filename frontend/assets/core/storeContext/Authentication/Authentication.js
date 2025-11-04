  import secure from "../../../../../app/core/secure";
  
  function Authenticate (set, get) {
    // console.log(`user ${user.username} login confirmed`);
    secure.set("credentials", credentials);
    secure.set("tokens", tokens);
    set((state) => ({
      authenticated: true,
      agreementChecked: user.agreement && true,
      signUpComplete: user.first_name && true,
      user: user,
    }));
  }


export const LoginAuth = {
    login
  };