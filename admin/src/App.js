import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContex";
import {
  hotelColumns,
  roomColumns,
  userColumns,
  orderColumns,
  serviceColumns,
  staffColumns,
  reviewColumns,
} from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import Edit from "./pages/edit/Edit";
import EditHotel from "./pages/editHotel/EditHotel";
import EditRoom from "./pages/editRoom/EditRoom";
import EditOrder from "./pages/editOrder/EditOrder";
import EditService from "./pages/editService/EditService";
import NewService from "./pages/newService/NewService";
import DetailsPartner from "./pages/detailsPartner/DetailsPartner";
import DetailReview from "./pages/detailReview/DetailReview";
import EditProfile from "./pages/editProfile/EditProfile";
import ChangePassword from "./pages/changePassword/ChangePassword";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route path="/profile" element={<EditProfile />} />
            <Route path="/changePassword" element={<ChangePassword/>}/>

            <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={userColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <Edit />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New inputs={userInputs} title="Thêm Người Dùng Mới" />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="users/staff">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={staffColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <DetailsPartner />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New inputs={userInputs} title="Thêm Đối Tác Mới" />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="hotels">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={hotelColumns} title="Add New Hotel" />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":hotelId"
                element={
                  <ProtectedRoute>
                    <EditHotel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewHotel />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="rooms">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={roomColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":roomId"
                element={
                  <ProtectedRoute>
                    <EditRoom />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewRoom />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="orders">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={orderColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":orderId"
                element={
                  <ProtectedRoute>
                    <EditOrder />
                  </ProtectedRoute>
                }
              />
              {/* <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewRoom/>
                  </ProtectedRoute>
                }
              /> */}
            </Route>
            <Route path="services">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={serviceColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":serviceId"
                element={
                  <ProtectedRoute>
                    <EditService />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewService />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="reviews">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={reviewColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":reviewId"
                element={
                  <ProtectedRoute>
                    <DetailReview />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewService />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
