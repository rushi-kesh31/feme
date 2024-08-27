import React from 'react';
import './App.css'
import Landing from './Landing'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <>
    <RecoilRoot>
    <Router>
{/*             <Init/> */}
            <Navbar/>
            <Routes>
                <Route path="/" element={<Landing />} />
{/*                 <Route path="/:courseId" element={<Course />} />
                <Route path="/about" element={<CourseList />} />
                <Route path="/purchased" element={<Purchased />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register/>} /> */}
            </Routes>
        </Router>
    </RecoilRoot>
  </>
  )
}



// function Init() {
//   const setUser= useSetRecoilState(userState);

//   const init= async() => {
//     try{
//   const res= await axios.get('https://feb-pi.vercel.app/admin/me', {
//   headers: {"Authorization":`Bearer ${localStorage.getItem('token')}`}
//   });
//   if(res.data.username){
//     setUser({
//       username:res.data.username,
//       isLoading:false
//     });
//   }
// }
// catch{
//   setUser({
//     username:null,
//     isLoading:true
//   })
// }
// }

// useEffect(()=>{
//   init();
// })
// }

export default App
