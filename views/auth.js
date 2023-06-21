const ui = new firebaseui.auth.AuthUI(firebase.auth());
// const urlJounralHomePageURl="http://localhost:2100"
// const urlJounralHomePageURl="http://192.168.147.10:2100"
let id=''
let userName=''


const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      

      id=authResult.user.uid
      userName=authResult.user.displayName
      
      AsyncPostData()
      .then(data => window.location.href = data)
      .catch(err => console.log(err),)

      return false;
    },
    
  },
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
   
  ],
};

  async function AsyncPostData() {
    // urlJounralHomePageURl+
        const response = await fetch('/SignIn', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({id,userName})
        });


        return response;
    }
ui.start('#firebaseui-auth-container', uiConfig)


