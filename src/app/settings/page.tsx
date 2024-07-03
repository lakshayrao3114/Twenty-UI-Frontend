"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";

export default function Settings() {

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState(''); 
    const [theme, setTheme] = useState('light'); // Default theme

    useEffect(() => {
        const sidebar = document.querySelector('.flex .lakshay'); // Adjust the selector if necessary
        const header = document.querySelector('.head .part'); // Adjust the selector if necessary
        if (sidebar) {
            sidebar.setAttribute('data-theme', theme);
        }
        console.log(sidebar, header)
        if (header) {
            header.setAttribute('data-theme', theme);
        }
    }, [theme]);

    const handleThemeChange = (newTheme : any) => {
        setTheme(newTheme);
    };

    return (
        <div className="w-full border h-[600px] rounded-md">
            <Tabs  defaultValue="account">
                <TabsList className="w-full justify-start">
                    <TabsTrigger value="account">Profile</TabsTrigger>
                    <TabsTrigger value="appearance">Appearance</TabsTrigger>
                </TabsList>
                <TabsContent className="p-2" value="account">
                    <div className="mx-2">
                        <h5>Picture</h5>
                        <p className="text-[gray] my-2">Your name as it will be displayed</p>
                        <div className="flex">
                            <div className="w-full">
                                <p className="text-[#b3b3b3]">First Name</p>
                                <Input  type="text" placeholder="First Name" value={firstname} onChange={(e) => {setFirstName(e.target.value) }} />
                            </div>
                            <div className="w-full mx-2">
                                <p className="text-[#b3b3b3]">Last Name</p>
                                <Input  type="text" placeholder="Last Name" value={lastname} onChange={(e) => {setLastName(e.target.value) }} />
                            </div>
                        </div>
                    </div>
                    <div className="mx-2">
                        <h5>Name</h5>
                        <p className="text-[gray] my-2">Your name as it will be displayed</p>
                        <div className="flex">
                            <div className="w-full">
                                <p className="text-[#b3b3b3]">First Name</p>
                                <Input  type="text" placeholder="First Name" value={firstname} onChange={(e) => {setFirstName(e.target.value) }} />
                            </div>
                            <div className="w-full mx-2">
                                <p className="text-[#b3b3b3]">Last Name</p>
                                <Input  type="text" placeholder="Last Name" value={lastname} onChange={(e) => {setLastName(e.target.value) }} />
                            </div>
                        </div>
                    </div>
                    <div className="mx-2 mt-3">
                        <h5>Email</h5>
                        <p className="text-[gray] my-2">The email associated with your account</p>
                        <div className="flex"> 
                            <div className="w-full mx-2">
                                <Input  type="text" placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value) }} />
                            </div>
                        </div>
                    </div>
                    <div className="mx-2 mt-3">
                        <h5>Change Password</h5>
                        <p className="text-[gray] my-2">Receive an email containing password update link</p>
                        <Button variant='secondary'>Change Password</Button>
                    </div>
                </TabsContent>
                <TabsContent className="p-2" value="appearance">
                    <div>
                        <h4>Theme</h4>
                        <div className="flex space-x-4 mt-2">
                            <div onClick={() => handleThemeChange('light')} className={`cursor-pointer p-4 border rounded ${theme === 'light' ? 'border-blue-500' : ''}`}>
                                <p>Light</p>
                            </div>
                            <div onClick={() => handleThemeChange('dark')} className={`cursor-pointer p-4 border rounded ${theme === 'dark' ? 'border-blue-500' : ''}`}>
                                <p>Dark</p>
                            </div>
                            <div onClick={() => handleThemeChange('purple-dark')} className={`cursor-pointer p-4 border rounded ${theme === 'purple-dark' ? 'border-blue-500' : ''}`}>
                                <p>Purple Dark</p>
                            </div>
                            <div onClick={() => handleThemeChange('purple-light')} className={`cursor-pointer p-4 border rounded ${theme === 'purple-light' ? 'border-blue-500' : ''}`}>
                                <p>Purple Light</p>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
