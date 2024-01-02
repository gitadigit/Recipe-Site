import './App.css';
import Header from './comp/header';
import HomePage from './comp/homePage';
import GetRecipes from './recipes/r_get';
import { Route, Routes } from 'react-router-dom'
import Signin from './users/signin';
import Login from './users/login';
import DetailsREcipe from './recipes/r_details';
import AddRecipes from './recipes/r_add';
import MyRecipe from './recipes/r_my';
import AddCategory from './categories/c_add';
import GetShopping from './shopping_list/s_get';
import AddShopping from './shopping_list/s_add';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './style.css'

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/homePage' element={<HomePage />} />
        <Route path='/r_get' element={<GetRecipes />} />
        <Route path='/r_details' element={<DetailsREcipe />} />
        <Route path='/r_add' element={<AddRecipes />} />
        <Route path='/r_my' element={<MyRecipe />} />
        <Route path='/r_add' element={<AddRecipes />} />
        <Route path='/c_add' element={<AddCategory />} />
        <Route path='/s_get' element={<GetShopping />} />
        <Route path='/s_add' element={<AddShopping />} />

      </Routes>
      <h5> כל הזכויות שמורות אסתי ריקי עדי</h5>
    </div>
  );
}

export default App;
