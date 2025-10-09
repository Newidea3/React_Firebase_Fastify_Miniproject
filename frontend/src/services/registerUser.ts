import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/config";

async function registerUser(email:string, password:string, name:string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userDoc = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDoc);

    if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role: "user",
        clicks: 0,
        provider: "local",
        createdAt: new Date()
    });
    }
    

    return user;
}

async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    const userDoc = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDoc);

    if (!docSnap.exists()) {
        await setDoc(userDoc, {
            name: user.displayName,
            email: user.email,
            provider: "google",
            role: "user",
            clicks: 0,
            createdAt: new Date(),
        });
    }

    return user;
}

export default { registerUser, signInWithGoogle };