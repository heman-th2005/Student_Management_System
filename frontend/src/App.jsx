import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {

const [user,setUser] = useState(null);
const [students,setStudents] = useState([]);

const [isSignup,setIsSignup] = useState(false);
const [signupStep,setSignupStep] = useState(1);

const [form,setForm] = useState({
email:"",
password:"",
role:"student",
name:"",
usn:"",
department:"",
sem:""
});

const [marks,setMarks] = useState({});
const [attendance,setAttendance] = useState({});


const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const handleMarks=(e)=>{
setMarks({...marks,[e.target.name]:e.target.value});
};

const handleAttendance=(e)=>{
setAttendance({...attendance,[e.target.name]:e.target.value});
};


/* LOGIN */

const login = async()=>{

try{

const res = await axios.post(
"http://localhost:5000/students/login",
{
email:form.email,
password:form.password
}
);

setUser(res.data);

}catch{

alert("Invalid credentials");

}

};


/* SIGNUP */

const signup = async()=>{

try{

await axios.post(
"http://localhost:5000/students/signup",
form
);

alert("Signup successful");

setIsSignup(false);
setSignupStep(1);

}catch{

alert("Signup failed");

}

};


/* FETCH STUDENTS */

const fetchStudents = async()=>{

const res = await axios.get(
"http://localhost:5000/students"
);

setStudents(res.data);

};

useEffect(()=>{

if(user?.role==="teacher"){
fetchStudents();
}

},[user]);


/* UPDATE MARKS */

const updateMarks = async(id)=>{

await axios.put(
`http://localhost:5000/students/marks/${id}`,
{marks}
);

fetchStudents();

};


/* UPDATE ATTENDANCE */

const updateAttendance = async(id)=>{

await axios.put(
`http://localhost:5000/students/attendance/${id}`,
{attendance}
);

fetchStudents();

};


/* DELETE STUDENT */

const deleteStudent = async(id)=>{

await axios.delete(
`http://localhost:5000/students/delete/${id}`
);

fetchStudents();

};


const logout=()=>{
setUser(null);
};


/* ================= LOGIN / SIGNUP PAGE ================= */

if(!user){

return(

<div className="login-container">

{!isSignup ? (

<>

<h2>Login</h2>

<input
placeholder="Email"
name="email"
onChange={handleChange}
/>

<input
type="password"
placeholder="Password"
name="password"
onChange={handleChange}
/>

<button onClick={login}>Login</button>

<p>
Don't have account?
<span onClick={()=>setIsSignup(true)}> Signup</span>
</p>

</>

):(


<>

<h2>Signup</h2>

{/* STEP 1 */}

{signupStep===1 && (

<>

<input
placeholder="Email"
name="email"
onChange={handleChange}
/>

<input
type="password"
placeholder="Password"
name="password"
onChange={handleChange}
/>

<select
name="role"
onChange={handleChange}
>

<option value="student">Student</option>
<option value="teacher">Teacher</option>

</select>

<button onClick={()=>{

if(form.role==="student"){
setSignupStep(2);
}else{
signup();
}

}}>
Next
</button>

</>

)}


{/* STEP 2 */}

{signupStep===2 && (

<>

<input
name="name"
placeholder="Name"
onChange={handleChange}
/>

<input
name="usn"
placeholder="USN"
onChange={handleChange}
/>

<input
name="department"
placeholder="Department"
onChange={handleChange}
/>

<input
name="sem"
placeholder="Semester"
onChange={handleChange}
/>

<button onClick={signup}>
Signup
</button>

</>

)}

<p>
Already have account?
<span onClick={()=>setIsSignup(false)}> Login</span>
</p>

</>

)}

</div>

)

}


/* ================= DASHBOARD ================= */

return(

<div className="app">

<div className="sidebar">

<h2>EduPortal</h2>

<ul>

<li>Dashboard</li>

{user.role==="teacher" && <li>Students</li>}

<li onClick={logout}>Logout</li>

</ul>

</div>


<div className="main">

<div className="topbar">

<h2>Welcome {user.name || user.email}</h2>

<span className="role">{user.role}</span>

</div>


{/* TEACHER DASHBOARD */}

{user.role==="teacher" && (

<div className="student-grid">

{students.map((s)=>(

<div className="student-card" key={s._id}>

<h3>{s.name}</h3>

<p>{s.usn}</p>
<p>{s.department}</p>
<p>Sem {s.sem}</p>


<h4>Marks</h4>

<p>Maths: {s.marks?.maths}</p>
<p>Physics: {s.marks?.physics}</p>
<p>Chemistry: {s.marks?.chemistry}</p>
<p>Computer: {s.marks?.computer}</p>


<input name="maths" placeholder="Maths" onChange={handleMarks}/>
<input name="physics" placeholder="Physics" onChange={handleMarks}/>
<input name="chemistry" placeholder="Chemistry" onChange={handleMarks}/>
<input name="computer" placeholder="Computer" onChange={handleMarks}/>

<button onClick={()=>updateMarks(s._id)}>
Update Marks
</button>


<h4>Attendance</h4>

<p>Maths: {s.attendance?.maths}%</p>
<p>Physics: {s.attendance?.physics}%</p>
<p>Chemistry: {s.attendance?.chemistry}%</p>
<p>Computer: {s.attendance?.computer}%</p>


<input name="maths" placeholder="Maths %" onChange={handleAttendance}/>
<input name="physics" placeholder="Physics %" onChange={handleAttendance}/>
<input name="chemistry" placeholder="Chemistry %" onChange={handleAttendance}/>
<input name="computer" placeholder="Computer %" onChange={handleAttendance}/>

<button onClick={()=>updateAttendance(s._id)}>
Update Attendance
</button>


<button
className="delete"
onClick={()=>deleteStudent(s._id)}
>
Delete
</button>

</div>

))}

</div>

)}


{/* STUDENT DASHBOARD */}

{user.role==="student" && (

<div className="profile-card">

<h2>{user.name}</h2>

<p>USN: {user.usn}</p>
<p>Department: {user.department}</p>
<p>Semester: {user.sem}</p>

<h3>Marks</h3>

<p>Maths: {user.marks?.maths}</p>
<p>Physics: {user.marks?.physics}</p>
<p>Chemistry: {user.marks?.chemistry}</p>
<p>Computer: {user.marks?.computer}</p>

<h3>Attendance</h3>

<p>Maths: {user.attendance?.maths}%</p>
<p>Physics: {user.attendance?.physics}%</p>
<p>Chemistry: {user.attendance?.chemistry}%</p>
<p>Computer: {user.attendance?.computer}%</p>

</div>

)}

</div>

</div>

);

}

export default App;
