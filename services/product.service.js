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