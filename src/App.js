import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/router';

function App() {
  return (
    <div className="App w-[1280px] mx-auto">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
