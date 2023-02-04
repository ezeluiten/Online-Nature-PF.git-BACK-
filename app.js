const express = require("express");
const morgan = require("morgan");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload")
const cors = require("cors")

const speciesRouter = require('./routes/speciesRoutes')
const treesRouter = require('./routes/treesRoutes')
const orgRoutes = require('./routes/orgsRoutes')
const clientRouter = require("./routes/clientRoutes");
const animalRouter = require("./routes/animalRoutes");
const publicationsRoutes = require("./routes/publicationRoutes");
const donationsRoutes = require("./routes/donationRoutes");
const locationRoutes = require("./routes/locationRouters");
const forestRoutes = require("./routes/forestRoutes")
const adoptionRoutes = require("./routes/adoptionRoute")
const filterRoutes = require("./routes/filtersRoutes")
const checkOutRoutes = require("./routes/checkOutRoutes")
const successRoutes = require("./routes/successRouteRedirection")
const paymentNotificationRoutes = require("./routes/paymentNotificationRoutes")

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors())

app.use(express.json());


app.use((req, res, next) => {
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});




app.use(fileUpload({
  useTempFiles: true,
  limits: {fileSize: 50 * 2024 * 1024 }
})) 
const whiteList = ["http://localhost/3000"]



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
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
app.use("/api/v1/donations", donationsRoutes);
app.use("/api/v1/locations", locationRoutes);
app.use("/api/v1/forest", forestRoutes);
app.use("/api/v1/adoptionCatalogue", adoptionRoutes);
app.use("/api/v1/filterController", filterRoutes);
app.use("/api/v1/checkOutController", checkOutRoutes);
app.use("/api/v1/successController", successRoutes);
app.use("/api/v1/paymentNotificationRoutes", paymentNotificationRoutes);


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
      "/checkOutController",
      "/paymentNotificationRoutes",
    ],
  });
});

module.exports = app;

