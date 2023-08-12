
import ReactDOM from 'react-dom/client'
import App from './App'
import './root.css'
import { Provider } from 'react-redux'
import {store} from './AppConfig/Redux/store'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  // {/* </React.StrictMode>, */}
)
