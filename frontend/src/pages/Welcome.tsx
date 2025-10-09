import { Button } from "@/components/ui/button";
import { DialogDescription, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { FaGoogle } from "react-icons/fa6";
import registerUser from "@/services/registerUser";



const loginFormSchema = z.object({
    email: z.email().min(1, "Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters")
});

type FormData = z.infer<typeof loginFormSchema>;

function LoginAlert() {
    return (
        <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>I didn't work this time</AlertTitle>
            <AlertDescription>
                <p>Please verify your password or email and try again.</p>
            </AlertDescription>
        </Alert>
    )
}
function Welcome() {
    const [loginError, setLoginError] = useState(false)
    const navigate = useNavigate();
    const { signInWithGoogle } = registerUser;
    const form = useForm<FormData>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const { login } = useAuth();
    const onSubmit = async ({ email, password }: FormData) => {
        try {
            await login(email, password);
            setLoginError(false);
            navigate("/home");
        }
        catch (error) {
            setLoginError(true);
            console.error("Error during login:", error);
        }
    };
    const handleSubmitGoogle = async () => {
        try {
            const user = await signInWithGoogle();
            console.log("Google user:", user);
            if (user) setLoginError(false);
            navigate("/home");
        } catch (error) {
            console.error("Error during Google sign-in:", error);
        }

    };
    return (
        <div className="flex flex-col items-center justify-center h-screen ">
            <h1 className="text-4xl font-bold text-center">
                Welcome to the Click register app
            </h1>
            <p className="mt-2 mb-4 text-lg text-center">
                See how many clicks do often a day.
            </p>
            <div className="flex flex-row gap-4 justify-center items-center">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            Log In
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="w-full max-w-md p-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <DialogHeader>
                                    <DialogTitle>Log In</DialogTitle>
                                    <DialogDescription>
                                        Please enter your credentials.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="email@example.com"
                                                        type="email"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="••••••••"
                                                        type="password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {loginError && <LoginAlert />}
                                    <DialogDescription className="text-indigo-500">
                                        <Link to="/">Forgot your password?</Link>
                                    </DialogDescription>
                                    <DialogDescription>
                                        Don't have an account? <Link className="text-indigo-500" to="/register">Sign Up</Link>
                                    </DialogDescription>
                                </div>
                                <DialogFooter className="mt-4">
                                    <div className="grid gap-2 w-full">
                                        <Button type="submit" >
                                            Log In
                                        </Button>
                                        <span className="text-center text-gray-800 grid grid-cols-3 items-center">
                                            <Separator orientation="horizontal" />
                                            or
                                            <Separator orientation="horizontal" />
                                        </span>
                                        <Button onClick={handleSubmitGoogle} type="button" variant="secondary">
                                            <FaGoogle />  Login with Google
                                        </Button>
                                    </div>
                                    {/* <DialogClose asChild>
                                        <Button variant="outline">Close</Button>
                                    </DialogClose> */}

                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
                <Button variant="outline">
                    <Link to="/register">
                        Sign Up
                    </Link>
                </Button>
            </div>
        </div>
    )
}
export default Welcome;