
import express from 'express';
const port = 5000;

const app = express();
const route = express.Router();

app.get('',(req, res)=>{
   res.send('hello')
})

app.listen(port, ()=>{
    console.log(`sever is running ${port}`);
    
})