class AuthError extends Error{
    constructor(status, message){
        super();
        this.status = status;
        if(status === 400){
            this.message = 'Invalid credentials'
        }else if(status === 401){
            this.message = 'Not authenticated'
        }else if(status === 403){
            this.message = 'Unauthorized'
        }else if(status === 409){
            this.message = 'Email already in use'
        }else{
            this.message = message || 'Authentication error'
        }
    }
}

export default AuthError;