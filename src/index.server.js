const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

//routes
const adminRoutes = require("./routes/admin/auth");

//environment variable or you can say constants
env.config();
const connectionUrl=`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.bxx10.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(connectionUrl, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(()=>{
    console.log('DB Connected')
});

app.use(cors());
app.use(express.json());

app.use("/api", adminRoutes);


app.get('/',(req,res) => {
    res.status(200).json({
      message:'Welcome To Our Site'
    })
  })
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });