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
              
              
          </Routes>
      </BrowserRouter>
  );
};

export default App;