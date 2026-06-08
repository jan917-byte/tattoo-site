import { HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Landing from './pages/Landing';
import Tattoo from './pages/Tattoo';
import Art from './pages/Art';
import Book from './pages/Book';
import About from './pages/About';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Landing />} />
          <Route path="tattoo" element={<Tattoo />} />
          <Route path="art" element={<Art />} />
          <Route path="book" element={<Book />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
