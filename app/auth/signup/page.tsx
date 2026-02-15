"use client"

import { SignupFlow } from "@/components/auth/signup-flow"
import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="cosmic-bg min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center mb-6 justify-center w-full">
            <div className="relative w-10 h-10 mr-3">
              <div className="absolute inset-0 bg-purple-500 rounded-full blur-sm opacity-70"></div>
              <div className="absolute inset-1 bg-black rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center text-purple-400 font-bold text-lg">
                R
              </div>
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-600">
              Reflect
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Get Started</h1>
          <p className="text-gray-400">Create your Reflect account today</p>
        </div>

        <SignupFlow />

        <div className="text-center mt-6">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-purple-400 hover:text-purple-300 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
