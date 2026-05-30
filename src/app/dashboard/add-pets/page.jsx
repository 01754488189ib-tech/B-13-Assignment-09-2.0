"use client";

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { TextField, Label, Input, FieldError, Select, ListBox, TextArea, Button } from "@heroui/react";

const AddPetsPage = () => {
    const [isPending, setIsPending] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        setIsPending(true);

        const formData = new FormData(form);
        const petData = Object.fromEntries(formData.entries());
        console.log("New Pet Data:", petData);

        try {
            const response = await fetch('http://localhost:5000/pets', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(petData)
            });

            const result = await response.json();

            if (response.ok) {
                toast.success(result.message || "Pet added successfully!");
                form.reset();
            } else {
                toast.error(result.message || "Failed to add pet. Please try again.");
            }
        } catch (error) {
            console.error("Error adding pet:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6 md:p-10 bg-[#0f172a] rounded-2xl border border-slate-800 shadow-xl text-slate-200">
            <h2 className="text-2xl font-bold text-white mb-8">Add New Pet</h2>

            <form onSubmit={onSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    <div className="md:col-span-2">
                        <TextField name="petName" isRequired>
                            <Label className="text-slate-300 font-medium mb-2 block">Pet Name</Label>
                            <Input
                                placeholder="Buddy"
                                className="rounded-2xl w-full bg-[#0b1329] border border-slate-800 text-white p-3"
                            />
                            <FieldError className="text-red-500 text-sm mt-1" />
                        </TextField>
                    </div>

                    <div>
                        <Select
                            name="species"
                            isRequired
                            className="w-full"
                            placeholder="Select species"
                            defaultSelectedKeys={["Dog"]}
                        >
                            <Label className="text-slate-300 font-medium mb-2 block">Species</Label>
                            <Select.Trigger className="rounded-2xl bg-[#0b1329] border border-slate-800 text-white focus:border-[#FF9505] w-full p-3 flex justify-between items-center">
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover className="bg-[#0f172a] border border-slate-800 rounded-2xl text-white shadow-xl">
                                <ListBox className="p-2 space-y-1">
                                    <ListBox.Item id="Dog" textValue="Dog" className="p-2.5 rounded-xl hover:bg-[#FF9505]/10 hover:text-[#FF9505] cursor-pointer">Dog</ListBox.Item>
                                    <ListBox.Item id="Cat" textValue="Cat" className="p-2.5 rounded-xl hover:bg-[#FF9505]/10 hover:text-[#FF9505] cursor-pointer">Cat</ListBox.Item>
                                    <ListBox.Item id="Bird" textValue="Bird" className="p-2.5 rounded-xl hover:bg-[#FF9505]/10 hover:text-[#FF9505] cursor-pointer">Bird</ListBox.Item>
                                    <ListBox.Item id="Rabbit" textValue="Rabbit" className="p-2.5 rounded-xl hover:bg-[#FF9505]/10 hover:text-[#FF9505] cursor-pointer">Rabbit</ListBox.Item>
                                    <ListBox.Item id="Others" textValue="Others" className="p-2.5 rounded-xl hover:bg-[#FF9505]/10 hover:text-[#FF9505] cursor-pointer">Others</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    <TextField name="breed" isRequired>
                        <Label className="text-slate-300 font-medium mb-2 block">Breed</Label>
                        <Input
                            placeholder="Golden Retriever"
                            className="rounded-2xl w-full bg-[#0b1329] border border-slate-800 text-white p-3"
                        />
                        <FieldError className="text-red-500 text-sm mt-1" />
                    </TextField>

                    <TextField name="age" isRequired>
                        <Label className="text-slate-300 font-medium mb-2 block">Age</Label>
                        <Input
                            type="number"
                            min="0"
                            placeholder="2"
                            className="rounded-2xl w-full bg-[#0b1329] border border-slate-800 text-white p-3"
                        />
                        <FieldError className="text-red-500 text-sm mt-1" />
                    </TextField>

                    <div>
                        <Select
                            name="gender"
                            isRequired
                            className="w-full"
                            placeholder="Select gender"
                            defaultSelectedKeys={["Male"]}
                        >
                            <Label className="text-slate-300 font-medium mb-2 block">Gender</Label>
                            <Select.Trigger className="rounded-2xl bg-[#0b1329] border border-slate-800 text-white focus:border-[#FF9505] w-full p-3 flex justify-between items-center">
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover className="bg-[#0f172a] border border-slate-800 rounded-2xl text-white shadow-xl">
                                <ListBox className="p-2 space-y-1">
                                    <ListBox.Item id="Male" textValue="Male" className="p-2.5 rounded-xl hover:bg-[#FF9505]/10 hover:text-[#FF9505] cursor-pointer">Male</ListBox.Item>
                                    <ListBox.Item id="Female" textValue="Female" className="p-2.5 rounded-xl hover:bg-[#FF9505]/10 hover:text-[#FF9505] cursor-pointer">Female</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    <div className="md:col-span-2">
                        <TextField name="imageUrl" isRequired>
                            <Label className="text-slate-300 font-medium mb-2 block">Image URL</Label>
                            <Input
                                type="url"
                                placeholder="https://i.ibb.co/example.jpg"
                                className="rounded-2xl w-full bg-[#0b1329] border border-slate-800 text-white p-3"
                            />
                            <FieldError className="text-red-500 text-sm mt-1" />
                        </TextField>
                    </div>

                    <div>
                        <Select
                            name="healthStatus"
                            isRequired
                            className="w-full"
                            placeholder="Select health status"
                            defaultSelectedKeys={["Perfectly Healthy"]}
                        >
                            <Label className="text-slate-300 font-medium mb-2 block">Health Status</Label>
                            <Select.Trigger className="rounded-2xl bg-[#0b1329] border border-slate-800 text-white focus:border-[#FF9505] w-full p-3 flex justify-between items-center">
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover className="bg-[#0f172a] border border-slate-800 rounded-2xl text-white shadow-xl">
                                <ListBox className="p-2 space-y-1">
                                    <ListBox.Item id="Perfectly Healthy" textValue="Perfectly Healthy" className="p-2.5 rounded-xl hover:bg-[#FF9505]/10 hover:text-[#FF9505] cursor-pointer">Perfectly Healthy</ListBox.Item>
                                    <ListBox.Item id="Minor Injury" textValue="Minor Injury" className="p-2.5 rounded-xl hover:bg-[#FF9505]/10 hover:text-[#FF9505] cursor-pointer">Minor Injury</ListBox.Item>
                                    <ListBox.Item id="Under Treatment" textValue="Under Treatment" className="p-2.5 rounded-xl hover:bg-[#FF9505]/10 hover:text-[#FF9505] cursor-pointer">Under Treatment</ListBox.Item>
                                    <ListBox.Item id="Disabled" textValue="Disabled" className="p-2.5 rounded-xl hover:bg-[#FF9505]/10 hover:text-[#FF9505] cursor-pointer">Disabled</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>
                    <div>
                        <Select
                            name="vaccinationStatus"
                            isRequired
                            className="w-full"
                            placeholder="Select status"
                            defaultSelectedKeys={["Not Vaccinated"]}
                        >
                            <Label className="text-slate-300 font-medium mb-2 block">Vaccination Status</Label>
                            <Select.Trigger className="rounded-2xl bg-[#0b1329] border border-slate-800 text-white w-full p-3 flex justify-between items-center">
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover className="bg-[#0f172a] border border-slate-800 rounded-2xl text-white shadow-xl">
                                <ListBox className="p-2 space-y-1">
                                    <ListBox.Item id="Fully Vaccinated" textValue="Fully Vaccinated" className="p-2.5 rounded-xl hover:bg-[#FF9505]/10 hover:text-[#FF9505] cursor-pointer">Fully Vaccinated</ListBox.Item>
                                    <ListBox.Item id="Partially Vaccinated" textValue="Partially Vaccinated" className="p-2.5 rounded-xl hover:bg-[#FF9505]/10 hover:text-[#FF9505] cursor-pointer">Partially Vaccinated</ListBox.Item>
                                    <ListBox.Item id="Not Vaccinated" textValue="Not Vaccinated" className="p-2.5 rounded-xl hover:bg-[#FF9505]/10 hover:text-[#FF9505] cursor-pointer">Not Vaccinated</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    <TextField name="location" isRequired>
                        <Label className="text-slate-300 font-medium mb-2 block">Location</Label>
                        <Input
                            placeholder="Rangpur, Bangladesh" className="rounded-2xl w-full bg-[#0b1329] border border-slate-800 text-white p-3" />
                        <FieldError className="text-red-500 text-sm mt-1" />
                    </TextField>

                    <TextField name="adoptionFee" isRequired>
                        <Label className="text-slate-300 font-medium mb-2 block">Adoption Fee (USD)</Label>
                        <Input type="number" min="0" placeholder="0" className="rounded-2xl w-full bg-[#0b1329] border border-slate-800 text-white p-3" />
                        <FieldError className="text-red-500 text-sm mt-1" />
                    </TextField>

                    <div className="md:col-span-2">
                        <TextField name="ownerEmail">
                            <Label className="text-slate-500 font-medium mb-2 block">Owner Email (Read Only)</Label>
                            <Input type="email" value="01754488189ib@gmail.com" readOnly className="rounded-2xl w-full bg-[#1e293b]/30 border border-slate-800 text-slate-500 p-3 opacity-70 cursor-not-allowed" />
                        </TextField>
                    </div>

                    <div className="md:col-span-2">
                        <TextField name="description" isRequired>
                            <Label className="text-slate-300 font-medium mb-2 block">Description</Label>
                            <TextArea
                                placeholder="Describe the pet..." className="rounded-2xl w-full bg-[#0b1329] border border-slate-800 text-white p-3 min-h-[100px]" />
                            <FieldError className="text-red-500 text-sm mt-1" />
                        </TextField>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                    <Button type="button" className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors">
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={isPending} className="w-full sm:flex-1 py-3 rounded-xl bg-[#FF9505] text-black font-bold shadow-lg shadow-[#FF9505]/10 hover:bg-[#ff9d1c] transition-all">
                        {isPending ? "Adding Pet..." : "Add Pet"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddPetsPage;