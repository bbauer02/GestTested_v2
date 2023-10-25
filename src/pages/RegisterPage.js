import RegisterSteppers from "../sections/auth/register/RegisterSteppers";
import RegisterFormContextProvider from "../contexts/RegisterFormContext";

export default function RegisterPage() {

    return (
       <>
           <RegisterFormContextProvider >
                <RegisterSteppers />
           </RegisterFormContextProvider>
       </>
    );
}
