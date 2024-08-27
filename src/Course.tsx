import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { courseDes, courseImage, courseLoading, coursePrice, courseTitle, productd, rating } from "./store/selectors/courseSL";
import { courseState } from "./store/atoms/course";
import Slider from "react-slick";
import Box from '@mui/material/Box';
import { Divider, Grid } from '@mui/material'; 
import { Purchase } from './Purchased';

interface Course {
  title: string;
  description: string;
  price: number;
  imageLink: string | string[];
  published: boolean;
  _id: string;
  productd: string;
  rating: number;
}

function Course() {
  // ... (previous code remains the same)

  const images = useRecoilValue(courseImage);

  // ... (rest of the component remains the same)

  return (
    <>
      {/* ... (previous JSX remains the same) */}
      <Grid item xs={12} sm={6}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <Slider {...settings}>
            {images.map((imageLink: string, index: number) => (
              <div key={index}>
                <img src={imageLink} alt={`Slide ${index + 1}`} style={{ width: "100%" }} />
              </div>
            ))}
          </Slider>
        </div>
      </Grid>
      {/* ... (rest of the JSX remains the same) */}
    </>
  );
}

export default Course;
