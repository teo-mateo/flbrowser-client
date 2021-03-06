import Axios from 'axios'
import CookieUtil from './CookieUtil'

var api = function(url){

    if (window.location.hostname.startsWith("127.0.0.1") || window.location.hostname.startsWith("localhost")){
        return "http://localhost:8888" + url;
    } else {
        return window.location.origin + "/flbrowser" + url;
    }

    return ApiRoot + url
}



module.exports = {

    getSecureOptionsObject: function(){
        let accessToken = CookieUtil.GetAccessTokenFromCookie();
        return {
            headers: {
                'FLAccessToken': accessToken
            }
        };
    },
    ping: function(){
        return Axios.get(api("/ping"), this.getSecureOptionsObject() );
    },
    login: function(obj){
        return Axios.post(api("/login"), obj);
    },
    logout(){
        let accessToken = CookieUtil.GetAccessTokenFromCookie();
        return Axios.post(api('/logout/'+accessToken))
    },
    getCategories : function(){
        
        return Axios.get(api("/categories"), this.getSecureOptionsObject() );
    },
    getRtrTorrents : function(){
        return Axios.get(api("/torrents/rtr"), this.getSecureOptionsObject() );
    },
    getFlTorrents: function(category, page){
        console.log("--getFLTorrents, category:"+category+", page:"+page);
        return Axios.get(api("/torrents/fl/"+category+"/"+page), this.getSecureOptionsObject() );
    },
    downloadTorrent: function(id){
        return Axios.post(api("/torrents/fl/"+id+"/download"), {}, this.getSecureOptionsObject() );
    }, 
    searchFlTorrents: function(searchTerm, category, page){
        console.log("--searchFlTorrents, searchTerm: " + searchTerm + ", category: " + category + ", page: " + page);
        return Axios.get(
            api("/torrents/fl/search/"+searchTerm+"/"+category+"/"+page), 
            this.getSecureOptionsObject() 
        );
    }, 

    rtrAction: function(id, action){
        switch(action){
            case "open":
            case "close":
            case "resume":
            case "pause":
            case "start":
            case "stop":
            case "erase":
                console.log("--rtr_Action " + action + " " + id);
                return Axios.post(api("/torrents/rtr/"+id+"/"+action), {}, this.getSecureOptionsObject() );
                break;
            default:
                throw("--rtr_Action : bad action: " + action );

        }
        
    }

}