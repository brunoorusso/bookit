import logo from './logo.svg';
import './App.css';


import Navbar from "./components/Navbar"
function App() {
  return (
    <div className="bg-primary w-full overflow-hidden">
    <div className={`sm:px-16 px-6 flex justify-center items-center`}>
      <div className={`xl:max-w-[1280px] w-full`}>
        <Navbar />
      </div>
    </div>
  </div>
  );
}

export default App;
