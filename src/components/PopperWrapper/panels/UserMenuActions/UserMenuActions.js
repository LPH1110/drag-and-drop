import React from 'react';
import { UserAuth } from '~/contexts/AuthContext';

function UserMenuActions({ data }) {
    const { user } = UserAuth();
    return (
        <div className="min-w-[10rem]">
            <h4 className="font-semibold text-slate-600 border-b border-slate-200 p-2">{user?.displayName}</h4>
            {data.map((item) => (
                <div key={item.id} className="w-full">
                    <button
                        onClick={item.onClick}
                        type="button"
                        className="p-2 rounded-lg w-full flex items-center hover:bg-slate-100 ease-in-out duration-200"
                    >
                        <span className="mr-2 w-5 h-5">{item.icon}</span>
                        {item.title}
                    </button>
                </div>
            ))}
        </div>
    );
}

export default UserMenuActions;
