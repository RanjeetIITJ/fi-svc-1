import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ButtonAppBar from './navBar';
import TransactionForm from './transactionForm';
import Insights from './insights';

function App() {
  return (
    <Router>
        <ButtonAppBar />
        <Routes>
          <Route exact path="/" element={<TransactionForm />} />
          <Route path="/insights" element={<Insights/>}/>
        </Routes>
    </Router>
  );
}

export default App;
