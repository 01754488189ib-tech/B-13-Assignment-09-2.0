"use client";

import AllPetPage from '@/app/all-pet/page';
import TopPetPage from '@/app/top-pet/page';
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const PetTabs = () => {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 my-12 font-sans">
            <Tabs defaultIndex={0} className="w-full">
                <TabList className="flex items-center gap-2 border-b border-slate-800 pb-px mb-8">
                    <Tab className="px-6 py-3 text-sm font-medium text-slate-300 border-b-2 border-transparent outline-none hover:text-slate-200 aria-selected:text-[#FF9505] aria-selected:border-[#FF9505] cursor-pointer">
                        Top Pets
                    </Tab>
                    <Tab className="px-6 py-3 text-sm font-medium text-slate-300 border-b-2 border-transparent outline-none hover:text-slate-200 aria-selected:text-[#FF9505] aria-selected:border-[#FF9505] cursor-pointer">
                        Browse All
                    </Tab>
                </TabList>

                <TabPanel className="outline-none focus:outline-none">
                    <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
                        <TopPetPage />
                    </div>
                </TabPanel>

                <TabPanel className="outline-none focus:outline-none">
                    <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
                        <AllPetPage />
                    </div>
                </TabPanel>

            </Tabs>
        </div>
    );
};

export default PetTabs;