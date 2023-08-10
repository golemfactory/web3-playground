import "./App.css";
import { MetaMaskContextProvider } from "./MetaMaskProvider";
import { EthTransfer } from "./EthTransfer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationMenu from "./NavigationMenu";

function App() {
  return (
    <BrowserRouter>
      <div className="px-4 mx-auto bg-red">
        <div className="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <div className=" h-screen w-screen bg-gradient-to-r from-red-800 via-yellow-300 to-green-700">
            {/* <NavigationMenu /> */}
            <MetaMaskContextProvider>
              <Routes>
                <Route path="/" element={<EthTransfer />} />
              </Routes>
            </MetaMaskContextProvider>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
