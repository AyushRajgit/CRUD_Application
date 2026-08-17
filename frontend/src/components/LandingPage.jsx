import { useNavigate } from "react-router-dom";

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Welcome to Student Info Manager</h1>
            <p>Efficiently manage your student database.</p>

            <button
                onClick={()=>navigate('/dashboard')}
                style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
            >
                Manage Students
            </button>
        </div>
    );
}

export default LandingPage;