// import { BrowserRouter as Router } from 'react-router-dom';
// import { Route , Routes} from 'react-router-dom';

// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Home from '../routes/Home';
// import Header from '../components/Header/Header';
// import Footer from '../components/Footer/Footer';
// import ManageAccount from '../components/Account/ManageAccount/ManageAccount';
// import MyAccount from '../components/Account/MyAccount/MyAccount';
// import Shop from '../components/Shop/Shop';
// import ItemView from '../routes/ItemView';
// import CategoryView from '../routes/CategoryView';
// import SearchView from '../routes/Search';
// import CartItemsProvider from '../Context/CartItemsProvider';
// import Login from '../components/Authentication/Login/Login';
// import Register from '../components/Authentication/Register/Register';
// import CreaterRegistration from '../components/Authentication/CreaterRegistration/CreaterRegistration';
// import Wishlist from '../components/Wishlist';
// import WishItemsProvider from '../Context/WishItemsProvider';
// import DrawerNav from '../components/Nav/DrawerNav/DrawerNav';
// import Checkout from '../components/Checkout/Checkout';
// import SearchProvider from '../Context/SearchProvider';
// import AdminDashboard from '../components/Admin/AdminDashboard';
// import SellerDashboard from '../components/Seller/Dashboard';
// import CreatorDashboard from '../components/Creator/Dashboard';
// import PurchaserDashboard from '../components/Purchaser/Dashboard';
// import ProductDetail from '../components/Purchaser/ProductDetail';


// function App() {

//   return (
//    <CartItemsProvider>
//       <WishItemsProvider>
//         <SearchProvider>
//           <Router >
//             <Header />
//             <Routes>
//               <Route index element='/'/>
//               {/* <Route index element={<Home />}/> */}
//               <Route path="/account">
//                 <Route path="me" element={<MyAccount/>}/>
//                 <Route path="manage" element={<ManageAccount/>}/>
//                 <Route path="login" element={<Login />}/>
//                 <Route path="register" element={<Register />}/>
//                 <Route path="creater-registration" element={<CreaterRegistration />}/>
//                 <Route path="*" element={<Login />}/>
//               </Route>
//               <Route path="/shop" element={<Shop />}/>
//               <Route path="/category">
//                 <Route path=":id" element={<CategoryView />}/>
//               </Route>
//               <Route path="/item">
//                 <Route path="/item/men">
//                   <Route path=":id" element={<ItemView />}/>
//                 </Route>
//                 <Route path="/item/women">
//                   <Route path=":id" element={<ItemView />}/>
//                 </Route>
//                 <Route path="/item/kids">
//                   <Route path=":id" element={<ItemView />}/>
//                 </Route>
//                 <Route path="/item/featured">
//                   <Route path=":id" element={<ItemView />}/>
//                 </Route>
//               </Route>
//               <Route path="/wishlist" element={<Wishlist />} />
//               <Route path="/search/*" element={<SearchView />} />
//               <Route path="/seller/dashboard" element={<SellerDashboard />} />
//               <Route path="/creator-dashboard" element={<CreatorDashboard />} />
//               <Route path="/purchaser/dashboard" element={<PurchaserDashboard />} />
//               <Route path="/product/:id" element={<ProductDetail />} />
//             </Routes>
//             <Footer />
//             <Routes>
//               <Route path="/admin" element={<AdminDashboard />} />
//             </Routes>
//           </Router>
//         </SearchProvider>
//       </WishItemsProvider>
//    </CartItemsProvider>
//   );
// }

// export default App;




import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from '../components/Authentication/Register/Register';
import CreaterRegistration from '../components/Authentication/CreaterRegistration/CreaterRegistration';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

function App() {
  return (
    <Router>
      <Header />

      <Routes>
      <Route path="/account">
                
                 <Route path="register" element={<Register />}/>
                 <Route path="creater-registration" element={<CreaterRegistration />}/>
              </Route>
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
