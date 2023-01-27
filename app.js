const express = require("express");
const morgan = require("morgan");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload")
const cors = require('cors')

const speciesRouter = require('./routes/speciesRoutes')
const treesRouter = require('./routes/treesRoutes')
const orgRoutes = require('./routes/orgsRoutes')
const clientRouter = require("./routes/clientRoutes");
const animalRouter = require("./routes/animalRoutes");
const publicationsRoutes = require("./routes/publicationRoutes");
const donationsController = require("./routes/donationRoutes");
const locationController = require("./routes/locationRouters");
const forestController = require("./routes/forestRoutes")
const adoptionController = require("./routes/adoptionRoute")
const filterController = require("./routes/filtersRoutes")
const checkOutController = require("./routes/checkOutRoutes")

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());


app.use((req, res, next) => {
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
console.log("🚀 ~ file: app.js:18 ~ filterController", filterController)

app.use(fileUpload({
  useTempFiles: true,
  limits: {fileSize: 50 * 2024 * 1024 }
})) 

//cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


// CLOUDINARY
cloudinary.config({ 
  cloud_name: 'drp8i1fbf', 
  api_key: '496217133353186', 
  api_secret: 'UqolylY5rgLDPrjevzSDyp4L4XY' 
});

app.post("/imagesTrees", async(req, res) => {
  const file = req.files.image
  console.log(file);
  const result = cloudinary.uploader.upload(file.tempFilePath, {
    public_id: `${Date.now()}`,
    resource_type: "auto",
    folder: "imagesTrees"
  })
  res.status(200).json(result.url)
})

// 3) ROUTES
app.use("/api/v1/species", speciesRouter);
app.use("/api/v1/trees", treesRouter);
app.use('/api/v1/orgs', orgRoutes);
app.use("/api/v1/clients", clientRouter);
app.use("/api/v1/animals", animalRouter);
app.use("/api/v1/publications", publicationsRoutes);
app.use("/api/v1/donations", donationsController);
app.use("/api/v1/locations", locationController);
app.use("/api/v1/forest", forestController);
app.use("/api/v1/adoptionCatalogue", adoptionController);
app.use("/api/v1/filterController", filterController);
app.use("/api/v1/checkOutController", checkOutController);


//cors


app.use((req, res) => {
  res.status(201).json({
    status: "success",
    requestedAt: req.requestedAt,
    routes: [
      "/orgs",
      "/clients",
      "/animals",
      "/publications",
      "/donations",
      "/locations",
      "/trees",
      "/species",
      "/adoptionCatalogue",
      "/filterController",
      "/checkOutController"
    ],
  });
});

module.exports = app;

