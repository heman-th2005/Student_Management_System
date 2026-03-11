import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    name: "",
    usn: "",
    department: "",
    sem: ""
  });

  const [marks, setMarks] = useState("");

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/students");
    setStudents(res.data);
  };

  useEffect(() => {
    if (userRole) {
      fetchStudents();
    }
  }, [userRole]);


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };


  const addStudent = async () => {
    await axios.post("http://localhost:5000/students/add", form);
    fetchStudents();
  };


  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:5000/students/delete/${id}`);
    fetchStudents();
  };


  const updateMarks = async (id) => {

    await axios.put(`http://localhost:5000/students/marks/${id}`, {
      marks: {
        maths: marks
      }
    });

    fetchStudents();
  };


  const handleLogin = () => {

    if (username === "teacher" && password === "1234") {
      setUserRole("teacher");
    }

    else if (username === "student" && password === "1234") {
      setUserRole("student");
    }

    else {
      alert("Invalid login");
    }
  };


  if (!userRole) {

    return (
      <div className="login-container">

        <h2>Login</h2>

        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

      </div>
    );
  }


  return (

    <div className="dashboard">

      <h1>Student Management System</h1>

      {userRole === "teacher" && (

        <div>

          <h2>Add Student</h2>

          <input name="name" placeholder="Name" onChange={handleChange}/>
          <input name="usn" placeholder="USN" onChange={handleChange}/>
          <input name="department" placeholder="Department" onChange={handleChange}/>
          <input name="sem" placeholder="Semester" onChange={handleChange}/>

          <button onClick={addStudent}>
            Add Student
          </button>

        </div>

      )}

      <hr/>

      <h2>Student List</h2>

      {students.map((s) => (

        <div className="student-card" key={s._id}>

          <p>
            {s.name} | {s.usn} | {s.department} | Sem {s.sem}
          </p>

          <p>
            Maths Marks: {s?.marks?.maths || 0}
          </p>


          {userRole === "teacher" && (

            <div>

              <input
                placeholder="Enter Maths Marks"
                onChange={(e)=>setMarks(e.target.value)}
              />

              <button onClick={() => updateMarks(s._id)}>
                Update Marks
              </button>

              <button onClick={() => deleteStudent(s._id)}>
                Delete
              </button>

            </div>

          )}

        </div>

      ))}

    </div>
  );
}

export default App;