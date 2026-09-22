import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Button, TextField, Box } from '@mui/material';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import PeekRating from './PeekRating';
import { toast } from 'react-toastify';

const ReviewModal = () => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(3);
  const [review, setReview] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const hasReviewed = localStorage.getItem('hasReviewed');
    if (hasReviewed) return;

    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
      deviceId = crypto.randomUUID();
      localStorage.setItem('deviceId', deviceId);
    }

    const timer = setTimeout(() => {
      setOpen(true);
    }, 20000); // 20 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error('Please select a rating.');
      return;
    }

    setSubmitting(true);
    try {
      const deviceId = localStorage.getItem('deviceId');
      await addDoc(collection(db, 'site_reviews'), {
        deviceId,
        rating,
        review,
        timestamp: serverTimestamp()
      });
      
      localStorage.setItem('hasReviewed', 'true');
      toast.success('Thank you for your feedback!');
      setOpen(false);
    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('Failed to submit review.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={() => setOpen(false)} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '20px',
          padding: '16px',
          background: 'linear-gradient(to bottom, #ffffff, #fafafa)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          border: '1px solid rgba(245, 180, 0, 0.2)'
        }
      }}
    >
      <DialogTitle align="center" sx={{ fontWeight: 'bold', pb: 1 }}>
        <span 
          style={{ 
            fontFamily: "'Outfit', sans-serif", 
            fontSize: '1.5rem', 
            color: '#1f2937' 
          }}
        >
          How was your experience?
        </span>
      </DialogTitle>
      
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" gap={4} py={2}>
          
          <PeekRating
            defaultValue={3}
            value={rating}
            count={5}
            shape="star"
            labels={['Poor', 'Fair', 'Good', 'Great', 'Superb']}
            activeColor="#f5b400"
            idleColor="#d1d5db"
            tipColor="#1f2937"
            tipTextColor="#f3f4f6"
            size={48}
            lift={8}
            magnify={1.15}
            riseDuration={320}
            popScale={1.3}
            showTip
            allowClear
            onChange={setRating}
            readOnly={false}
          />
          
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Tell us what you think..."
            variant="outlined"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                '& fieldset': {
                  borderColor: '#e5e7eb',
                  transition: 'border-color 0.2s',
                },
                '&:hover fieldset': {
                  borderColor: '#f5b400',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#f47728',
                },
              },
            }}
          />

          <Button 
            variant="contained" 
            fullWidth 
            size="large"
            onClick={handleSubmit}
            disabled={submitting}
            sx={{
              mt: 1,
              py: 1.5,
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              textTransform: 'none',
              background: 'linear-gradient(135deg, #f5c842 0%, #f47728 100%)',
              color: '#ffffff',
              boxShadow: '0 4px 14px rgba(244, 119, 40, 0.4)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #f47728 0%, #e0601b 100%)',
                boxShadow: '0 6px 20px rgba(244, 119, 40, 0.6)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            {submitting ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
