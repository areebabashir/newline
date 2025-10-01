import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings, User, Lock, Bell, Palette, Save, Shield, Mail, Phone, Globe } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const Setting = () => {
  // Dynamic State
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
  });

  const [account, setAccount] = useState({
    username: "",
    phone: "",
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    language: "English",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value });
  };

  const handlePreferencesChange = (name, value) => {
    setPreferences({ ...preferences, [name]: value });
  };

  const handleNotificationsChange = (name, value) => {
    setNotifications({ ...notifications, [name]: value });
  };

  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurity({ ...security, [name]: value });
  };

  const handleSave = (section) => {
    toast.success(`${section} saved successfully!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <Toaster position="top-right" reverseOrder={false} />
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl shadow-lg">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Manage your account and preferences</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl">
        
        {/* Profile Settings */}
        <Card className="rounded-2xl shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardContent className="space-y-5 p-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <User className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile Settings</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </Label>
                <Input
                  name="fullName"
                  placeholder="Enter your name"
                  value={profile.fullName}
                  onChange={handleProfileChange}
                  className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>
            </div>
            
            <Button 
              className="mt-6 w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
              onClick={() => handleSave("Profile")}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card className="rounded-2xl shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardContent className="space-y-5 p-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Account Settings</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Username
                </Label>
                <Input
                  name="username"
                  placeholder="Enter username"
                  value={account.username}
                  onChange={handleAccountChange}
                  className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </Label>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="+92 300 1234567"
                  value={account.phone}
                  onChange={handleAccountChange}
                  className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>
            </div>
            
            <Button 
              className="mt-6 w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
              onClick={() => handleSave("Account")}
            >
              <Save className="w-4 h-4 mr-2" />
              Update Account
            </Button>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="rounded-2xl shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardContent className="space-y-5 p-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Palette className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Preferences</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <Palette className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</Label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Enable dark theme</p>
                  </div>
                </div>
                <Switch
                  checked={preferences.darkMode}
                  onCheckedChange={(val) => handlePreferencesChange("darkMode", val)}
                  className="data-[state=checked]:bg-yellow-500"
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                    <Globe className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-900 dark:text-white">Language</Label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Choose your language</p>
                  </div>
                </div>
                <select
                  className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  value={preferences.language}
                  onChange={(e) => handlePreferencesChange("language", e.target.value)}
                >
                  <option>English</option>
                  <option>Urdu</option>
                  <option>Arabic</option>
                </select>
              </div>
            </div>
            
            <Button 
              className="mt-6 w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
              onClick={() => handleSave("Preferences")}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Preferences
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="rounded-2xl shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardContent className="space-y-5 p-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <Bell className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Notification Settings</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <div>
                    <Label className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</Label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Receive updates via email</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(val) => handleNotificationsChange("email", val)}
                  className="data-[state=checked]:bg-yellow-500"
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <div>
                    <Label className="text-sm font-medium text-gray-900 dark:text-white">SMS Notifications</Label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Receive SMS alerts</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.sms}
                  onCheckedChange={(val) => handleNotificationsChange("sms", val)}
                  className="data-[state=checked]:bg-yellow-500"
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <div>
                    <Label className="text-sm font-medium text-gray-900 dark:text-white">Push Notifications</Label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Browser notifications</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(val) => handleNotificationsChange("push", val)}
                  className="data-[state=checked]:bg-yellow-500"
                />
              </div>
            </div>
            
            <Button 
              className="mt-6 w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
              onClick={() => handleSave("Notifications")}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Notifications
            </Button>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="rounded-2xl shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 lg:col-span-2">
          <CardContent className="space-y-5 p-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <Lock className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Security</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Update your password to keep your account secure</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Current Password
                </Label>
                <Input
                  type="password"
                  name="currentPassword"
                  placeholder="Enter current password"
                  value={security.currentPassword}
                  onChange={handleSecurityChange}
                  className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  New Password
                </Label>
                <Input
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                  value={security.newPassword}
                  onChange={handleSecurityChange}
                  className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Confirm Password
                </Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={security.confirmPassword}
                  onChange={handleSecurityChange}
                  className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>
            </div>
            
            <Button 
              className="mt-6 w-full md:w-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
              onClick={() => handleSave("Security")}
            >
              <Lock className="w-4 h-4 mr-2" />
              Change Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Setting;
