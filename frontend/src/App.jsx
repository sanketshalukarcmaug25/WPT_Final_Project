import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigationbar } from "./components/Navigationbar";
import { ToastContainer } from "react-toastify";
import { ContactUs } from "./components/ContactUs";
import { ContactRequest } from "./components/ContactRequest";
import { Products } from "./components/Products";
import { HandleProducts } from "./components/HandleProducts";
import {HandlePets} from "./components/HandlePets";
import {EditPet} from "./components/EditPet";
import {Pets} from "./components/Pets";
import { EditProduct } from "./components/EditProduct";
import { SignUpForm } from "./components/SignUpForm";
import { LoginPage } from "./components/Login";



function App() {

  return (
    <BrowserRouter>
      <Navigationbar />
      <Routes>
        <Route path="/" element={<ContactUs />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/handle" element={<HandleProducts />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/pets/handle" element={<HandlePets />} />
        <Route path="/edit-pet/:id" element={<EditPet />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/contact-us/request" element={<ContactRequest />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
