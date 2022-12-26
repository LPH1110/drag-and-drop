import React from 'react';

function UserMenuActions({ data }) {
    return (
        <div className="min-w-[10rem]">
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
