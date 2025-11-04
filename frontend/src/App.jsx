import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigationbar } from "./components/Navigationbar";
import { ToastContainer } from "react-toastify";
import { ContactUs } from "./components/ContactUs";
import { ContactRequest } from "./components/ContactRequest";
import { Products } from "./components/Products";
import { HandleProducts } from "./components/HandleProducts";
import { EditProduct } from "./components/EditProduct";



function App() {

  return (
    <BrowserRouter>
      <Navigationbar/>
      <Routes>
        <Route path="/" element={<ContactUs/>}/>
        <Route path="/products" element={<Products />} />
        <Route path="/products/han" element={<HandleProducts/>} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/contact-us" element={<ContactUs/>}/>
        <Route path="/contact-us/request" element={<ContactRequest/>}/>
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  )
}

export default App
