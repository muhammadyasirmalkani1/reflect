"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Mail, ArrowLeft } from "lucide-react"

interface PasswordResetFlowProps {
  onBack?: () => void
}

export function PasswordResetFlow({ onBack }: PasswordResetFlowProps) {
  const [step, setStep] = useState<"email" | "code" | "reset" | "success">("email")
  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address")
      return
    }

    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess("Check your email for a reset code")
      setStep("code")
    } catch (err) {
      setError("Failed to send reset code. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!verificationCode || verificationCode.length !== 6) {
      setError("Please enter a valid 6-digit code")
      return
    }

    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setSuccess("Code verified. Enter your new password.")
      setStep("reset")
    } catch (err) {
      setError("Invalid code. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

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
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setStep("success")
    } catch (err) {
      setError("Failed to reset password. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      {step === "email" && (
        <>
          <CardHeader>
            <div className="flex items-center gap-2">
              {onBack && (
                <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded">
                  <ArrowLeft className="h-4 w-4" />
                </button>
              )}
              <div>
                <CardTitle>Forgot Password</CardTitle>
                <CardDescription>Enter your email to reset it</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Code"}
              </Button>
            </form>
          </CardContent>
        </>
      )}

      {step === "code" && (
        <>
          <CardHeader>
            <CardTitle>Enter Reset Code</CardTitle>
            <CardDescription>Check your email for the 6-digit code</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCodeSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
              <Alert>
                <Mail className="h-4 w-4" />
                <AlertDescription>Code sent to {email}</AlertDescription>
              </Alert>
              <Input
                placeholder="000000"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.slice(0, 6))}
                maxLength={6}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Verifying..." : "Verify Code"}
              </Button>
            </form>
          </CardContent>
        </>
      )}

      {step === "reset" && (
        <>
          <CardHeader>
            <CardTitle>Create New Password</CardTitle>
            <CardDescription>Enter a strong password</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Input
                type="password"
                placeholder="New password (min 8 characters)"
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
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          </CardContent>
        </>
      )}

      {step === "success" && (
        <>
          <CardHeader>
            <CardTitle className="text-center">Password Reset!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-center">
              <CheckCircle className="h-12 w-12 mx-auto text-green-500" />
              <p className="text-sm text-muted-foreground">
                Your password has been successfully reset. You can now log in with your new password.
              </p>
              <Button className="w-full" onClick={() => window.location.href = "/auth/login"}>
                Go to Login
              </Button>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  )
}
