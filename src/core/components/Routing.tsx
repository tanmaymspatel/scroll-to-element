import { Routes, Route } from "react-router-dom"

import MainView from "../../components/MainView"
import UserDetails from "../../components/UserDetails";
/**
 * @returns routing of the application 
 */
function Routing() {
    return (
        <Routes>
            <Route path="/" element={<MainView />} />
            <Route path="/dashboard" element={<MainView />} />
            <Route path="/dashboard/:id" element={<UserDetails />} />
        </Routes>
    )
};

export default Routing;
