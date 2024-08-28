import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { courseDes, courseImage, courseLoading, coursePrice, courseTitle, productd, rating } from "./store/selectors/courseSL";
import { courseState } from "./store/atoms/course";
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import Box from '@mui/material/Box';
import { Divider, Grid } from '@mui/material'; 
import { Purchase } from './Purchased';
import Footer from "./Footer";

interface Course {
  title: string;
  description: string;
  price: number;
  imgageLink: string;
  published: boolean;
  _id: string;
  productd: string;
  rating: number;
}


function Course() {
  const { courseId } = useParams();
  const setCourse = useSetRecoilState(courseState);
  const isLoading = useRecoilValue(courseLoading);
  const title = useRecoilValue(courseTitle);
  const des = useRecoilValue(courseDes);
  const price = useRecoilValue(coursePrice);
  const slides = useRecoilValue(courseImage); 
  const productdd = useRecoilValue(productd);
  const rate = useRecoilValue(rating);

  useEffect(() => {
    const func = () => {
      axios.get(`https://femessencebackend.vercel.app/admin/courses`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
      }).then((res) => {
        const foundCourse = res.data.find((course: Course) => course._id === courseId);
        if (foundCourse) {
          setCourse({
            isLoading: false,
            course: foundCourse
          });
        }
      }).catch(error => {
        console.error("Error fetching course data:", error);
        setCourse({ isLoading: false, course: null });
      });
    };
    func();
  }, [courseId, setCourse]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div style={{ marginTop: 100, marginLeft: 80, marginRight: 50, marginBottom:150 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <div>
              <Typography variant='h4' style={{ fontWeight: 500, fontFamily: "helvetica" }}>{title + " "}</Typography>
              <br />
              <Typography style={{ color: "grey" }} variant='h6'>{des}</Typography>
              <Box height={50} width={150} my={4} display="flex" alignItems="center" gap={4} p={2} sx={{ border: '2px solid grey' }}>
                {rate} Stars
              </Box>
              <Divider />
              <br /><br />
              <Typography variant='h5'>Price: Rs {price}/-</Typography>
              <br /> <br />
              <Typography variant='h6'>Product Description</Typography>
              <br />
              <Typography style={{ color: "grey" }} variant='h6'>{productdd}</Typography>
              <Button
                size="large"
                sx={{ width: 200, mt: 10, backgroundColor: '#633EBB', color: 'white' }}
                onClick={() => courseId && Purchase(courseId)}
              >
                Buy Now
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className='relative w-full h-full'>
              <div className='relative w-full h-full max-h-[700px] max-w-[700px] mx-auto group'>
                <div
                  style={{ backgroundImage: `url(${slides[currentIndex]})` }}
                  className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
                ></div>
                
                {/* Left Arrow */}
                <div className='absolute top-[50%] left-5 -translate-y-1/2 bg-black/30 p-2 rounded-full cursor-pointer group-hover:block'>
                  <BsChevronCompactLeft onClick={prevSlide} size={30} className='text-white' />
                </div>

                {/* Right Arrow */}
                <div className='absolute top-[50%] right-5 -translate-y-1/2 bg-black/30 p-2 rounded-full cursor-pointer group-hover:block'>
                  <BsChevronCompactRight onClick={nextSlide} size={30} className='text-white' />
                </div>

                {/* Dots */}
                <div className='flex justify-center py-2'>
                  {slides.map((_, slideIndex) => (
                    <div
                      key={slideIndex}
                      onClick={() => goToSlide(slideIndex)}
                      className={`text-2xl cursor-pointer ${slideIndex === currentIndex ? 'text-gray-800' : 'text-gray-400'}`}
                    >
                      <RxDotFilled />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </>
  );
}

export default Course;

