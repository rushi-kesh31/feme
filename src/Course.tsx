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

interface Course {
  title: string;
  description: string;
  price: number;
  imageLink: string;
  published: boolean;
  _id: string;
  productd: string;
  rating: number;
}

function Course() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };
  
  const { courseId } = useParams();
  const setCourse = useSetRecoilState(courseState);
  const isLoading = useRecoilValue(courseLoading);
  const title = useRecoilValue(courseTitle);
  const des = useRecoilValue(courseDes);
  const price = useRecoilValue(coursePrice);
  const images = useRecoilValue(courseImage);
  const productdd = useRecoilValue(productd);
  const rate = useRecoilValue(rating);

  useEffect(() => {
    const func = () => {
      axios.get(`https://feb-pi.vercel.app/admin/courses`, {
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

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };



  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Ensure img is always an array

  return (
    <>
      <div style={{  marginTop: 100, marginLeft: 80, marginRight: 50 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <div>
              <Typography variant='h4' style={{ fontWeight: 500, fontFamily: "helvetica" }}>{title + " "}</Typography> <br />
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
            <div style={{ maxWidth: 700, margin: '0 auto' }}>
              <div className='max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group'>
      <div
        style={{ backgroundImage: `url(${slides[currentIndex]})` }}
        className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
      ></div>
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className='flex top-4 justify-center py-2'>
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className='text-2xl cursor-pointer'
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
    </>
  );
}

export default Course;
