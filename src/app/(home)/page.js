import Footer from './components/Footer';
import Navbar from './components/Navbar';
import SearchBar from './components/searchBar/SearchBar';
import 'react-tooltip/dist/react-tooltip.css';

export default function Home() {
  return (
    <>
      <Navbar />
      <SearchBar />
      <Footer />
    </>
  );
}
