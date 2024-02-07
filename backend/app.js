const express = require('express')
const db = require('./database/db.js')
const model = require('./models/schema.js')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 4000

app.get('/', (req, res) => {
    res.send('helloo there ....')
})

let addCount = 0;
let updateCount = 0;

// Middleware to update counts
app.use((req, res, next) => {
    if (req.method === 'POST' && req.path === '/addamount') {
        addCount++;
    } else if (req.method === 'PUT' && req.path.startsWith('/updateamount/')) {
        updateCount++;
    }
    next();
});

// to add amount
app.post('/addamount', async (req, res) => {
    try {
        const { amount } = req.body
        // validation
        if (!amount || isNaN(amount) || amount < 1 || amount > 10) {
            return res.status(200).json({ message_type: "error", message: 'Invalid amount. Amount must be between 1 and 10.' });
        }
        // Create a new document
        const data = new model({ amount });
        //  Save to db
        await data.save()
        res.status(200).json({  message_type: "success", message: "added successfully", data });
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// to show latest(last) amount
app.get('/showamount', async (req, res) => {
    try {
        // query to find latest amount
        const data = await model.findOne().sort({_id:-1})

        // check whether data is present in db or not
        if (!data || data.length > 2 === 0) {
            return res.status(200).json({ message_type: "error", message: 'Data not present in db' });
        }

        res.status(200).json({ data });
    } catch (error) {
        console.error('Error fetching form data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})

// to update amount by id
app.put('/updateamount/:id', async (req, res) => {
    const id = req.params.id;

    const amount = req.body.amount; // Assuming 'amount' is the field name in the request body

    // Check if amount field is provided in the request body
    if (!amount) {
        return res.json({message_type: "error", message: "No amount provided" });
    }

    // Validate that the amount is between 1 and 10
    if (isNaN(amount) || amount < 1 || amount > 10) {
        return res.json({ message_type: "error", message: 'Invalid amount. Amount must be between 1 and 10.' });
    }

    try {
        // Ensure the updated amount contains only the fields you want to update
        const updatedAmount = { amount: amount }; 

        // Update the document with the specified ID
        const result = await model.updateOne({ _id: id }, updatedAmount);

        if (result.nModified === 0) {
            return res.json({ message_type: "error", message: "Amount not found" });
        } 
        res.json({ message_type:"success", message: "Amount updated", data: updatedAmount });
    } catch (error) {
        console.error("Error updating amount:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// api count
app.get('/count', (req, res) => {
    res.json({ addCount, updateCount });
  });
  

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`)
})
