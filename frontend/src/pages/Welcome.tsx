import { Button } from "@/components/ui/button";
import { DialogClose, DialogDescription, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import type { UserInterface } from "@/interface/UserInterface";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";

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
    const form = useForm<FormData>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const { login } = useAuth();
    const onSubmit = async ({ email, password }: FormData) => {
        if (email === "jhon@doe.com" && password === "jhon1234") {
            const user: UserInterface = {
                id: 3,
                name: "Byron",
                email: "Byron@gmail.com",
                plaidToken: "plaid-box-239847329dj2oijhoiedjsd8923ud",
            }
            setLoginError(false);
            await login(user);
            navigate("/home");
        }
        else {
            setLoginError(true);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center h-screen ">
            <h1 className="text-4xl font-bold text-center">
                Welcome to the Personal Finance App
            </h1>
            <p className="mt-2 mb-4 text-lg text-center">
                Manage your finances, track expenses, and achieve your financial goals.
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
                                    {/* 4. Uso correcto de FormField para el email */}
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
                                    {/* 5. Uso correcto de FormField para la contraseña */}
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
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Close</Button>
                                    </DialogClose>
                                    <Button type="submit" >
                                        Log In
                                        {/* <Link to="/dashboard">
                                            Log In
                                        </Link> */}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
                <Button variant="outline">
                    <Link to="/register">
                        Sing Up
                    </Link>
                </Button>
            </div>
        </div>
    )
}
export default Welcome;