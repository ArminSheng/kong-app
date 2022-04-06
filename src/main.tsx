import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import 'antd/dist/antd.css';
import { QueryClient, QueryClientProvider, useQueryClient } from 'react-query'

const client = new QueryClient()

function Main() {
  return <React.StrictMode>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
)
