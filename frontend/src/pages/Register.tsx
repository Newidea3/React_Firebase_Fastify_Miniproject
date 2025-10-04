import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
function Register() {
    return (
        <div className="grid grid-rows-2 w-full gap-0 register_bg_section">
            <section className="flex items-center justify-center min-[1200px]:bg-blue-100 min-[1200px]:w-[50%] pt-10 pb-10">
                <div className="bg-white p-6 rounded-2xl shadow-md] w-3xl max-w-[500px] min-w-[250px] mr-8 ml-8">
                    <form>
                        <h1 className="text-4xl mb-16 mt-10">
                            Sign Up
                        </h1>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="username-1">
                                    Username
                                </Label>
                                <Input id="username-1" name="text" type="text" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email-1">
                                    Email
                                </Label>
                                <Input id="email-1" name="email" type="email" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password-1">
                                    Password
                                </Label>
                                <Input id="password-1" name="password" type="password" />
                            </div>
                        </div>
                        <Button type="submit" className="w-full mt-8 mb-4">
                            Create Account
                        </Button>
                    </form>
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