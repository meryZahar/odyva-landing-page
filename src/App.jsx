import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Landing,
  ProductDetails,
  ProductListing,
  Promotion,
  AboutUs,
  Checkout,
} from "./pages";
import { FloatingCartButton } from './components/ui/FloatingCartButton';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/promotions" element={<Promotion />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <FloatingCartButton />
    </BrowserRouter>
  );
}
