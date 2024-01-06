import { useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, Input } from '@mui/material';
import './App.css';
import Message from './Message';
import { database } from './firebase';
import 'firebase/compat/firestore';
import { collection, getDocs, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import FlipMove from 'react-flip-move'
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [sendMessageTrigger, setSendMessageTrigger] = useState(false);

  useEffect(() => {
    setUsername(prompt('Enter your name'));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(database, 'messages'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const messagesData = querySnapshot.docs.map((doc) => doc.data());
      setMessages(messagesData);
    };
  
    fetchData();
  
    const q = query(collection(database, 'messages'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }));
      setMessages(messagesData);
    });
  
    return () => unsubscribe();
  }, [database]);

  useEffect(() => {
    if (sendMessageTrigger) {
      const addToFirestore = async () => {
        try {
          const docRef = await addDoc(collection(database, 'messages'), {
            message: input,
            username: username,
            timestamp: serverTimestamp(),
          });
          console.log('Document written with ID: ', docRef.id);
        } catch (error) {
          console.error('Error adding document: ', error);
        }
        setInput('');
        setSendMessageTrigger(false); 
      };
      addToFirestore();
    }
  }, [sendMessageTrigger, input, username, database]);

  const sendMessage = (event) => {
    event.preventDefault();
    setSendMessageTrigger(true);
  };

  return (
    <div className="app">
      <h1 className='logo'>A</h1>
      <h2>Welcome {username}</h2>

      <form className='app__form'>
        <FormControl className='app__formcontrol'>
          <Input className='app__input' placeholder='Enter a message...' value={input} onChange={(event) => setInput(event.target.value)} />

          <IconButton className='app__btn' disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {messages.map(({message, id}) => (
          <Message key={id} username={username} message={message} />
        ))
        }
      </FlipMove>
      
    </div>
  );
}

export default App;