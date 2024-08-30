const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB as soon as the server starts
mongoose.connect('mongodb+srv://duolingo1839:zdm8cyzvc9k0I3li@cluster0.bemcn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define the schema and model
const recordSchema = new mongoose.Schema({
  from: String,
  to: String,
  amount: Number,
});

const Record = mongoose.model('Record', recordSchema);

// Push specific records to the database
async function pushRecords(records_){
  let records=[]
  for(let i = 0; i < records_.length; i++) {
    if(records_[i].amount!=0){
      records.push(records_[i]);
    }
  }

  await Record.insertMany(records);
  console.log('Records inserted successfully');
  console.log(records);
   
  };


app.post('/retrieve-records', async (req, res) => {
    let { from } = req.body;
    console.log(from)

    try {
      const records = await Record.find({ from });
      res.status(200).json(records);
    } catch (error) {
      console.error('Error retrieving records:', error);
      res.status(500).send('Error retrieving records');
    }
  });

app.delete('/clear', async (req, res) => {
    try {
      await Record.deleteMany({});
      console.log('All records cleared');
      res.status(200).send('All records cleared');
    } catch (error) {
      console.error('Error clearing records:', error);
      res.status(500).send('Error clearing records');
    }
  });

app.post('/quick', (req, res) => {
    const { friends, out } = req.body;

    // Print the arrays to the console
    console.log('Friends:', friends);
    console.log('Out:', out);

    let jsonArray=[];
    for(let i = 0; i < friends.length; i++){
      jsonArray.push({id:friends[i], val: out[i]});
    }
    jsonArray.sort((a,b)=>a.val - b.val);
    const ind = jsonArray.findIndex(item => item.val > 0);

    console.log(jsonArray);
    console.log(ind);
    let ans=[];
    if(ind==0){
      res.status(200).status("Everything done");
    }else{
      let i=ind-1;
      let j=ind;
      
      while(i>=0){
        let l=Math.abs(jsonArray[i].val);
        let r=Math.abs(jsonArray[j].val);
        if(r<l){
          ans.push({from: jsonArray[j].id, to: jsonArray[i].id,amount:r});
          jsonArray[i].val+=r;
          jsonArray[j].val-=r;
          j++;
        }
        else if(r==l){
          ans.push({from: jsonArray[j].id, to: jsonArray[i].id,amount:r});
          jsonArray[j].val-=r;
          jsonArray[i].val+=r;
          j++; i--;
        }
        else{
          ans.push({from: jsonArray[j].id, to: jsonArray[i].id,amount:l});
          jsonArray[i].val+=l;
          jsonArray[j].val-=l;
          i--;
        }
      }
      
      
    }
    try{pushRecords(ans);}catch(e){res.status(501).send("Error");}
      res.status(200).send('Arrays received and logged');
});


app.delete('/delete', async (req, res) => {
    const { _id } = req.body;
    console.log(_id);
    try {
      const result = await Record.findByIdAndDelete(_id);
      if (result) {
        console.log(`Record with _id: ${_id} deleted successfully`);
        res.status(200).send(`Record with _id: ${_id} deleted successfully`);
      } else {
        res.status(404).send(`Record with _id: ${_id} not found`);
      }
    } catch (error) {
      console.error('Error deleting record:', error);
      res.status(500).send('Error deleting record');
    }
  });

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
