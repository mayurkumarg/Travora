if(process.env.NODE_ENV != "production"){
  require("dotenv").config();
}

// console.log(process.env);


const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride=require("method-override")
const ejsEngine=require("ejs-mate");
const customError=require("./utils/customError.js")
const session=require("express-session")
const MongoStore=require("connect-mongo")
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local")
const User=require("./models/user.js")


const listingsRouter=require("./routes/listing.js");
const reviewsRouter=require("./routes/review.js");
const usersRouter=require("./routes/user.js");
// const Listing = require("./models/listing.js");
// const asyncWrap=require("./utils/wrapAsync.js")
// const { listingJoiSchema, reviewJoiSchema } = require("./schema_validation.js");
// const Review=require("./models/reviewSchema.js")


const app = express();
const port = 3000;

// Route
// app.get("/", (req, res) => {
//   res.send("Server Working!");
// });



//basic setups
app.engine("ejs",ejsEngine);

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname,"public")))

app.use(express.urlencoded({extended:true}))



const dbURL=process.env.MONGO_ATLAS_URL

// Database connection here
main()
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.log("Database connection failed!", err));

async function main() {
  await mongoose.connect(dbURL);  // for local: "mongodb://127.0.0.1:27017/travora"
}



const store=MongoStore.create({
  mongoUrl:dbURL,
  crypto:{

    secret:process.env.MY_SECRET_CODE
  },
  touchAfter:6*3600  //for lazy update
})

store.on("err",()=>{
  console.log("Error in MONGO SESSION STORE :",err );
  
})

//Sessions , FlashMessages and Cookies
const sessionOption={
  store,
  secret:process.env.MY_SECRET_CODE,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+1000*60*60*24*3,
    maxAge:2*24*60*60*1000, // This takes priority
    httpOnly:true
  }
}


app.use(session(sessionOption));
app.use(flash())

//configuring the passport
app.use(passport.initialize())
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//To store the values in local variable so that other files can access it
app.use((req,res,next)=>{
  res.locals.success_msg=req.flash("success");
  res.locals.failure_msg=req.flash("error");
  res.locals.currentUser=req.user;
  next();
})

// Register User (example demo route)
// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "mayur3@gmail.com",
//     username: "Mayur kumar"
//   });

//   let password = "12345";

//   let registeredUser = await User.register(fakeUser, password);
//   res.send(registeredUser);
// });

app.get("/privacy", (req, res) => {
    res.render("pages/privacy");
});

app.get("/terms", (req, res) => {
    res.render("pages/terms");
});


app.use("/listings", listingsRouter);
app.use("/listings", reviewsRouter);   // mounting reviews under '/listings'
app.use("/users",usersRouter);


//To handle the error if the wrong route is given
app.all(/.*/,(req,res,next)=>{
  next(new customError(404,"Page not Found !  (invalid url)"))
})

//Handle the error
app.use((err,req,res,next)=>{
  let {statusCode=500,message="Something went wrong !"}=err;
  res.render("AlertMessage.ejs",{message})
  // res.status(statusCode).send(message);
})

app.listen(port, () => {
  console.log("Server is running on port", port);
});
