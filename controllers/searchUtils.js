const moment = require("moment");
const { data } = require("../gc_assignment_db.json")

const now = Date.now();
const today = moment(now).format("YYYY-MM-DD");
const thirtyDaysAgo = moment(now).subtract(30, 'days').format("YYYY-MM-DD");

(function initializeDB() {
  dataSet = data;
  largestIndex = dataSet.reduce((largest, curr) =>  curr.index > largest ? curr.index : largest, 0);
})()

const filterData = async () => {
  const data = dataSet
    .filter(
      ({ outbound_date }) => moment(outbound_date).isBetween(thirtyDaysAgo, today)
    );
  return data;
}

const countInterestLevel = async () => {

  const interestLevelKeys = {
    "irrelevant": "none",
    "no connection": "none",
    "no response": "none",
    "not interested": "responded",
    "not now": "responded",
    "ongoing discussions": "booking_in_progress",
    "pending": "pending",
    "response": "connected",
    "yes call booked": "call_booked",
  }

  const data = dataSet
    .reduce(
      (acc, curr) => {
        const key = interestLevelKeys[curr.interest]
        if (key === "none") return acc;
        if(!acc[key]){
          acc[key] = 1;
        } else {
          acc[key] += 1;
        }
        return acc;
      }, { pending: 0, responded: 0, booking_in_progress: 0, connected: 0, call_booked: 0 }
    );
    console.log(data)
  return data;
}

const updateLead = async (entry) => {
  dataSet = dataSet.map((lead) => {
    if (lead.index == entry.index) {
      console.log(lead.index == entry.index)
      return entry;
    } else {
      return lead;
    }
  })
}

const removeLead = async (index) => {
  dataSet = dataSet.filter((lead) => lead.index != index);
  return true;
}

const addLead = async (entry) => {
  entry.date = moment(Date.now()).format("YYYY-MM-DD");
  entry.interest = "pending";
  largestIndex += 1;
  entry.index = largestIndex;
  dataSet.push(entry)
}

module.exports = {
  filterData,
  countInterestLevel,
  updateLead,
  removeLead,
  addLead,
}