const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/../../config.env` });

const Tour = require('./../../models/tourModel'); 


const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );

mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex : true, 
    useFindAndModify: false
}).then(con=>console.log('DB connection successful'));

//Read JSON
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8')); 

//Import data into DB
const importData = async()=>{

    try{

        await Tour.create(tours);
        console.log('Data successfully loaded!');
        process.exit();



    } 
    catch(err){
        console.log(err)
    }

}

//Delete all data from collection 

const deleteData = async ()=>{
    try{

        await Tour.deleteMany(); 
        console.log('Data successfully deleted!')
        process.exit();


    } 
    catch(err){
        console.log(err)
    }

}

if (process.argv[2] === '--import'){
    importData()

}else if (process.argv[2] === '--delete')
{
    deleteData();
}

console.log(process.argv)