import React, { forwardRef } from 'react';
import { Card, Typography, CardContent } from '@mui/material';
import './message.css';

const Message = forwardRef(({ message, username }, ref) => {
  const isUser = username === message.username;

  return (
    <div ref={ref} className={`message__card ${isUser && 'message__user'}`}>
      <Card className={isUser ? 'message__usercard' : 'message__guestcard'}>
        <CardContent>
          <Typography color="black" variant="h5" component="h2">
            {!isUser && `${message.username || 'Unknown User'}: `}{message.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;