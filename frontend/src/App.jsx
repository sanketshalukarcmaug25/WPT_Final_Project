import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigationbar } from "./components/Navigationbar";
import { ToastContainer } from "react-toastify";
import { ContactUs } from "./components/ContactUs";
import { ContactRequest } from "./components/ContactRequest";
import { Products } from "./components/Products";
import { HandleProducts } from "./components/HandleProducts";
import { HandlePets } from "./components/HandlePets";
import { EditPet } from "./components/EditPet";
import { Pets } from "./components/Pets";
import { EditProduct } from "./components/EditProduct";
import { SignUpForm } from "./components/SignUpForm";
import { LoginPage } from "./components/Login";
import { HomePage } from "./components/Home";
import { AdminRoute } from "./components/AdminRoute";
import { Footer } from "./components/Footer";
import { AboutUs } from "./components/AboutUs";
import { Cart } from "./components/Cart";
import { Orders } from "./components/Orders";
import "react-toastify/dist/ReactToastify.css";



function App() {

  return (
    <BrowserRouter>
      <Navigationbar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/handle" element={<AdminRoute><HandleProducts /></AdminRoute>} />
        <Route path="/edit-product/:id" element={<AdminRoute><EditProduct /></AdminRoute>} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/pets/handle" element={<AdminRoute><HandlePets /></AdminRoute>} />
        <Route path="/edit-pet/:id" element={<AdminRoute><EditPet /></AdminRoute>} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/contactus/request" element={<ContactRequest />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer /> 
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
