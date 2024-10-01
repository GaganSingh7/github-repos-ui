import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Container } from 'react-bootstrap';
import Listing from './components/Listing.js';
import Details from './components/Details.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Container>
          <h1>Github Repositories Page</h1>
          <Routes>
            <Route path="/" element={<Listing />} />
            <Route path="/details/:name" element={<Details />} />
          </Routes>
        </Container>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
