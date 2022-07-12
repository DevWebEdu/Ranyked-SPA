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
import VerDetalleProductoView from './views/VerDetalleProductoView';

function App() {
  return (
    <Router >
      <AuthContextProvider>
        <NabsVarSide/>
        <div className='container mt-5'>
        <Routes>
        {/* <ProtectedRoute><RutaEtiqueta/></ProtectedRoute> */}
          <Route path="/" element={<HomeView/>} />
          <Route path="/login"  element={<LoginViews/>} />
          <Route path="/clientes"  element={<ClientsView/>} />
          <Route path="/productos"  element={<ProductsView/>} />
          <Route path="/agregarcliente" element={<AgregarClienteView/>}/>
          <Route path="/clientes/:idCliente"  element={<VerDetalleClienteView/>}/>
          <Route path="/producto/:idProducto"  element={<VerDetalleProductoView/>}/>
          <Route path="/agregarproducto"  element={<AgregarProductoView/>}/>
          <Route path="/ventas"  element={<VentasView/>}/>
          <Route path="/agregarventa"  element={<AgregarVentaView/>}/>
        </Routes>
        </div>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
