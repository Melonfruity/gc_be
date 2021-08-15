const rootRouter = require("express").Router();
const { filterData, countInterestLevel, addLead, updateLead, removeLead } = require("./searchUtils");

rootRouter.get('/get-all', async (req, res, next) => {
  try {
    // const filteredData = await filterData(data);
    res.status(200).send(dataSet)
  } catch (error) {
    next(error);
  }
});

rootRouter.get('/get-summary', async (req, res, next) => {
  try {
    const interestLevel = await countInterestLevel();
    res.status(200).send(interestLevel)
  } catch (error) {
    next(error);
  }
});

// update entry
rootRouter.put('/lead/:leadID', async (req, res, next) => {
  try {
    // normally would sepate out the id and the entries to update but
    // due to time contraint, will just update entire entry
    const { entry } = req.body;
    const lead = await updateLead(entry);
    res.status(200).send(lead)
  } catch (error) {
    next(error);
  }
});

// add new entry 
rootRouter.post('/lead', async (req, res, next) => {
  try {
    const {entry} = req.body
    const lead = await addLead(entry);
    res.status(200).send(lead)
  } catch (error) {
    next(error);
  }
});

// delete entry
rootRouter.delete('/lead/:leadID', async (req, res, next) => {
  try {
    const { leadID } = req.params;
    const success = await removeLead(leadID);
    res.status(200).send(success)
  } catch (error) {
    next(error);
  }
});


module.exports = rootRouter