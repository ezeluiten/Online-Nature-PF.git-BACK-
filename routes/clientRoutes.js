const express = require("express");
const clientController = require("./../controllers/clientController");

const router = express.Router();

router
  .route("/")
  .get(clientController.getAllClients)
  .post(clientController.createClient)
  .delete(clientController.deleteClient)
  .put(clientController.updateClient);

router.route("/:id").delete(clientController.deleteClient);

module.exports = router;
