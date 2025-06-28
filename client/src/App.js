import "./App.css";
import Layout from "./components/Layout/Layout";
import { AuthProvider } from "./customer-hooks/useAuth";
function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Layout />
      </div>
    </AuthProvider>
  );
}

export default App;
