import { publicRoutes as routes } from './routes';
import { Routes, Route } from 'react-router-dom';
import { ScrollToTop, Modal } from './components';

function App() {
    return (
        <div className="App overflow-x-hidden">
            <Routes>
                {routes.map((route) => {
                    const Layout = route.layout;
                    const Component = route.component;

                    return route.path === '/' ? (
                        <Route
                            key={route.id}
                            path={route.path}
                            exact
                            element={
                                <Layout>
                                    <ScrollToTop>
                                        <Component />
                                    </ScrollToTop>
                                </Layout>
                            }
                        />
                    ) : (
                        <Route
                            key={route.id}
                            path={route.path}
                            element={
                                <Layout>
                                    <ScrollToTop>
                                        <Component />
                                    </ScrollToTop>
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </div>
    );
}

export default App;
