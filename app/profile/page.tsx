"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Upload, LogOut } from "lucide-react"

export default function ProfilePage() {
  const { user, updateUser, logout } = useAuth()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    avatar: user?.avatar || "/placeholder.svg?height=100&width=100",
  })

  if (!user) {
    router.push("/auth/login")
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          avatar: event.target?.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      await updateUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        avatar: formData.avatar,
      })
      setSuccess("Profile updated successfully!")
      setIsEditing(false)
    } catch (err) {
      setError("Failed to update profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-muted-foreground">Manage your account settings</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Upload a profile picture (JPG, PNG)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={formData.avatar} alt={user.firstName} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <div className="flex-1">
                  <label htmlFor="avatar-upload" className="cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
                      <Upload className="mx-auto h-6 w-6 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    </div>
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your profile details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert className="border-green-500 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <AlertDescription className="text-green-800">{success}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">First Name</label>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing || loading}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Last Name</label>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing || loading}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Email</label>
                <Input name="email" value={formData.email} disabled className="bg-gray-50" />
              </div>

              <div className="flex gap-2">
                {!isEditing ? (
                  <Button type="button" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button type="submit" disabled={loading}>
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false)
                        setFormData({
                          firstName: user.firstName,
                          lastName: user.lastName,
                          email: user.email,
                          avatar: user.avatar || "/placeholder.svg?height=100&width=100",
                        })
                      }}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>View your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-gray-600">Plan</span>
              <span className="font-medium capitalize">{user.plan}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-gray-600">Role</span>
              <span className="font-medium capitalize">{user.role}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Member Since</span>
              <span className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
