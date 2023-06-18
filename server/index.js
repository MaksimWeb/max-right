const express = require('express');
const ws = require('ws');
const { connectToDb, getDb } = require('./db.js');
const { ObjectId } = require('mongodb');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const HOST = 'localhost';
const PORT = 3000;
const SECRET = 'psdpasdpasdasjdpa';
const MAX_AGE = 60 * 60 * 24 * 30 * 1000;

const app = express();
app.use(express.json());
app.use(cors());

let db;

const handleError = (res, error) => {
  res.status(500).json(error);
};

connectToDb((err) => {
  if (!err) {
    app.listen(PORT, HOST, () => {
      console.log('Server is running');
    });

    db = getDb();
  } else {
    console.log(`DB connection err ${err}`);
  }
});

const wss = new ws.Server(
  {
    port: 1000,
  },
  () => console.log('Server started on 1000')
);

wss.on('connection', (ws) => {
  ws.on('message', async (message) => {
    message = JSON.parse(message);
    switch (message.event) {
      case 'message': {
        broadCastMessage(message);
        break;
      }
      case 'connection': {
        break;
      }
    }
  });

  setInterval(() => {
    const posts = [];

    db.collection('posts')
      .find()
      .forEach((el) => posts.push(el))
      .then(() => {
        wss.clients.forEach((client) => {
          client.send(JSON.stringify({ event: 'getPosts', message: posts }));
        });
      })
      .catch(() => console.log('Something went wrong'));
  }, 10000);
});

app.get('/posts', (req, res) => {
  const posts = [];

  db.collection('posts')
    .find()
    .forEach((el) => posts.push(el))
    .then(() => {
      res.status(200).json(posts);
    })
    .catch(() => handleError(res, 'Something went wrong'));
});

app.get('/post-preview', (req, res) => {
  const postType = req.query.type;

  db.collection('posts')
    .findOne({ slug: postType })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => handleError(res, 'Something went wrong'));
});

app.post('/posts', (req, res) => {
  db.collection('posts')
    .insertOne(req.body)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch(() => handleError(res, 'Something went wrong'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.collection('users')
    .findOne({ username, password })
    .then((result) => {
      const accessToken = jwt.sign({ username }, SECRET, {
        expiresIn: MAX_AGE,
      });

      res.cookie('UserCookies', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: MAX_AGE,
        path: '/',
      });

      res.status(200).json({ ...result, accessToken });
    })
    .catch(() => handleError(res, 'Something went wrong'));
});

// async function login(message) {
//   const { username, password } = message.message;

//   const user = await db
//     .collection('users')
//     .findOne({ username, password })
//     .then((result) => result);

//   return user;
// }

function broadCastMessage(message) {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
}

// app.post('/todos', (req, res) => {
//   db.collection('todos')
//     .insertOne(req.body)
//     .then((result) => {
//       res.status(201).json(result);
//     })
//     .catch(() => handleError(res, 'Something went wrong'));
// });

// app.patch('/todos/:id', (req, res) => {
//   if (ObjectId.isValid(req.params.id)) {
//     db.collection('todos')
//       .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
//       .then((result) => {
//         res.status(200).json(result);
//       })
//       .catch(() => handleError(res, 'Something is went wrong'));
//   } else {
//     handleError(res, { error: 'Wrong id' });
//   }
// });

// app.delete('/todos/:id', (req, res) => {
//   if (ObjectId.isValid(req.params.id)) {
//     db.collection('todos')
//       .deleteOne({ _id: new ObjectId(req.params.id) })
//       .then((result) => {
//         res.status(200).json(result);
//       })
//       .catch(() => handleError(res, 'Something is went wrong'));
//   } else {
//     handleError(res, { error: 'Wrong id' });
//   }
// });
