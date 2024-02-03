import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth';

function Dashboard() {
    const { setAuthTokens } = useAuth();
    return (
        <div>
        <div>Dashboard</div>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <button onClick={() => { setAuthTokens(); }}>Logout</button>
        </div>
    );
    }

export default Dashboard;