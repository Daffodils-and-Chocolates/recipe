const connectDB = require('./config/db.js');
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

//Routes 
const userRoutes = require('./routes/userRoutes.js');
const postRoutes = require('./routes/postRoutes.js');
const postCategoriesRoutes = require('./routes/postCategoriesRoutes.js');
const commentRoutes = require('./routes/commentRoutes.js');

//middleware
const errorResponserHandler = require('./middleware/errorHandler.js');
const invalidPathHandler = require('./middleware/invalidPathHandler.js');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send(`Server is running on ${PORTo}`);
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/post-categories", postCategoriesRoutes);

//static assets
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(invalidPathHandler);
app.use(errorResponserHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));