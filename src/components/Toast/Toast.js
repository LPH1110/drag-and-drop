import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import './Toast-overrides.scss';

function Toast({ placement, message, status }) {
    const toastClasses = () => {
        switch (placement) {
            case 'bottom-end':
                return `toast toast-end ${status}`;
            default:
                return `toast toast-top toast-end ${status}`;
        }
    };

    return (
        <div className={toastClasses()}>
            <div className="alert bg-green-100">
                <div>
                    <span className="toast-icon">
                        <CheckCircleIcon className="w-5 h-5" />
                    </span>
                    <p className="toast-message">{message}</p>
                </div>
            </div>
        </div>
    );
}

export default Toast;
