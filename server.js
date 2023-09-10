require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
// const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const jsonwebtoken = require("jsonwebtoken");
const PORT = process.env.PORT || 3500
const natural = require('natural');
const http = require('http');
const socketIo = require('socket.io');


app.use(cors(corsOptions))


const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "https://whiteboarddj.onrender.com", // Allow requests from this origin
    methods: ["GET", "POST"]
  }
});

const connectedUsers = {}; // Store connected users and their socket IDs

io.on('connection', (socket) => {
  console.log("connected")
  const query = socket.handshake.query;
  console.log("query")
  console.log(query)

  // // Associate the user's socket with their user ID

  if (query.userId) {
    const userId = query.userId;


    console.log("userId")
    console.log(userId)


    connectedUsers[userId] = socket.id;
    io.emit('userList', Object.keys(connectedUsers));

    console.log("connectedUsers")
    console.log(connectedUsers)
 
    socket.on('sendMessage', (data) => {
      console.log("connectedUsers")
      console.log(connectedUsers)
      console.log("data")
      console.log(data.message) 
      console.log(data.recipients)   
      // Send the message to the specified recipients' sockets
      data.recipients.forEach(recipientId => {
        console.log(recipientId)
        const recipientSocketId = connectedUsers[recipientId];
        console.log(recipientSocketId)
        if (recipientSocketId) {
          console.log("sedning messages")
          io.to(recipientSocketId).emit('receiveMessage', data.message );
        }
      });
    });


    socket.on('sendRunnigAgenda', (data) => {
      console.log("data")
      console.log(data.agenda)
      console.log(data.recipients)
      // Send the message to the specified recipients' sockets
      data.recipients.forEach(recipientId => {
        console.log(recipientId)
        const recipientSocketId = connectedUsers[recipientId];
        console.log(recipientSocketId)
        if (recipientSocketId) {
          console.log("sendRunnigAgenda")
          console.log(data)
          io.to(recipientSocketId).emit('receiveRunningAgenda', data );
        }
      });
    });
    

    socket.on('disconnect', () => {
      console.log("disconnected")
      if (query.userId) {
        delete connectedUsers[query.userId];
        io.emit('userList', Object.keys(connectedUsers));
      }
    });
  }


});

// Set up routes or other middleware as needed
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});












console.log(process.env.NODE_ENV)

connectDB()



// app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))
app.use('/users', require('./routes/userRoutes'))
app.use('/notes', require('./routes/noteRoutes'))
app.use('/miro', require('./routes/miroRoutes'))
app.use('/workshops', require('./routes/workshopRoutes'))
app.use('/auth', require('./routes/authRoutes'))










// // this is the login path
// app.post("/", (req, res) => {
//   const id = req.body?.id;
//   const password = req.body?.password;
//   const authToken = jsonwebtoken.sign({ id, password }, "DUMMYKEY");

//   // now we will be setting cookies from server side only.
//   // below cookie is httpOnly, its maxAge is 1 day
//   // This cookie is valid to all the path in the domain
//   res.cookie("authToken", authToken, {
//     path: "/",
//     maxAge: 24 * 60 * 60 * 1000,
//     httpOnly: true,
//   });

//   res.sendStatus(200);
// });

// // this path will be used to check if the cookie is valid to auto login inside the application;
// app.get("/autoLogin", (req, res) => {
//   const cookie = req.headers.cookie;
//   // if we received no cookies then user needs to login.
//   if (!cookie || cookie === null) {
//     return res.sendStatus(401);
//   }

//   return res.sendStatus(200);
// });

// // this path will be used to check if the cookie is valid to auto login inside the application;
// app.get("/logout", (req, res) => {
//   res.clearCookie("authToken");
//   return res.sendStatus(200);
// });




app.post('/summarise', (req, res) => {
  const { notes, sensitivity } = req.body; // Assuming you're passing parameters as query parameters

  try {
    // Tokenize the document into sentences
    const tokenizer = new natural.SentenceTokenizer();
    const sentences = tokenizer.tokenize(notes);

    // Create a new TfIdf instance
    const tfidf = new natural.TfIdf();

    // Add documents (sentences) to the TfIdf instance
    sentences.forEach((sentence) => {
      tfidf.addDocument(new natural.WordTokenizer().tokenize(sentence));
    });

    // Calculate the TF-IDF scores and select top sentences for summary
    const numSentencesInSummary = sensitivity; // Change this as needed
    const summarySentences = [];
    sentences.forEach((sentence, sentenceIndex) => {
      let totalScore = 0;
      const tokens = new natural.WordTokenizer().tokenize(sentence);
      tokens.forEach((token) => {
        totalScore += tfidf.tfidf(token, sentenceIndex);
      });
      summarySentences.push({ sentence, score: totalScore });
    });

    // Sort sentences by score and get the top N sentences
    summarySentences.sort((a, b) => b.score - a.score);
    const topSentences = summarySentences.slice(0, numSentencesInSummary);

    const summary = topSentences.map((item) => item.sentence).join(' ');
    res.json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }


});

 







app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

// app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
})

mongoose.connection.on('error', err => {
    console.log(err)
})

module.exports = {app}