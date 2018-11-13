
export default function requestMiddleware() {
  return next => action => {
    const { request, type, retryAction, ...rest } = action;

    if (!request) return next(action);

    const REQUEST = type;
    const SUCCESS = type + '_SUCCESS';
    const FAILURE = type + '_FAILURE';
    const UNAUTHORIZED = 'AUTH_UNAUTHORIZED';

    const defaults = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }      

    return fetch(request.url, {...defaults, ...request })
        .then(res => {        
            if (res.status === 204) {          
                next({ ...rest, type: SUCCESS, isLoading: false });
            } else if (res.ok) {                    
                return res.json().then(data => {
                    next({ ...rest, data, type: SUCCESS, isLoading: false })
                });
            } else if (res.status === 401) {
                return res.json().then(body => {
                    let data = body.error
                    next({ ...rest, data, type: FAILURE, isLoading: false })
                })          
            } else if (res.status == 404){
                return res.json().then(body => {
                    let data = body.error;
                    next({ ...rest, data, type: FAILURE, isLoading: false })
                })
            } else if (res.status == 500){
                return res.json().then(body=> {
                    data = body.error;
                    next({ ...rest, data, type: FAILURE, isLoading: false })
                })
            } else {            
                return res.json().then(body => {
                    let data = ""
                    if(typeof body.info === 'object'){              
                        if(body.info.email) data += "Email " + body.info.email[0] + ".\n"
                        if(body.info.password) data += "Password " + body.info.password[0] + ".\n"
                    }else{
                        if(body.info){
                        data = body.info
                        }else if(body.error){
                        data = body.error
                        }else{
                        data = ""
                        }              
                    }
                    
                    next({ ...rest, data, type: FAILURE, isLoading: false })
                })
            }
        })
        .catch(error => {
        next({ ...rest, error, type: FAILURE });
        return false;
    });
  };
}
