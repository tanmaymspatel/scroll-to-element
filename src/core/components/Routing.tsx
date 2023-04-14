import { Routes, Route } from "react-router-dom"
import MainView from "../../components/MainView"

function Routing() {
    return (
        <Routes>
            <Route path="/" element={<MainView />} />
            <Route path="/dashboard" element={<MainView />} >
                <Route path=":id" element={<MainView />} />
            </Route>
        </Routes>
    )
};

export default Routing;
