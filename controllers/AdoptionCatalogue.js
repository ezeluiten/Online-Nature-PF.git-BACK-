
 exports.deleteOneElement = async (req, res) => {
    const {id:idItem} = req.params;
    const animal= await Animals.find({_id:idItem})

    const tree = await Tree.find({ _id: idItem })
    const specie =animal && animal.length>0?true:false
  
    console.log("id Item",idItem);
    try {
      if (specie) {
        const animal = await Animals.deleteOne({
          _id: idItem,
        });
        
        res.status(201).json(animal);
      } else{
          const tree = await Tree.deleteOne({
          _id: idItem,
        });
        res.status(201).json(tree);
      }
     
  
    } catch (error) {
      res.status(400).json({
        status: "failure",
        message: error,
      });
    }
  };

