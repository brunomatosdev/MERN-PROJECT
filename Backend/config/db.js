const mongoose = require("mongoose");

// Connect to MongoDB using mongoose
mongoose.connect(
  "mongodb+srv://Cut3R0b1n:Yakshabawse1@cluster0.rgwpofc.mongodb.net/test",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Log successful connection
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});
