require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
// const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const jsonwebtoken = require("jsonwebtoken");
const PORT = process.env.PORT || 3500
const { spawn } = require('child_process');










const http = require('http');
const socketIo = require('socket.io');
const session = require('express-session');

// app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: true,
// }));

app.use(cors(corsOptions))


const server = http.createServer(app);
// const io = socketIo(server);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST"]
  }
});

const connectedUsers = {}; // Store connected users and their socket IDs

io.on('connection', (socket) => {
  console.log("connected")

  // console.log("socket")
  // console.log(socket)


  // const userId = socket.request.session.userId; // Assuming you're using sessions for authentication
  const query = socket.handshake.query;
  console.log("query")
  console.log(query)

  // // Associate the user's socket with their user ID
  // connectedUsers[userId] = socket.id;
  if (query.userId) {
    const userId = query.userId;

    console.log("userId")
    console.log(userId)

    // Associate the user's socket with their user ID
    // if (connectedUsers[userId] === undefined) {
      connectedUsers[userId] = socket.id;
    // }
    console.log("connectedUsers")
    console.log(connectedUsers)
    console.log(connectedUsers["hey"])
 
    socket.on('sendMessage', (data) => {
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

    socket.on('sendAgenda', (data) => {
      console.log("data")
      console.log(data.agenda)
      console.log(data.recipients)
      // Send the message to the specified recipients' sockets
      data.recipients.forEach(recipientId => {
        console.log(recipientId)
        const recipientSocketId = connectedUsers[recipientId];
        console.log(recipientSocketId)
        if (recipientSocketId) {
          console.log("sedning agenda")
          console.log(data)
          io.to(recipientSocketId).emit('receiveAgenda', data );
        }
      });
    });

    socket.on('disconnect', () => {
      // Remove the user's socket ID when they disconnect
      console.log("disconnected")
      delete connectedUsers[userId];
    });
  }

  // socket.on('sendMessage', (data) => {
  //   console.log("data")
  //   console.log(data.message)
  //   console.log(data.recipients)

  //   connectedUsers[data.recipients] = socket.id;
  //   // Send the message to the specified recipients' sockets
  //   // data.recipients.forEach(recipientId => {
  //   //   const recipientSocketId = connectedUsers[recipientId];
  //   //   if (recipientSocketId) {
  //   //     io.to(recipientSocketId).emit('receiveMessage', data.message);
  //   //   }
  //   // });
  //   // io.emit('receiveMessage', data.message);
  // });

  // socket.on('disconnect', () => {
  //   // Remove the user's socket ID when they disconnect
  //   console.log("disconnect")
  //   // delete connectedUsers[userId];
  // });
});

// Set up routes or other middleware as needed

server.listen(3400, () => {
  console.log(`Server is running on port 3400`);
});












console.log(process.env.NODE_ENV)

connectDB()

// app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))
app.use('/users', require('./routes/userRoutes'))
app.use('/notes', require('./routes/noteRoutes'))
app.use('/miro', require('./routes/miroRoutes'))
app.use('/workshops', require('./routes/workshopRoutes'))
app.use('/auth', require('./routes/authRoutes'))










// this is the login path
app.post("/", (req, res) => {
  const id = req.body?.id;
  const password = req.body?.password;
  // console.log("id")
  // console.log(id)
  // console.log("password")
  // console.log(password)
  const authToken = jsonwebtoken.sign({ id, password }, "DUMMYKEY");
  // console.log("authToken when created")
  // console.log(authToken)

  // now we will be setting cookies from server side only.
  // below cookie is httpOnly, its maxAge is 1 day
  // This cookie is valid to all the path in the domain
  res.cookie("authToken", authToken, {
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  // res.statusText = "Current password does not match";

  // return res.status(200).json({ message: 'Current password does not match' })
  res.sendStatus(200);
});

// this path will be used to check if the cookie is valid to auto login inside the application;
app.get("/autoLogin", (req, res) => {
  const cookie = req.headers.cookie;
  // console.log("cookie")
  // console.log(cookie)
  





  // if we received no cookies then user needs to login.
  if (!cookie || cookie === null) {
    return res.sendStatus(401);
  }

  // const authToken = cookie.authToken;
  // console.log("authToken")
  // console.log(authToken)
  // const authToken2 = cookie.slice(cookie.indexOf("=")+1);
  // console.log("authToken2")
  // console.log(authToken2)


  // const decoded = jsonwebtoken.verify(authToken2, 'DUMMYKEY');
  // console.log("decoded")
  // console.log(decoded)

  // // Access the id and password from the payload
  // const id = decoded.id;
  // const password = decoded.password;

  // console.log("id")
  // console.log(id)
  // console.log("password")
  // console.log(password)

  return res.sendStatus(200);
});

// this path will be used to check if the cookie is valid to auto login inside the application;
app.get("/logout", (req, res) => {
  res.clearCookie("authToken");
  return res.sendStatus(200);
});




app.post('/summarise', (req, res) => {
  const { notes } = req.body; // Assuming you're passing parameters as query parameters

  // console.log("notes")
  // console.log(notes)
  // Replace 'python-script.py' with your actual Python script filename
  const pythonProcess = spawn('python', ['NLP.py', notes]);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Summarisation Output: ${data}`);
    res.send(`Summarisation Output: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Summarisation Error: ${data}`);
    res.status(500).send(`Summarisation Error: ${data}`);
  });
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

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})

module.exports = {app}

