const express = require('express');
const app = express();
const user=require('./User')
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require("multer");
const jwt = require('jsonwebtoken');
const router = require('./ccc/router/router');
const ProductSchema=require('./ccc/collectors/product')
const bcrypt = require('bcrypt');


app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['POST', 'GET', 'HEAD', 'PUT', 'DELETE'],
  credentials: true,
}));

mongoose.connect('mongodb+srv://srinureddy:srinureddy@cluster0.nwxf3wp.mongodb.net/register?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.listen(3001, (err) => {
  if (err) {
    console.log("Server failed to start");
  } else {
    console.log("Server started at port:3001");
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Message: "we need token please provide it." });
  } else {
    jwt.verify(token, "our-jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Message: "Authentication Error" });
      } else {
        req.name = decoded.name;
        next();
      }
    });
  }
};

// login
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
},{ collection: 'users' }
);

const User = mongoose.model('User', UserSchema);

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Step 1: Validate the input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Step 2: Find the user by email
    const user = await User.findOne({ email });

    // // Step 3: Verify the user and compare passwords
    if (!user || !user.comparePassword(password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Step 4: Generate and send the authentication token
    const token = generateAuthToken(user); // Implement your token generation logic
    res.cookie('token', token);

    return res.json({ message: 'Login successful' });
  } catch (error) {
    // Step 5: Handle any server errors
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});





// new registration
app.post("/register", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    const validationError = user.validateSync();
    if (validationError) {
      console.log(validationError); // Log the validation errors for debugging
      const errors = {};
      for (let field in validationError.errors) {
        errors[field] = validationError.errors[field].message;
      }
      return res.status(400).json({ errors });
    }

    const savedUser = await user.save();
    console.log(savedUser);
    return res.json({ Status: "Success" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ Status: "Error" });
  }
});




// update get
app.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  User.findById(id, (err, result) => {
    if (err) return res.json({ Error: err });
    return res.json(result);
  });
});

const storage = multer.diskStorage({
  destination:'./login/public/Product_images/',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({
  storage: storage,
});

// update the details
app.put(`/update/:id`, upload.single('Product_image'), (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, {
    Product_Name: req.body.Product_Name,
    Product_cost: req.body.Product_cost,
    Person_age: req.body.Person_age,
    Order_date: req.body.Order_date,
    Product_image: req.file.filename
  }, (err, result) => {
    if (err) return res.json("Error");
    return res.json({ updated: true });
  });
});

// POST route for simulating item deletion
app.post("/deleteItem", (req, res) => {
  const { id } = req.body;
  res.json({ message: "Item deleted successfully" });
});

// home page
app.get('/main', verifyUser, (req, res) => {
  return res.json({ Status: "success", name: req.name });
});

// view
app.get("/view/:id", (req, res) => {
  const { id } = req.params;
  User.findById(id, (error, result) => {
    if (error) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});


// logout
app.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ Status: "success" });
});

app.use(function (req, res, next) {
  req.User = User;
  next();
});

app.use("/productts", router);

module.exports = app;
