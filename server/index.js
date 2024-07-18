const express = require('express');
const cors = require('cors');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const db = require('./models/Model');

const multer  = require('multer');
const path = require('path');

// const upload = multer({ dest: 'uploads/' });



const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(cors({
  origin: 'http://localhost:3001',
  // credentials:true
   
  }));




app.use(express.json());




const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_secret_key',
};

passport.use(new JWTStrategy(jwtOptions, (jwtPayload, done) => {
  // You can implement your own logic to validate the token and find the user here
  // For simplicity, let's assume we always return the user
  db.get(`SELECT * FROM User WHERE id = ?`, [jwtPayload.id], (err, row) => {
    if (err) done(err, false);
    if (row) done(null, row);
    done(null, false);
});

   return done(null, { id: jwtPayload.id ,username:jwtPayload.username,is_admin:jwtPayload.is_admin,karma:jwtPayload.karma+jwtPayload.Lkarma});
}));
passport.use(JWTStrategy);


// // Multer setup to handle file upload
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Save the uploaded file to the "uploads" directory
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); // Use the original file name
//   }
// });
// const upload = multer({ dest: 'uploads/' })

  
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure that the 'uploads' directory exists
  },
  filename: function (req, file, cb) {
    const fileExt = file.originalname.split('.').pop(); // Get the file extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExt); // Add the file extension
  }
});
const upload = multer({ storage: storage });


// Login Route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM User WHERE username = ?', [username], (err, row) => {
    if (err || !row) {
      res.status(401).json({ message: 'Invalid username or password' });
    } else {
      bcrypt.compare(password, row.password, (err, result) => {
        if (err || !result) {
          res.status(401).json({ message: 'Invalid username or password' });
        } else {
          const token = jwt.sign({ id: row.id, username: row.username, is_admin: row.is_admin }, jwtOptions.secretOrKey);
          res.status(200).json({ token: token, is_admin: row.is_admin, username: row.username ,karma:row.karma+row.Lkarma,userid:row.id});
        }
      });
    }
  });
});











app.get('/api/test', (req, res) => {
 
    
            res.status(200).json({ message: 'test is here ' });
        
});


// Protected route
app.get('/api/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
 
  console.log(req.user)
  res.status(200).json({ message: `Hello, ${req.user.username}! You are an admin: ${req.user.is_admin}` });
});






app.post('/api/register', upload.single('image'), (req, res) => {
  const { username, email, password ,is_admin} = req.body;
  console.log(username, email, password)
  const imagePath = req.file.path;

  // Check if the username or email already exists
  db.get('SELECT * FROM User WHERE username = ? OR email = ?', [username, email], function (err, row) {
    if (row) {
      res.status(400).json({ message: 'Username or email already in use' });
    } else {
      // Hash the password
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Insert the new user into the database
      db.run('INSERT INTO User (username, email, password,is_admin,header_image_path) VALUES (?, ?, ?,?,?)', [username, email, hashedPassword,is_admin,imagePath], function (err) {
        if (err) {
          res.status(500).json({ message: 'Error registering user' });
        } else {
          res.status(201).json({ message: 'User registered successfully' });
        }
      });
    }
  });
});


// Route to handle file upload
app.post('/api/upload', upload.single('file'), (req, res) => {
 
  // if (req.isAuthenticated()) {
    const { file_name, ideaTitle } = req.body; // Assuming ideaTitle is sent in the request body
    const file_path = req.file.path;
    console.log(req.file)

    // Get the idea_id by querying the Idea table based on the title
    db.get(
      'SELECT id FROM Idea WHERE title = ?',
      [ideaTitle],
      (err, row) => {
        if (err) {
          console.error(err.message);
          res.status(500).send('Failed to retrieve the idea from the database');
        } else if (row) {
          const ideaId = row.id;
          // Insert the IdeaFile into the database and associate it with the idea_id
          db.run(
            `INSERT INTO IdeaFile (idea_id, file_name, file_path) VALUES (?, ?, ?)`,
            [ideaId, file_name, file_path],
            function(err) {
              if (err) {
                console.error(err.message);
                res.status(500).send('Failed to add the IdeaFile to the database');
              } else {
                res.status(201).send('IdeaFile added successfully');
              }
            }
          );
        } else {
          res.status(404).send('Idea with the specified title not found');
        }
      }
    );
  // } else {
  //   res.status(401).json({ message: 'Unauthorized' });
  // }

});

// Function to generate a random string
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomString;
}
app.post('/api/ideas1',upload.single('image'), passport.authenticate('jwt', { session: false }),  (req, res) => {
  
  const user = req.user;  // The authenticated user
  const newIdea = req.body;
  console.log(req.body)

 // Get the image file name
 const imageName = req.file
 console.log("Image Name:", imageName)
// Insert into Idea table
db.run(`INSERT INTO Idea (user_id, title, description, header_image_path, karma)
VALUES (?, ?, ?, ?, 1.0)`,
[user.id, newIdea.title, newIdea.description,'uploads/'+ imageName.filename]);
res.status(201).json({ message: 'New idea has been added successfully' });
// Get the new idea's id


});





// Route to add a new idea with image upload
app.post('/api/ideas', passport.authenticate('jwt', { session: false }),  (req, res) => {
  
     const user = req.user;  // The authenticated user
     const newIdea = req.body;
     console.log(req.body)
    console.log("fffffffffffffffffffffffffffffffffffff",req.file)
    res.status(200).json({ message: `Hello, ${req.user.username}! You are an admin: ${req.user.is_admin}` });
    // res.json({ message: 'Failed to save the uploaded image' });
    // if (req.file) {
    //   const originalImageName = req.file.originalname;
    //   const imageExtension = originalImageName.split('.').pop();  // Get the file extension
    //   const imageRandomPrefix = generateRandomString(5);  // Generate a random string to append to the file name
    //   const newImageName = `${imageRandomPrefix}_${originalImageName}`;

    //   const imagePath = 'uploads/' + newImageName;
    //   console.log("fffffffffffffffffffffffffffffffffffff"+imagePath)
    //   // Move the uploaded file to the desired upload folder and name it with the new filename
    //   req.file.mv(imagePath, function(err) {
    //     if (err) {
    //       console.error(err);
    //       res.status(500).send('Failed to save the uploaded image');
    //     } else {
    //       // Update the database with the new idea and the new image path
    //       db.run('INSERT INTO Idea (user_id, title, description, header_image_path) VALUES (?, ?, ?, ?)',
    //         [user.id, newIdea.title, newIdea.description, imagePath],
    //         function(err) {
    //           if (err) {
    //             console.error(err.message);
    //             res.status(500).send('Failed to add the idea to the database');
    //           } else {
    //             res.status(201).send('Idea added successfully');
    //           }
    //         }
    //       );
    //     }
    //   });
    // } else {
    //   // Handle the case when no file is uploaded
    //   res.status(400).send('No image file was uploaded');
    // }
 
});

app.delete('/api/deletetextblock/:blockId', (req, res) => {
  const blockId = req.params.blockId;

  // Assuming db is your database connection
  db.run('DELETE FROM BlockOfText WHERE id = ?', blockId, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Text block not found' });
    }

    res.json({ message: 'Text block deleted successfully' });
  });
});
app.get('/api/ideas-with-files', (req, res) => {
  const { sort } = req.query;
  // SQL query to select all ideas with their associated idea files
  let query = `
  SELECT Idea.id AS idea_id, Idea.header_image_path, Idea.title, Idea.description,user.id as userid, User.username, User.header_image_path as userimage_, User.karma, IdeaFile.id AS file_id, IdeaFile.file_name, IdeaFile.file_path
  FROM Idea
  LEFT JOIN IdeaFile ON Idea.id = IdeaFile.idea_id
  LEFT JOIN User ON Idea.user_id = User.id 
 
  `;
  // // Apply sorting based on the provided option
  if (sort === 'latest') {
    query += ' ORDER BY Idea.id DESC'; // Sort by the latest
  } else if (sort === 'oldest') {
    query += ' ORDER BY Idea.id ASC'; // Sort by the oldest
  } else if (sort === 'best') {
    query += ' ORDER BY (Idea.karma + User.karma) DESC'; // Sort by the sum of karma and lkarma, in descending order
  }
  // Execute the query
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // Organize the data to group idea and its files
    const ideasWithFiles = [];
    rows.forEach(row => {
      if (!ideasWithFiles.some(idea => idea.id === row.idea_id)) {
        const newIdea = {
          id: row.idea_id,
          title: row.title,
          description: row.description,
          header_image_path: row.header_image_path,
          sender: row.username,
          karma: row.karma,
          userimage: row.userimage_,
          senderid:row.userid,
          files: []
        };

        if (row.file_id) {
          newIdea.files.push({
            id: row.file_id,
            file_name: row.file_name,
            file_path: row.file_path
          });
        }

        ideasWithFiles.push(newIdea);
      } else {
        const existingIdea = ideasWithFiles.find(idea => idea.id === row.idea_id);

        if (row.file_id) {
          existingIdea.files.push({
            id: row.file_id,
            file_name: row.file_name,
            file_path: row.file_path
          });
        }
      }
    });

    res.json(ideasWithFiles);
  });
});

// GET request to get all BlockOfText and sender usernames for a specific idea
app.get('/ideas/:ideaId/block-of-text', (req, res) => {
  const { ideaId } = req.params;

  // SQL query to retrieve BlockOfText and the sender's username for a specific idea
  const query = `
    SELECT BlockOfText.*, User.username AS sender_username
    FROM BlockOfText
    INNER JOIN User ON BlockOfText.author_id = User.id
    WHERE BlockOfText.idea_id = ?
  `;

  // Execute the query
  db.all(query, [ideaId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // Respond with the list of BlockOfText and sender usernames
    res.json(rows);
  });
});
// , passport.authenticate('jwt', { session: false })
app.post('/api/addtexttoticket/:ticketId', (req, res) => {
 
  // req.user.id;
  const { ticketId } = req.params;
  const { content,senderid } = req.body;
 const userId = senderid
  db.run(`INSERT INTO BlockOfText (idea_id, author_id, content) VALUES (?, ?, ?)`, [ticketId, userId, content], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.json({ message: "Text added to ticket successfully" });
    }
  });
});


// ////////////////////



app.post('/api/update-karma/:username/:ideaId', (req, res) => {
  const { username, ideaId } = req.params;
  const { action } = req.body; // Assuming the request contains action (like/dislike)
console.log(action)
  // Retrieve the current user's ID by username
  const getUserIdQuery = 'SELECT id, karma,Lkarma FROM User WHERE username = ?';
  db.get(getUserIdQuery, [username], (err, userRow) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error fetching user data');
    } else if (userRow) {
      const userId = userRow.id;
      const userKarma = userRow.karma;
      const userLKarma = userRow.Lkarma;

      

      // Update user's karma based on the action
      let updatedUserKarma=userKarma;
      let updatedUserLKarma=userLKarma;
      if (action === 'like' ) {
        updatedUserKarma =updatedUserKarma+0.02
        if (updatedUserKarma+updatedUserLKarma>=2){
          updatedUserKarma=2
          updatedUserLKarma=0
        }
        //  Math.min(userKarma + 0.02, 2.0); // Increase karma by 0.02, but cap it at 2.0
    // console.log("jhkj")
      } else if (action === 'dislike' ) {
        updatedUserLKarma = updatedUserLKarma-0.02
        if (updatedUserKarma+updatedUserLKarma<=0.5){
          updatedUserLKarma=0.5
          updatedUserKarma=0
        }
        // Math.max(userLKarma - 0.02, 0.5); // Decrease karma by 0.02, but floor it at 0.5
      }
     

console.log(updatedUserKarma)
console.log(updatedUserLKarma)

console.log("-------------------------------")


      // Update the user's karma in the database
      const updateUserKarmaQuery = 'UPDATE User SET karma = ?,Lkarma=? WHERE id = ?';
      db.run(updateUserKarmaQuery, [updatedUserKarma,updatedUserLKarma, userId], err => {
        if (err) {
          console.error(err.message);
          res.status(500).send('Error updating user karma');
        } else {
          // Retrieve the current karma and Lkarma of the idea
          const getIdeaKarmaQuery = 'SELECT karma, Lkarma FROM Idea WHERE id = ?';
          db.get(getIdeaKarmaQuery, [ideaId], (err, ideaRow) => {
            if (err) {
              console.error(err.message);
              res.status(500).send('Error fetching idea karma');
            } else if (ideaRow) {
              let updatedIdeaKarma;
              let updatedIdeaLkarma;

              if (action === 'like') {
                updatedIdeaKarma = ideaRow.karma + (1 * userKarma);
                updatedIdeaLkarma = ideaRow.Lkarma;
              } else if (action === 'dislike') {
                updatedIdeaKarma = ideaRow.karma;
                updatedIdeaLkarma = ideaRow.Lkarma - (1 * userLKarma);
              }

              // Update the idea's karma and Lkarma in the database
              const updateIdeaKarmaQuery = 'UPDATE Idea SET karma = ?, Lkarma = ? WHERE id = ?';
              db.run(updateIdeaKarmaQuery, [updatedIdeaKarma, updatedIdeaLkarma, ideaId], err => {
                if (err) {
                  console.error(err.message);
                  res.status(500).send('Error updating idea karma');
                } else {
                  res.status(200).send('User and idea karma updated successfully');
                }
              });
            } else {
              res.status(404).send('Idea not found');
            }
          });
        }
      });
    } else {
      res.status(404).send('User not found');
    }
  });
});

app.get('/api/get-user-karma/:username', (req, res) => {
  const { username } = req.params;

  const getUserKarmaQuery = 'SELECT karma,Lkarma FROM User WHERE username = ?';
  db.get(getUserKarmaQuery, [username], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error fetching user karma');
    } else if (row) {
      const userKarma = row.karma+row.Lkarma;
      res.status(200).json({ username, karma: userKarma });
    } else {
      res.status(404).send('User not found');
    }
  });
});

app.get('/api/get-idea-karma/:ideaId', (req, res) => {
  const { ideaId } = req.params;

  const getIdeaKarmaQuery = 'SELECT karma, Lkarma FROM Idea WHERE id = ?';
  db.get(getIdeaKarmaQuery, [ideaId], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error fetching idea karma and Lkarma');
    } else if (row) {
      const ideaKarma = row.karma;
      const ideaLkarma = row.Lkarma;
      res.status(200).json({ ideaId, karma: ideaKarma, Lkarma: ideaLkarma,fkarma:(ideaKarma+ideaLkarma).toFixed(2) });
    } else {
      res.status(404).send('Idea not found');
    }
  });
});

app.delete('/api/ideas/:ideaId/:userId',  (req, res) => {
  const { ideaId ,userId} = req.params;
  
    deleteIdea(ideaId, res);
  
});

// // Function to delete the idea
// function deleteIdea(ideaId, res) {
//   const deleteIdeaQuery = 'DELETE FROM Idea WHERE id = ?';
//   db.run(deleteIdeaQuery, [ideaId], (err) => {
//     if (err) {
//       res.status(500).json({ error: 'Database error' });
//     } else {
//       res.status(200).json({ message: 'Idea deleted successfully' });
//     }
//   });
// }



// Function to delete the idea and associated records
function deleteIdea(ideaId, res) {
  const deleteIdeaQuery = 'DELETE FROM Idea WHERE id = ?';
  db.run('PRAGMA foreign_keys = ON'); // Enable foreign key support if not already enabled
  db.run(deleteIdeaQuery, [ideaId], (err) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      res.status(200).json({ message: 'Idea deleted successfully' });
    }
  });
}

// SQLite trigger to delete associated IdeaFile and BlockOfText records
const createTriggerQuery = `
CREATE TRIGGER delete_associated_files_and_blocks
AFTER DELETE ON Idea
BEGIN
  DELETE FROM IdeaFile WHERE idea_id = old.id;
  DELETE FROM BlockOfText WHERE idea_id = old.id;
END;
`;

// Create the trigger when setting up the database
db.serialize(() => {
  db.run('PRAGMA foreign_keys = ON'); // Enable foreign key support if not already enabled
  db.run(createTriggerQuery, (err) => {
    if (err) {
      console.error('Error creating trigger:', err.message);
    } else {
      console.log('Trigger created successfully');
    }
  });
});


app.put('/api/ideas/:ideaId/description',  (req, res) => {
  const ideaId = req.params.ideaId;
  const newDescription = req.body.description;
  // const userId = req.user.id;
console.log(ideaId)
  // Check if the user is the owner of the idea
  
      // Update the idea description
      db.run('UPDATE Idea SET description = ? WHERE id = ?', [newDescription, ideaId], (err) => {
        if (err) {
          res.status(500).json({ error: 'Database error' });
        } else {
          res.status(200).json({ message: 'Idea description updated successfully' });
        }
      });
    
 
});
app.put('/api/editblockoftext/:id', (req, res) => {
  const blockId = req.params.id;
  const newContent = req.body.content; // Assuming the request body contains the new content
  console.log(blockId, newContent);
  
  // Update the content of the BlockOfText in the database
  // Replace the following line with your database update logic
  // Example using SQLite:
  db.run('UPDATE BlockOfText SET content = ? WHERE id = ?', [newContent, blockId], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    res.json({ message: `BlockOfText with ID ${blockId} updated successfully with new content: ${newContent}` });
  });
});
app.get('/download/:filename', (req, res) => {
  const fileName = req.params.filename;

  db.get('SELECT file_path FROM IdeaFile WHERE file_name = ?', [fileName], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!row) {
      return res.status(404).json({ error: 'File not found' });
    }

    const filePath = row.file_path;
    // Serve the file
    res.download(filePath, fileName, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      }
    });
  });
});






app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

