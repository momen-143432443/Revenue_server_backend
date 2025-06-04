const ProductModel = require('../models/product.model');
const mongoose = require('mongoose');
const {Schema} = mongoose;
const oracle = require('oracledb');



exports.insertProductInfo = async (userId, userEmail,items,totalPrice)=>{

    const itemsWithUserId = items.map(item=>({
        ...item,
        _id:userId,
        userEmail:userEmail
        
    }));
    
    console.log("Incoming items:", items);
     await ProductModel.findByIdAndUpdate(userId,{
        items:itemsWithUserId,
        totalPrice:totalPrice,
        createdAt: new Date()},{ upsert: true, new: true });
    
}

 exports.getOrderStatus = async(userId)=>{
    try {
        const getOrderStatusByUserId= await ProductModel.findById(userId);
        if (!getOrderStatusByUserId || !getOrderStatusByUserId.items || getOrderStatusByUserId.items.length === 0) {
            return null; // No order
        }
        if (!getOrderStatusByUserId) throw new Error("Order not found");
        return getOrderStatusByUserId;
    } catch (error) {
        throw error;
    }
}
const dbConfig = {
    user:'SYSTEM',
    password:'111',
    connectString:'localhost:1521/freepdb1'
};

exports.showAllItemsMostOfTrindingInApp = async()=>{
    let conn;
    try {
         conn = await oracle.getConnection(dbConfig);
       const res= await conn.execute(`SELECT ITEMID, ITEMNAME, ITEMMODEL, ITEMPRICE, ITEM_COLOR_AVAILABLE FROM mosttrindingitems`,
        [],
        {outFormat: oracle.OUT_FORMAT_OBJECT});
    // Convert image BLOB to base64 manually if needed (more robust):
        const processedRows = await Promise.all(res.rows.map(async (row)=>{
            const picRes = await conn.execute('SELECT ITEMPICTURE FROM mosttrindingitems WHERE ITEMID = :id',[row.ITEMID],
                          { outFormat: oracle.OUT_FORMAT_OBJECT, fetchInfo: { ITEMPICTURE : { type: oracle.BUFFER } } }// this is KEY
            );
            // Count of columns 
            const picBuffer = picRes.rows?.[0]?.ITEMPICTURE || null;
            
            // console.log("Color array from DB:", row.ITEM_COLOR_AVAILABLE);
            return {
                itemId: row.ITEMID,
          itemName: row.ITEMNAME ,
          itemModel: row.ITEMMODEL,
          itemPrice: row.ITEMPRICE,
          colorsAvailable: row.ITEM_COLOR_AVAILABLE,
          itemImageAddress: picBuffer
            ? picBuffer.toString("base64")
            : '',

            };
        }));
        // console.log("Final JSON to Flutter:", JSON.stringify(processedRows, null, 2));
       return processedRows;
    } catch (e) {
        console.error("Service error:", e);
    throw e;
    }finally{
        if (conn) {
            try {
                await conn.close();
            } catch (error) {
                console.error("Connection close error:", err);
            }
        }
    }
}

exports.showAllItemsShoesInApp = async()=>{
    let conn;
    try {
        conn = await oracle.getConnection(dbConfig);
        const res = await conn.execute('select ITEMID, ITEMNAME, ITEMMODEL, ITEMPRICE, ITEM_COLOR_AVAILABLE FROM shoesProduct',
            [],
            {outFormat: oracle.OUT_FORMAT_OBJECT, fetchInfo: { ITEMPICTURE : { type: oracle.BUFFER }}});
            const processedRows = await Promise.all(res.rows.map(async (row)=>{
            const picRes = await conn.execute('SELECT ITEMPICTURE FROM shoesProduct WHERE ITEMID = :id',[row.ITEMID],
                          { outFormat: oracle.OUT_FORMAT_OBJECT, fetchInfo: { ITEMPICTURE : { type: oracle.BUFFER } } }// this is KEY
            );
            // Count of columns 
            const picBuffer = picRes.rows?.[0]?.ITEMPICTURE || null;
            
            // console.log("shoesProduct:", row.ITEMID,row.ITEMNAME,row.ITEMMODEL);
            return {
                itemId: row.ITEMID,
          itemName: row.ITEMNAME ,
          itemModel: row.ITEMMODEL,
          itemPrice: row.ITEMPRICE,
          colorsAvailable: row.ITEM_COLOR_AVAILABLE,
          itemImageAddress: picBuffer
            ? picBuffer.toString("base64")
            : '',};
        }));
        return processedRows;
    } catch (error) {
         console.error("Service error:", e);
    throw e;
    }finally{
        if (conn) {
            try {
                await conn.close();
            } catch (error) {
                console.error("Connection close error:", err);
            }
        }
    }
}

exports.showAllFeatureItemInApp = async()=>{
let conn;
    try {
conn = await oracle.getConnection(dbConfig);
const res = await conn.execute('select ITEMID, ITEMNAME, ITEMMODEL, ITEMPRICE, ITEM_COLOR_AVAILABLE FROM newFeatureItems',
            [],
            {outFormat: oracle.OUT_FORMAT_OBJECT, fetchInfo: { ITEMPICTURE : { type: oracle.BUFFER }}});
            const processedRows = await Promise.all(res.rows.map(async (row)=>{
            const picRes = await conn.execute('SELECT ITEMPICTURE FROM newFeatureItems WHERE ITEMID = :id',[row.ITEMID],
                          { outFormat: oracle.OUT_FORMAT_OBJECT, fetchInfo: { ITEMPICTURE : { type: oracle.BUFFER } } }// this is KEY
            );
            // Count of columns 
            const picBuffer = picRes.rows?.[0]?.ITEMPICTURE || null;
            
            // console.log("newFeatureItems:", row.ITEMID,row.ITEMNAME,row.ITEMMODEL);
            return {
                itemId: row.ITEMID,
          itemName: row.ITEMNAME ,
          itemModel: row.ITEMMODEL,
          itemPrice: row.ITEMPRICE,
          colorsAvailable: row.ITEM_COLOR_AVAILABLE,
          itemImageAddress: picBuffer
            ? picBuffer.toString("base64")
            : '',};
        }));
            
return processedRows;
}  catch (error) {
         console.error("Service error:", e);
    throw e;
    }finally{
        if (conn) {
            try {
                await conn.close();
            } catch (error) {
                console.error("Connection close error:", err);
            }
        }
    }
}


exports.showNewItemsInApp = async ()=>{
    let conn;
    try {

        conn = await oracle.getConnection(dbConfig);
        const res =  await conn.execute('select ITEMID, ITEMNAME, ITEMMODEL, ITEMPRICE, ITEM_COLOR_AVAILABLE FROM NewItems',
            [],
            {outFormat: oracle.OUT_FORMAT_OBJECT, fetchInfo: { ITEMPICTURE : { type: oracle.BUFFER }}});

            const processedRows = await Promise.all(res.rows.map(async(row)=>{
                const picRes = await conn.execute('SELECT ITEMPICTURE FROM NewItems WHERE ITEMID = :id',[row.ITEMID],
                          { outFormat: oracle.OUT_FORMAT_OBJECT, fetchInfo: { ITEMPICTURE : { type: oracle.BUFFER } } }// this is KEY
            );
             const picBuffer = picRes.rows?.[0]?.ITEMPICTURE || null;
            //  console.log("NewItems:", row.ITEMID,row.ITEMNAME,row.ITEMMODEL);
             return {
                itemId: row.ITEMID,
          itemName: row.ITEMNAME ,
          itemModel: row.ITEMMODEL,
          itemPrice: row.ITEMPRICE,
          colorsAvailable: row.ITEM_COLOR_AVAILABLE,
          itemImageAddress: picBuffer
            ? picBuffer.toString("base64")
            : '',};
            }));
            return processedRows;
    } catch (error) {
         console.error("Service error:", error);
    throw error;
    }finally{
        if (conn) {
            try {
                await conn.close();
            } catch (error) {
                console.error("Connection close error:", error);
            }
        }
    }
}

exports.searchControllerInApp = async(req, res)=>{
    let connect;
    const rawQuery = (req.query.query || "").trim();
    const search = `%${rawQuery.toLowerCase()}%`;
    const queries = [
            {
                table:"mosttrindingitems",
                sql:`SELECT 'mosttrindingitems' AS SOURCE , ITEMID, ITEMNAME, ITEMMODEL,ITEMPRICE, ITEMPICTURE FROM mosttrindingitems 
                WHERE LOWER(ITEMID)   LIKE :search 
                 OR LOWER(ITEMNAME)   LIKE :search 
                 OR LOWER(ITEMMODEL)  LIKE :search`,
            },
            {
                table:"newFeatureItems",
                sql:`SELECT 'newFeatureItems' AS SOURCE ,ITEMID, ITEMNAME, ITEMMODEL, ITEMPRICE, ITEMPICTURE FROM newFeatureItems 
                WHERE LOWER(ITEMID)   LIKE :search 
                 OR LOWER(ITEMNAME)   LIKE :search 
                 OR LOWER(ITEMMODEL)  LIKE :search`,
            },
            {
                table:"NewItems",
                sql:`SELECT 'NewItems' AS SOURCE ,ITEMID, ITEMNAME, ITEMMODEL, ITEMPRICE, ITEMPICTURE FROM NewItems 
                WHERE LOWER(ITEMID)   LIKE :search 
                 OR LOWER(ITEMNAME)   LIKE :search 
                 OR LOWER(ITEMMODEL)  LIKE :search`,
            },
            {
                table:"shoesProduct",
                sql:`SELECT 'shoesProduct' AS SOURCE ,ITEMID, ITEMNAME, ITEMMODEL, ITEMPRICE, ITEMPICTURE FROM shoesProduct 
                WHERE LOWER(ITEMID)   LIKE :search 
                 OR LOWER(ITEMNAME)   LIKE :search 
                 OR LOWER(ITEMMODEL)  LIKE :search`,
            },
        ];
          let allRes = [];
    try {
    connect = await oracle.getConnection(dbConfig);

    // 3) Loop over each query, accumulate results
    for (let q of queries) {
      const result = await connect.execute(
        q.sql,
        { search },
        {
          outFormat: oracle.OUT_FORMAT_ARRAY,
          fetchInfo: { ITEMPICTURE: { type: oracle.BUFFER } }
        }
      );

      // Each row is: [ source, ITEMID, ITEMNAME, ITEMMODEL, ITEMPRICE, ITEMPICTURE_BUFFER ]
      result.rows.forEach(row => {
        const [
          source,
          itemId,
          itemName,
          itemModel,
          itemPrice,
          itemPictureBuf
        ] = row;

        let imgBase64 = "";
        if (itemPictureBuf) {
          imgBase64 = itemPictureBuf.toString("base64");
        }

        allRes.push({
          source,
          itemId:           itemId   || "",
          itemName:         itemName || "",
          itemModel:        itemModel|| "",
          itemPrice:        itemPrice|| 0,
          itemImageAddress: imgBase64
        });
      });
    }

    // 4) Only now return the full combined array:
    return res.json(allRes);

  } catch (err) {
    console.error("Search error:", err);
    return res.status(500).json({ error: "Search failed" });
  } finally {
    if (connect) {
      try { await connect.close(); } catch (_) {}
    }
  }
}