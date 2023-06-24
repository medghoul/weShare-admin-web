import {GoogleLogin} from 'react-google-login';
const LoginWithGoogle=()=>{
    const responseGoogle=(response)=>{
        console.log(response);
        console.log(response.profileObj);
    }
    return(
        <>
        <GoogleLogin
        clientId='604963275848-13iojhoapgn7p69ps3ufdj0312n97m34.apps.googleusercontent.com'
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        />
        </>
    );
}
export default LoginWithGoogle;