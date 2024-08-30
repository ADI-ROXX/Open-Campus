const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://duolingo1839:zdm8cyzvc9k0I3li@cluster0.bemcn.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});