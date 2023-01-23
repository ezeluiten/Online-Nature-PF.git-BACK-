const { getAllAnimals } = require("./animalController")
const { getAllTrees } = require("./treeController")


exports.getCatalogue = async () => {
    const AnimalsInfo = await getAllAnimals()
    const TreesInfo = await getAllTrees()
    const allCatalogue = [...AnimalsInfo, ...TreesInfo]
    return allCatalogue;
}
