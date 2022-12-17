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
                                <ScrollToTop>
                                    <Layout>
                                        <Component />
                                    </Layout>
                                </ScrollToTop>
                            }
                        />
                    ) : (
                        <Route
                            key={route.id}
                            path={route.path}
                            element={
                                <ScrollToTop>
                                    <Layout>
                                        <Component />
                                    </Layout>
                                </ScrollToTop>
                            }
                        />
                    );
                })}
            </Routes>
        </div>
    );
}

export default App;
