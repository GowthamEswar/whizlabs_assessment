import { Route, Routes } from 'react-router-dom';
import MinimalLayout from '../layouts/MinimalLayout';
import MainLayout from '../layouts/MainLayout';
import SignIn from '../pages/SignIn';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import ChatMessages from '../pages/ChatMessages';
import CartIndex from '../pages/Cart';
import ProductIndex from '../pages/Product';
import NotFound from '../pages/NotFound';

function MainRoutes() {
    
    return (
        <Routes>
            <Route path="/" element={<MinimalLayout />}>
                <Route index element={<SignIn />} />
                <Route path='signup' element={<Signup />} />
            </Route>
            <Route path="app" element={<MainLayout />}>
                <Route  path='dashboard' element={<Dashboard />} />
                <Route  path='chats' element={<ChatMessages />} />
                <Route  path='cart' element={<CartIndex />} />
                <Route  path='product' element={<ProductIndex />} />
            </Route>  
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default MainRoutes