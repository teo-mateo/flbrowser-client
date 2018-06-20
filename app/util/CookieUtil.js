import Cookies from 'universal-cookie'

const ucookie = new Cookies();
const accessTokenCookieName = "flbrowser-access-token";
const usernameCookieName = "flbrowser-username";
const passwordCookieName = "flbrowser-password";

module.exports = {
    GetAccessTokenFromCookie: function(){
        let atc = ucookie.get(accessTokenCookieName);
        console.log("Access token cookie: ", atc);
        return atc;
    },
    SetAccessTokenCookie: function(accessToken, expires){
        ucookie.set(accessTokenCookieName, accessToken, {
            path: '/',
            expires: expires
        });
    }, 
    RemoveAccessTokenCookie: function(){
        ucookie.remove(accessTokenCookieName);
    }, 
    GetUsernamePasswordFromCookie: function(){
        return {
            username: ucookie.get(usernameCookieName),
            password: ucookie.get(passwordCookieName)
        };
    },
    SetUsernamePasswordCookie: function(username, password){
        ucookie.set(usernameCookieName, username, {
            path: '/', 
            expires: new Date(Date.now()+30*24*3600*1000)
        });
        ucookie.set(passwordCookieName, password, {
            path: '/', 
            expires: new Date(Date.now()+30*24*3600*1000)
        });
    }, 
    RemoveUsernamePasswordCookie: function(){
        ucookie.remove(usernameCookieName);
        ucookie.remove(passwordCookieName);
    }

}