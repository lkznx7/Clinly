'use client'
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { ShieldIcon, AtSignIcon, LockIcon, EyeIcon, EyeOffIcon, GoogleIcon } from './auth-icons';

const Register: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen bg-white flex">
            <div className="hidden lg:block lg:w-1/2">
                <img
                    src="/register.png"
                    alt="Cadastro"
                    className="w-full h-screen object-cover"
                />
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-sm space-y-6">
                    <div className="text-center">
                        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <ShieldIcon />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Criar Conta</h2>
                        <p className="mt-1 text-sm text-gray-500">Crie sua conta segura</p>
                    </div>

                    <div className="space-y-2">
                        <button
                            type="button"
                            onClick={() => signIn("keycloak", { callbackUrl: "/dashboard", popup: true })}
                            className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors font-medium text-sm"
                        >
                            <GoogleIcon />
                            <span className="ml-2">Cadastrar com Google</span>
                        </button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-400">ou cadastre-se com e-mail</span>
                        </div>
                    </div>

                    <form className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                E-mail
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <AtSignIcon />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="voce@exemplo.com"
                                    className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Senha
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <LockIcon />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Digite sua senha"
                                    className="block w-full pl-9 pr-10 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded bg-white"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Manter conectado
                                </label>
                            </div>
                            <a href="/forgot-password" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                                Redefinir senha
                            </a>
                        </div>

                        <button
                            type="button"
                            onClick={() => signIn("keycloak", { callbackUrl: "/dashboard", popup: true })}
                            className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 text-sm"
                        >
                            Criar conta
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-sm text-gray-500">
                        Já tem uma conta?{' '}
                        <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                            Entrar
                        </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Register;
