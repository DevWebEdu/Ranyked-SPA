import React from 'react'
import {BrowserRouter as Router , Routes ,Route} from  'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import NabsVarSide from './components/NabsVarSide';
import HomeView from "./views/HomeView"
import LoginViews from './views/LoginViews';
import "./App.css"
import ClientsView from './views/ClientsView';
import ProductsView from './views/ProductsView';
import AgregarClienteView from './views/AgregarClienteView';
import VerDetalleClienteView from './views/VerDetalleClienteView';
import AgregarProductoView from './views/AgregarProductoView';
import ProtectedRoute from './components/ProtectecRoute';
import { AuthContextProvider } from './context/authContext';
import VentasView from './views/VentasView';
import AgregarVentaView from './views/AgregarVentaView';

function App() {
  return (
    <Router >
      <AuthContextProvider>
        <NabsVarSide/>
        <div className='container-fluid mt-5'>
        <Routes>
          <Route path="/" element={<ProtectedRoute><HomeView/></ProtectedRoute>} />
          <Route path="/login"  element={<LoginViews/>} />
          <Route path="/clientes"  element={ <ProtectedRoute><ClientsView/></ProtectedRoute>} />
          <Route path="/productos"  element={<ProtectedRoute><ProductsView/></ProtectedRoute>} />
          <Route path="/agregarcliente" element={<ProtectedRoute><AgregarClienteView/></ProtectedRoute>}/>
          <Route path="/clientes/:idCliente"  element={<ProtectedRoute><VerDetalleClienteView/></ProtectedRoute>}/>
          <Route path="/agregarproducto"  element={<ProtectedRoute><AgregarProductoView/></ProtectedRoute>}/>
          <Route path="/ventas"  element={<ProtectedRoute><VentasView/></ProtectedRoute>}/>
          <Route path="/agregarventa"  element={<ProtectedRoute><AgregarVentaView/></ProtectedRoute>}/>
        </Routes>
        </div>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
