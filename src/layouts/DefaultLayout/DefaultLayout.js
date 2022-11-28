import React from 'react';
import { Sidebar } from '../components';

function DefaultLayout({ children }) {
    return (
        <section className="grid grid-cols-12 gap-x-6">
            <section className="col-span-2 h-screen border-r border-slate-200">
                <aside className="p-4 h-full">
                    <nav className="h-full">
                        <Sidebar />
                    </nav>
                </aside>
            </section>
            <section className="w-screen">{children}</section>
        </section>
    );
}

export default DefaultLayout;
