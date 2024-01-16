import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar"
import Auth from "./components/User/Auth"
function App() {
  return (
  <div className="bg-primary w-full overflow-hidden">
    <div className={`flex justify-center items-center w-full`}>
      <div className={`w-full`}>
        <Navbar />
        <Auth />
      </div>
    </div>
  </div>
  );
}

export default App;
