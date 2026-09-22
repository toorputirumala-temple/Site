import React, { useEffect, useState } from 'react';
import { Rating, Box, Typography } from '@mui/material';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const AverageRating = () => {
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'site_reviews'));
        let total = 0;
        let numReviews = 0;
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.rating) {
            total += data.rating;
            numReviews += 1;
          }
        });

        if (numReviews > 0) {
          setAverage(total / numReviews);
          setCount(numReviews);
        }
      } catch (error) {
        console.error("Error fetching ratings: ", error);
      }
    };

    fetchRatings();
  }, []);

  if (count === 0) return null;

  return (
    <div className="flex flex-col items-center mt-4 mb-2">
      <div 
        className="flex items-center gap-2 px-4 py-2 rounded-full"
        style={{ backgroundColor: 'rgba(107, 114, 128, 0.4)', backdropFilter: 'blur(4px)' }}
      >
        <Typography variant="body2" sx={{ color: '#fff', fontWeight: 'bold' }}>
          {average.toFixed(1)}
        </Typography>
        <Rating 
          value={average} 
          precision={0.1} 
          readOnly 
          size="small"
          sx={{
            color: '#f5b400',
            '& .MuiRating-iconEmpty': {
              color: '#d1d5db',
            }
          }}
        />
        <Typography variant="caption" sx={{ color: '#e5e7eb', ml: 1 }}>
          ({count} reviews)
        </Typography>
      </div>
    </div>
  );
};

export default AverageRating;
