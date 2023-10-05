
import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';


const auth0Audience = process.env.AUTH0_AUDIENCE
export const GET = handleAuth({
    login: handleLogin({
        returnTo: "/",
        authorizationParams: {
            audience: auth0Audience, // or YOUR AUTH0_AUDIENCE
            // IS CRUCIAL FOR THE CORRECT FUNCTIONING OF THE AUTH0 TOKEN
        }
    })
});