'use client'
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";

import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { MdAppRegistration } from "react-icons/md";

const LoginPage = () => {

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password
        })
        console.log(data, error);
        if (data) {
            redirect("/");
        }
        if (error) {
            alert(error.message);
        }

    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#0f172a] p-4 text-white relative overflow-hidden">
            <Link href="/register" className="text-xs text-slate-500 mt-2 text-center hover:text-slate-300 transition-colors duration-300">
                Already have an account? <span className="font-bold text-[#FF9505] cursor-pointer hover:text-blue-500">Register <MdAppRegistration />
                </span> here
            </Link>
            <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" />
                    <FieldError />
                </TextField>
                <TextField
                    isRequired
                    minLength={8}
                    name="password"
                    type="password"
                    validate={(value) => {
                        if (value.length < 8) {
                            return "Password must be at least 8 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }
                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }
                        return null;
                    }}
                >
                    <Label>Password</Label>
                    <Input placeholder="Enter your password" />
                    <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                    <FieldError />
                </TextField>
                <div className="flex gap-2">
                    <Button type="submit">
                        <Check />
                        Login
                    </Button>
                    <Button
                        className="w-full h-11 rounded-xl border border-slate-800 bg-[#070b19] hover:bg-slate-800/40 hover:border-slate-700 text-slate-300 font-semibold text-sm transition-all flex items-center justify-center gap-2 mt-2">
                        <FcGoogle className="text-lg" />
                        Continue with Google
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default LoginPage;