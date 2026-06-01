'use client'

import React, { useState, Suspense } from 'react';
import { Check } from "@gravity-ui/icons";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { MdAppRegistration } from "react-icons/md";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from "react-hot-toast";

const LoginFormContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get('redirect') || "/";

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password
        });

        if (data) {
            toast.success("Login successful!");
            router.push(redirectUrl);
        }
        if (error) {
            toast.error(error.message);
        }
    }

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: redirectUrl
        });
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#0f172a] p-6 text-white relative overflow-hidden">
            <div className="w-full max-w-md bg-[#131e35]/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl relative z-10">

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-[#FF9505] bg-clip-text text-transparent">
                        Welcome Back
                    </h2>
                    <p className="text-sm text-slate-400 mt-2">Login to access your pet dashboard</p>
                </div>

                <Form className="flex flex-col gap-5" onSubmit={onSubmit}>

                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        className="w-full"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1 block">Email</Label>
                        <Input
                            placeholder="Enter your email address"
                            className="w-full bg-[#0b1120] border border-slate-800 hover:border-slate-700 focus-within:!border-[#FF9505] h-11 rounded-xl transition-all px-3 text-sm text-white focus:outline-none"
                        />
                        <FieldError className="text-xs text-red-400 mt-1" />
                    </TextField>

                    <TextField
                        isRequired
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className="w-full"
                    >
                        <Label className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1 block">Password</Label>
                        <div className="relative w-full">
                            <Input
                                placeholder="Enter your password"
                                type={showPassword ? "text" : "password"}
                                className="w-full bg-[#0b1120] border border-slate-800 hover:border-slate-700 focus-within:!border-[#FF9505] h-11 rounded-xl transition-all pl-3 pr-10 text-sm text-white focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 focus:outline-none cursor-pointer"
                            >
                                {showPassword ? (
                                    <FaEyeSlash className="text-sm transition-colors" />
                                ) : (
                                    <FaEye className="text-sm transition-colors" />
                                )}
                            </button>
                        </div>
                        <FieldError className="text-xs text-red-400 mt-1" />
                    </TextField>

                    <div className="flex flex-col gap-3 mt-4">
                        <Button
                            type="submit"
                            className="w-full h-11 bg-[#FF9505] hover:bg-[#e08304] text-slate-950 font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#FF9505]/20 cursor-pointer"
                        >
                            <Check className="text-lg stroke-[3]" />
                            Login
                        </Button>

                        <div className="relative flex items-center justify-center my-1">
                            <div className="border-t border-slate-800 w-full"></div>
                            <span className="bg-[#131e35] px-3 text-xs text-slate-500 absolute">OR</span>
                        </div>

                        <Button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="w-full h-11 rounded-xl border border-slate-800 bg-[#070b19]/60 hover:bg-slate-800/60 hover:border-slate-700 text-slate-200 font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <FcGoogle className="text-lg" />
                            Continue with Google
                        </Button>
                    </div>
                </Form>

                <div className="mt-6 text-center">
                    <Link href="/register" className="text-sm text-slate-400 hover:text-slate-200 transition-colors inline-flex items-center gap-1.5 group">
                        Don't have an account? <span className="font-bold text-[#FF9505] group-hover:underline inline-flex items-center gap-0.5">Register <MdAppRegistration className="text-base" /></span>
                    </Link>
                </div>

            </div>
        </div>
    );
};

const LoginPage = () => {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-slate-100">
                <span className="loading loading-spinner text-[#FF9505] loading-lg"></span>
            </div>
        }>
            <LoginFormContent />
        </Suspense>
    );
};

export default LoginPage;