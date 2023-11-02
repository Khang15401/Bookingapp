import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Register1 from "./pages/register1/Register1";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Order from "./pages/order/Order";
import Edit from "./pages/edit/EditProfile";
import Detail from "./pages/detail/Detail";
import RegisterPartner from "./pages/registerPartner/RegisterPartner";
import RegisterInfo from "./pages/registerInfomation/RegisterInfo";
import Policies from "./pages/policies/Policies";

// const signOut = (e) => {
//     //e.preventDefault();
//     localStorage.clear();
//     this.props.history.push('/')
//   }

// logout() {
//     this.setState({
//         user: '',
//         dates: '',
//         options: ''
//     }, () => {
//         localStorage.removeItem('user');
//         localStorage.removeItem('dates');
//         localStorage.removeItem('options');
//     });
// }

function App()  {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/hotels" element={<List/>}/>
              <Route path="/hotels/:id" element={<Hotel/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register1/>}/>
              <Route path="/orders" element={<Order/>}/>
              <Route path="/users" element={<Edit/>}/> 
              <Route path="/orders/detail/:orderId" element={<Detail/>}/>
              <Route path="/partner" element={<RegisterPartner/>} /> 
              <Route path="/partner/register" element={<RegisterInfo/>} /> 
              <Route path="/policies" element={<Policies/>}/>
          </Routes>
      </BrowserRouter>
  );
};

export default App;