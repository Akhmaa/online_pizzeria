import { store } from './redux/store'
import { Provider } from 'react-redux'

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";


const rootElemnt = document.getElementById('root');

if (rootElemnt) {
  const root = ReactDOM.createRoot(rootElemnt);
  root.render(

    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>

  );
}


