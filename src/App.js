import Header from "./component/Header";
import Login from "./component/Login";
import Registration from "./component/Registration";
import Home from "./component/Home";
import Footer from "./component/Footer";
import Cart from "./component/Cart";
import ProductManagement from "./component/ProductManagement";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Container from "react-bootstrap/esm/Container";
import RequiredAuthentication from "./component/RequiredAuthentication";
import ForgottenPassword from "./component/ForgottenPassword";
import Prohibition from "./component/Prohibition";
import Missing from "./component/Missing";
import ProductAddition from "./component/ProductAddition";
import CategoryManagement from "./component/CategoryManagement";
import PersonalInformation from "./component/PersonalInformation";
import DetailedProduct from "./component/DetailedProduct";
import ProductEdition from "./component/ProductEdition";
function App() {
  return (
    <div>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/forgotten-password" element={<ForgottenPassword />} />
          <Route path="/prohibition" element={<Prohibition />} />
          <Route element={<RequiredAuthentication allowedRoles={["USER"]} />}>
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route element={<RequiredAuthentication allowedRoles={["ADMIN"]} />}>
            <Route path="/product-management" element={<ProductManagement />} />
          </Route>
          <Route element={<RequiredAuthentication allowedRoles={["ADMIN"]} />}>
            <Route
              path="/category-management"
              element={<CategoryManagement />}
            />
          </Route>
          <Route element={<RequiredAuthentication allowedRoles={["ADMIN"]} />}>
            <Route path="/product-addition" element={<ProductAddition />} />
          </Route>
          <Route element={<RequiredAuthentication allowedRoles={["ADMIN"]} />}>
            <Route path="/product-edition/:id" element={<ProductEdition />} />
          </Route>
          <Route element={<RequiredAuthentication allowedRoles={["ADMIN", "USER"]} />}>
            <Route path="/personal-information" element={<PersonalInformation />} />
          </Route>
          <Route path="/detailed-product/:id" element={<DetailedProduct />} />
          <Route path="*" element={<Missing />} />
        </Routes>
      </Container>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
export default App;
