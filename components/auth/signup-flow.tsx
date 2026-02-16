"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Mail } from "lucide-react"

export function SignupFlow() {
  const router = useRouter()
  const [step, setStep] = useState<"email" | "details" | "verification" | "success">("email")
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [verificationCode, setVerificationCode] = useState("")

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address")
      return
    }

    setLoading(true)
    try {
      // Simulate email verification check
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setStep("details")
    } catch (err) {
      setError("Failed to verify email. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!firstName || !lastName) {
      setError("Please enter your full name")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)
    try {
      // Simulate account creation
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setStep("verification")
    } catch (err) {
      setError("Failed to create account. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!verificationCode || verificationCode.length !== 6) {
      setError("Please enter a valid 6-digit code")
      return
    }

    setLoading(true)
    try {
      // Simulate verification
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setStep("success")
    } catch (err) {
      setError("Invalid verification code. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        {step === "email" && (
          <>
            <CardHeader>
              <CardTitle>Create Account</CardTitle>
              <CardDescription>Enter your email to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Checking..." : "Continue"}
                </Button>
              </form>
            </CardContent>
          </>
        )}

        {step === "details" && (
          <>
            <CardHeader>
              <CardTitle>Complete Your Profile</CardTitle>
              <CardDescription>Set up your account details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDetailsSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  <Input placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <Input
                  type="password"
                  placeholder="Password (min 8 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </CardContent>
          </>
        )}

        {step === "verification" && (
          <>
            <CardHeader>
              <CardTitle>Verify Email</CardTitle>
              <CardDescription>Enter the code sent to {email}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerification} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Alert>
                  <Mail className="h-4 w-4" />
                  <AlertDescription>We sent a verification code to your email</AlertDescription>
                </Alert>
                <Input
                  placeholder="000000"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.slice(0, 6))}
                  maxLength={6}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Verifying..." : "Verify Email"}
                </Button>
              </form>
            </CardContent>
          </>
        )}

        {step === "success" && (
          <>
            <CardHeader>
              <CardTitle className="text-center">Welcome!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-center">
                <CheckCircle className="h-12 w-12 mx-auto text-green-500" />
                <div>
                  <h3 className="font-semibold">{firstName} {lastName}</h3>
                  <p className="text-sm text-muted-foreground">{email}</p>
                </div>
                <Button
                  className="w-full"
                  onClick={() => router.push("/dashboard")}
                >
                  Go to Dashboard
                </Button>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  )
}
