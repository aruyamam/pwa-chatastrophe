import { firebase } from '../firebase/firebase';

export default class NotificationResource {
   allTokens = [];
   tokensLoaded = false;
   user = null;

   constructor(messaging, database) {
      this.database = database;
      this.messaging = messaging;

      try {
         this.messaging
            .requestPermission()
            .then((res) => {
               console.log('Permission granted');
            })
            .catch((err) => {
               console.log('no access', err);
            });
      }
      catch (err) {
         console.log('No nitification support.', err);
      }

      this.setupTokenRefresh();
      this.database.ref('/fcmTokens').on('value', (snapshot) => {
         this.allTokens = snapshot.val();
         this.tokensLoaded = true;
      });
   }

   setupTokenRefresh() {
      this.messaging.onTokenRefresh(() => {
         this.saveTokenToServer();
      });
   }

   saveTokenToServer() {
      this.messaging.getToken().then((res) => {
         if (this.tokensLoaded) {
            const existingToken = this.findExistingToken(res);
            if (existingToken) {
               firebase
                  .database()
                  .ref(`/fcmTokens/${existingToken}`)
                  .set({
                     token: res,
                     user_id: this.user.uid,
                  });
            }
            else {
               this.registerToken(res);
            }
         }
      });
   }

   registerToken(token) {
      firebase
         .database()
         .ref('fcmTokens/')
         .push({
            token,
            user_id: this.user.uid,
         });
   }

   findExistingToken(tokenToSave) {
      for (const tokenKey in this.allTokens) {
         const token = this.allTokens[tokenKey].token;
         if (token === tokenToSave) {
            return tokenKey;
         }
      }

      return false;
   }

   changeUser(user) {
      this.user = user;
      this.saveTokenToServer();
   }
}
