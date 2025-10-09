import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const createAccount = getAuth({ email, password });
createUserWithEmailAndPassword(createAccount, email, password)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });

export default createAccount;