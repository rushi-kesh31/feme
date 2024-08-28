import { useEffect } from 'react'
import './App.css'
import Landing from './Landing'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'
import Register from './Register'
import Course from './Course'
import axios from 'axios'
import Navbar from './Navbar';
import {
  RecoilRoot,
  useSetRecoilState,
} from 'recoil';
import { userState } from './store/atoms/user.ts';
import CourseList from './CourseList';
import Purchased from './Purchased';
import Aboutus from './Aboutus';



function App() {
  
  return (
    <>
    <RecoilRoot>
    <Router>
            <Init/>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/:courseId" element={<Course />} />
                <Route path="/purchased" element={<Purchased />} />
                <Route path="/about" element={<CourseList />} />
                <Route path="/aboutus" element={<Aboutus />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register/>} /> 
            </Routes>
        </Router>
    </RecoilRoot>
  </>
  )
}



function Init() {
  const setUser= useSetRecoilState(userState);

  const init= async() => {
    try{
  const res= await axios.get('https://femessencebackend.vercel.app/admin/me', {
  headers: {"Authorization":`Bearer ${localStorage.getItem('token')}`}
  });
  if(res.data.username){
    setUser({
      username:res.data.username,
      isLoading:false
    });
  }
}
catch{
  setUser({
    username:null,
    isLoading:true
  })
}
}

useEffect(()=>{
  init();
})
  return null;
}

export default App
