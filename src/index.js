import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GlobalStyles } from './components';
import { StoreProvider } from './store';
import { AuthContextProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <AuthContextProvider>
        <StoreProvider>
            <GlobalStyles>
                <Router>
                    <App />
                </Router>
            </GlobalStyles>
        </StoreProvider>
    </AuthContextProvider>,
    // </React.StrictMode>,
);

reportWebVitals();
