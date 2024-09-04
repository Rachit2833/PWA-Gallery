import { useSignIn } from "../_Lib/actions"
import { signIn } from "../_Lib/auth"

function SignInButton({page}) {
   return (
      <form action={useSignIn}>
         <input style={{display:"none"}} name="page" type="text" value={page} />
         <button class="sign-in-button">
            <img
               src="https://authjs.dev/img/providers/google.svg"
               alt="Google logo"
               class="logo"
            />
            <span>Continue with Google</span>
         </button>
      </form>
   )
}

export default SignInButton
