const app = require('./app');
const db = require('./config/db');
const UserModel = require('./models/user.model');



const port =  3000;
    

app.get('/',(req,res)=>{        
        res.send("Connection success");
    });
app.listen( port,()=>{
        console.log('Connecting to the server on port http://localhost:',port);
    });