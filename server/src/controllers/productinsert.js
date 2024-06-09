const { QueryTypes } = require("sequelize");
const sequelize = require("../config/database");
const csv = require("csv-parser");
const path = require("path")
const fs = require("fs");


const productinsert = async(req,res)=>{
        const vendor = req.body.vendor;
        console.log(vendor);
        if(!vendor){
            return res.status(400).json({ error: 'Vendor not found' });
        }
        const filePath = path.join(__dirname, '..', 'vendors', vendor, `${vendor}.csv`);


          if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'CSV file not found' });
  }
  
    const results = []
    fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
        try{
            for (const row of results) {
            
                // console.log(row.product_id)
                // console.log(row.product_name)

                // console.log(row.price)

                // console.log(row.quantity)

                const existingProduct = await sequelize.query(
                    'SELECT * FROM product WHERE product_id = ?',
                    { replacements: [row.product_id], type: QueryTypes.SELECT }
                  );
                  
           await sequelize.query( 'INSERT INTO product (product_id,product_name,quantity,price) VALUES (?,?, ?, ?)',
             {replacements:[row.product_id,row.product_name,row.quantity,row.price], type: QueryTypes.INSERT } );
                

         }
         res.status(200).json({message:"Product added successfully"});
        }
         catch(error){
             console.log(error);
             res.status(500).json({error:"Internal server error"});
         }

        
    })

       
}

module.exports = productinsert;