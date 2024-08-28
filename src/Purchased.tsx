import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { pcourseState, PCState } from './store/atoms/pcourses';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import Footer from "./Footer";

// Define types for course
interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  imgageLink: string;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  border: 'none',
}));

const ImageWrapper = styled('div')({
  flex: '0 0 auto',
  width: '40%', 
  marginRight: '1rem',
});

const TextWrapper = styled('div')({
  flex: '1 1 auto',
});

function Purchased() {
  const [courses, setCourses] = useState<Course[]>([]);
  const setPcourses = useSetRecoilState(pcourseState);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('https://femessencebackend.vercel.app/admin/courses', {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
      });
      setCourses(res.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setPcourses((prevState) => ({ ...prevState, isLoading: true }));
      try {
        const res = await axios.get('https://femessencebackend.vercel.app/admin/purchasedCourses', {
          headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
        });
        setPcourses({
          isLoading: false,
          pcourse: res.data.purchasedCourses.map((course: Course) => course._id),
        });
      } catch (error) {
        console.error('Error fetching purchased courses:', error);
        setPcourses((prevState) => ({ ...prevState, isLoading: false }));
      }
    };
    fetchData();
  }, [setPcourses]);

  return (
    <>
      <TodosDiv courses={courses} />
    </>
  );
}

export function Purchase(courseid: string) {
  const pushPurchase = async () => {
    await axios.post(`https://femessencebackend.vercel.app/admin/courses/${courseid}`, {}, {
      headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
    });
  };
  pushPurchase();
}

interface TodosProps {
  title: string;
  description: string;
  price: number;
  link: string;
  id: string;
}

export function Todos({ title, description, price, link, id }: TodosProps) {
  const navigate = useNavigate();

  return ( 
    <div style={{ marginBottom: 20, padding: '1rem', borderRadius: 8, display: 'flex', alignItems: 'center' }}>
      <ImageWrapper>
        <img src={link} alt={title} style={{ borderRadius: 8, width: '100%', height: 'auto', objectFit: 'cover' }} />
      </ImageWrapper>
      <TextWrapper>
        <Typography variant='h5' style={{ fontWeight: 700, fontFamily: 'helvetica', marginBottom: 10 }}>{title}</Typography>
        <Typography variant='body1' style={{ marginBottom: 10 }}>{description}</Typography>
        <Typography variant='body2'>Price: Rs {price}/-</Typography>
        <Button variant="contained" style={{ color: 'black', backgroundColor: 'white' }} onClick={() => { navigate(`/${id}`) }}>View</Button>
      </TextWrapper>
    </div>
  );
}

interface TodosDivProps {
  courses: Course[];
}

function TodosDiv({ courses }: TodosDivProps) {
  const purchasedCoursesState = useRecoilValue<PCState>(pcourseState);

  if (purchasedCoursesState.isLoading) {
    return <div>Loading purchased courses...</div>;
  }

  return (<>
    <div style={{ display: "flex", padding: 50, justifyContent: "space-around", flexWrap: "wrap" , marginBottom: 500}}>
      <Grid container spacing={2}>
        {courses.map((course: Course) => {
          return purchasedCoursesState.pcourse.includes(course._id) ? (
            <Grid item xs={4} key={course._id}>
              <Item>
                <Link to={`/${course._id}`} style={{ textDecoration: 'none' }}>
                  <Card>
                    <CardContent>
                      <Todos
                        title={course.title}
                        description={course.description}
                        price={course.price}
                        link={course.imgageLink}
                        id={course._id}
                      />
                    </CardContent>
                  </Card>
                </Link>
              </Item>
            </Grid>
          ) : null;
        })}
      </Grid>
    </div>
    <Footer />
    </>
  );
}

export default Purchased;
