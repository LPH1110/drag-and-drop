import { useState, useEffect } from 'react';
import { Sidebar } from '../components';
import './progress-overrides.scss';

function DefaultLayout({ children }) {
    const [showProgress, setShowProgress] = useState(true);

    useEffect(() => {
        setTimeout(() => setShowProgress(false), 5000);
    }, []);

    return showProgress ? (
        <section className="w-screen h-screen flex flex-col justify-center items-center">
            <div className="p-4">
                <h1 className="text-2xl font-semibold mb-2">We are setting up your workplaces...</h1>
                <progress className="progress w-full"></progress>
            </div>
        </section>
    ) : (
        <section className="grid grid-cols-12">
            <section className="col-span-2 h-screen border-r border-slate-200">
                <aside className="p-4 h-full">
                    <nav className="h-full">
                        <Sidebar />
                    </nav>
                </aside>
            </section>
            <section className="col-span-10">{children}</section>
        </section>
    );
}

export default DefaultLayout;
