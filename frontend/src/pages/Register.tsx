import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import registerUserService from "@/services/registerUserService";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router";
import z from "zod";
function Register() {

    function RegisterAlert() {
        return (
            <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>I didn't work this time</AlertTitle>
                <AlertDescription>
                    <p>Please enter a valid email this time.</p>
                </AlertDescription>
            </Alert>
        )
    }
    const registerFormSchema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.email().min(1, "Email is required"),
        password: z.string().min(8, "Password must be at least 8 characters")
    });
    type FormData = z.infer<typeof registerFormSchema>;
    const { registerUser } = registerUserService;
    const [registerError, setRegisterError] = useState(false)
    const navigate = useNavigate();
    const form = useForm<FormData>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })
    const { login } = useAuth();
    const onSubmit = async ({ name, email, password }: FormData) => {
        try {
            console.log("Registering user:", { name, email, password });
            const user = await registerUser(email, password, name);

            if (user) {
                await login(email, password);
                setRegisterError(false);
                navigate("/home");
            }

        }
        catch (error) {
            setRegisterError(true);
            console.error("Error during registration:", error);
        }
    };

    return (
        <div className="grid grid-rows-2 w-full gap-0 register_bg_section">
            <section className="flex items-center justify-center min-[1200px]:bg-blue-100 min-[1200px]:w-[50%] pt-10 pb-10">
                <div className="bg-white p-6 rounded-2xl shadow-md] w-3xl max-w-[500px] min-w-[250px] mr-8 ml-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <h1 className="text-4xl mb-16 mt-10">
                                Sign Up
                            </h1>
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Jhon Doe"
                                                        type="text"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="jhon.doe@gmail.com"
                                                        type="email"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="********"
                                                        type="password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <Button type="submit" className="w-full mt-8 mb-4">
                                Create Account
                            </Button>
                            {registerError && <RegisterAlert />}
                        </form>
                    </Form>
                </div>
            </section>
            <section className="flex items-center justify-center  text-white relative min-[1200px]:w-[50%]">
                <div className="flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-4xl font-bold mb-4 mr-4 ml-4">
                        Welcome to M3 Industry
                    </h1>
                    <p className="mb-0">
                        Architecture | Engineering | Construction Managment
                    </p>
                </div>
                <footer className="absolute bottom-0">

                    <div className="flex flex-row gap-4 justify-center items-center mt-2 mb-2 text-xl">
                        <a href="https://www.x.com/ByLy23_/" target="blank" rel="noopener noreferrer">
                            <FaXTwitter />
                        </a>
                        <a href="https://www.github.com/byly23/" target="blank" rel="noopener noreferrer">
                            <FaGithub />
                        </a>
                        <a href="https://www.linkedin.com/in/byronorellana-byly23/" target="blank" rel="noopener noreferrer">
                            <FaLinkedin />
                        </a>
                    </div>
                    <div className="text-xs mb-2">
                        <p>
                            &copy; 2025 | Created by ByLy23
                        </p>

                    </div>
                </footer>
            </section>
        </div>
    )
}
export default Register;