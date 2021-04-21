const express = require('express');
const app = express();
const port = 5000;

app.get('/api/customers', (req, res) => {
    const customers = [
        {id: 1, firstName: 'John', lastName: 'Doe'},
        {id: 2, firstName: 'Mike', lastName: 'Johnson'},
        {id: 3, firstName: 'Vivek', lastName: 'Puri'}
    ];

    res.json(customers);
})

app.listen(port, () => console.log(`Server has started on port ${port}`));