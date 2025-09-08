const Listing=require("../models/listing")
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

//Main page Route
module.exports.index= async (req,res)=>{
  const listingData= await Listing.find()
  res.render("listings/index.ejs",{listingData});

}

//New list form Route
//Check if user Authenticated, else redirect to login
module.exports.renderNewListForm=(req,res)=>{
    res.render("listings/newList")
}

//To view perticular List Route
module.exports.renderList= async (req,res)=>{
  let {id}=req.params;
 let data = await Listing.findById(id)
  .populate({ path:"review", populate:{ path:"author" } })
  .populate("owner");

  if(!data){
    req.flash("error","The listing you requested does not exist !");
    return res.redirect("/listings"); // <-- redirect triggers flash
  }
  console.log(data);
  res.render("listings/show.ejs",{data});
}



//Add new list and redirect to Listings Route 
module.exports.addNewList = async (req, res, next) => {

   let response= await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 2
  })
    .send()
    
  try {
    const newListing = new Listing({
      ...req.body.listing,  // HERE <-------- req.body.listing
      owner: req.user._id
    });

    if (req.file) {
      newListing.image = {
        filename: req.file.filename,
        url: req.file.path
      };
      // console.log("Uploaded:", req.file.path, req.file.filename);
    }

    newListing.geometry=response.body.features[0].geometry;
    let savedList=await newListing.save();
    console.log(savedList);
    req.flash("success", "New List Created Successfully!");
    res.redirect("/listings");
  } catch (err) {
    next(err);
  }
};





//Render perticular list to edit Route
module.exports.renderListEdit=async (req,res)=>{
  let {id}=req.params;
  let data=await Listing.findById(id);
    if(!data){
    req.flash("error","The listing you requested does not exist !");
    return res.redirect("/listings"); 
  }

  // let originalImageUrl=data.image.url;
  // originalImageUrl=originalImageUrl.replace("/upload","/upload/ar_1.0,c_fill,h_250/bo_5px_solid_lightblue")
  res.render("listings/editList",{data})
}

//Update list Route
module.exports.updateList = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }
    Object.assign(listing, req.body.listing); // <-------- HERE
    if (req.file) {
      listing.image = {
        filename: req.file.filename,
        url: req.file.path
      };
      // console.log("Updated image:", req.file.path, req.file.filename);
    }
    await listing.save();
    req.flash("success", "List Edited Successfully!");
    res.redirect(`/listings/${id}`);
  } catch (err) {
    next(err);
  }
};



//Delete Route
module.exports.destroyList= async (req,res)=>{
  let {id}=req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success","List Deleted Successfully !")
  res.redirect("/listings");
}