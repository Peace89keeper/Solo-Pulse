import "dotenv/config";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Dbconnection } from "./database/Dbconnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservatioRoute.js";
import invoiceRouter from "./routes/invoiceRoute.js";

const app = express();

dotenv.config({ path: "./config/config.env" });
Dbconnection();
//Middlewares
app.use(
  cors({
    origin: [process.env.FRONTEND_URI],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(cors({ origin: 'http://localhost:5173' }));  // Vite port
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/reservation", reservationRouter);
app.use("/api/v1/invoices", invoiceRouter);
app.use(errorMiddleware);



app.get('/api/stats', (req, res) => {
  res.json({
    totalRevenue: 12450,
    pending: 3200,
    aiSavings: 4.5
  })
})

app.get('/api/recent-invoices', (req, res) => {
  res.json([
    { id: 102, client: 'Acme Corp', amount: 450, status: 'paid', date: '2h ago' },
    { id: 101, client: 'Sarah Wilson', amount: 200, status: 'pending', date: '1d ago' }
  ])
})

app.get('/api/collections', (req, res) => {
  res.json([
    { id: 'INV-101', client: 'Acme Corp', amount: 4500, status: 'overdue', daysOverdue: 7, project: 'Website', email: 'test@test.com' }
  ])
})

app.post('/api/analyze-chat', express.json(), (req, res) => {
  res.json({
    client: req.body.chat.includes('Jai') ? 'Acme Corp' : 'Test Client',
    total: 9900,
    items: [{ description: 'Figma Design', qty: 2, rate: 2000, total: 4000 }]
  })
})

app.listen(3000, () => {
  console.log('🚀 Backend: http://localhost:3000')
})




export default app
