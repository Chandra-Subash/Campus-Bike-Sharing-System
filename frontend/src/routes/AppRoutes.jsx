import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import AdminDashboard from "../pages/AdminDashBoard";
import OwnerDashboard from "../pages/ownerDashboard";
import AddBike from "../pages/AddBike";
import BookingHistory from "../pages/bookingHistory";
import ProtectedRoute
    from "../components/ProtectedRoute";
import MyBikes from "../pages/myBikes";
import BookingRequests from "../pages/bookingReq";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Login />} />

                <Route
                    path="/register"
                    element={<Register />}
                />



                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute role="USER">
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute role="ADMIN">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />




                <Route
                    path="/owner"
                    element={
                        <ProtectedRoute role="OWNER">
                            <OwnerDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/add-bike"
                    element={
                        <ProtectedRoute role="OWNER">
                            <AddBike />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/my-bikes"
                    element={
                        <ProtectedRoute role="OWNER">
                            <MyBikes />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/requests"
                    element={
                        <ProtectedRoute role="OWNER">
                            <BookingRequests />
                        </ProtectedRoute>
                    }
                />
                  <Route
                    path="/history"
                    element={
                        <ProtectedRoute role="USER">
                            <BookingHistory />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>

    );
}





export default AppRoutes;