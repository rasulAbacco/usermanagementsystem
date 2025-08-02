import express from 'express';
import { connection } from './postgres/postgres.js';
import router from './routes/routes.js';
import cors from 'cors';
const app = express();

const PORT = 8000;
app.use(express.json());
app.use(cors());
app.use("/api", router);

connection();



app.listen(PORT, () => {
    console.log(`Server Running On "http://localhost:${PORT}/"`);
});








// app.get('/', (req, res) => {
//     res.send("Hello World");
// })

// app.get('/greet', (req, res) => {
//     res.send(`Hello User, Welcome to Website!`)
// })

// app.get('/contact', (req, res) => {
//     res.json({
//         name: "Rasul Panari",
//         email: "panarirasul@gmail.com",
//         phone_number: 7204986825,
//     })
// })

// app.get('/about', (req, res) => {
//     res.json({
//         name: "EmailAI Pro",
//         version: "1.0.0",
//         description: "An AI-powered email marketing and CRM platform.",
//         author: "Vamsi Mohan",
//         website: "https://verifix.in"
//     })
// })


// app.post('/about', (req, res) => {
//     const data = req.body;
//     res.send(`${JSON.stringify(data)}`);
// })

// app.post('/contact', (req, res) => {
//     const { name, email, phone_number, address } = req.body;
//     res.send(JSON.stringify({ name, email, phone_number, address }));
// })

// app.post('/profile', (req, res) => {
//     const { name, email, phone, status } = req.body;
//     res.send(JSON.stringify({ name, email, phone, status }));
// })

// // API

// app.get('/api/contacts', (req, res) => {

//     const contacts = [
//         { id: 1, name: "rasul", email: "panari@gmail.com" },
//         { id: 2, name: "ashok", email: "ashok@gmail.com" },
//         { id: 3, name: "vamsi", email: "vamsi@gmail.com" },
//         { id: 4, name: "anusha", email: "anusha@gmail.com" },
//         { id: 5, name: "abd", email: "abd@gmail.com" },
//         { id: 6, name: "k l Rahul", email: "rahul@gmail.com" },
//         { id: 7, name: "Padikal", email: "Padikal@gmail.com" },
//         { id: 8, name: "shami", email: "shami@gmail.com" },
//         { id: 9, name: "bhumra", email: "bhumra@gmail.com" },
//     ]
//     res.send(contacts);
// })