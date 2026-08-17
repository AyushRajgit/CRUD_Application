import { BrowserRouter, Routes, Route} from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import StudentDashboard from "./components/StudentDashboard.jsx";
import StudentForm from "./components/StudentForm.jsx";
import UpdateStudent from "./components/UpdateStudent.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/dashboard" element={<StudentDashboard/>}/>
                <Route path="/add-student" element={<StudentForm />} />
                <Route path="/update-student/:id" element={<UpdateStudent />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;