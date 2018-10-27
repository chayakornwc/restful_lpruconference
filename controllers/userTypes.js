
const config = require('../config')

exports.findAll = (req, res) => {
    req.getConnection((err, connection)=>{
        if(err) throw err;
    var sql = "SELECT * FROM userTypes";
    connection.query(sql, (err, results)=>{
        if (err)  throw (err)
        res.send(results)
        
        })
    })
}

exports.create = (req, res)=>{
 
    req.getConnection((err, connection)=>{
        if(err) throw err;
     var sql =   connection.query(`INSERT INTO userTypes SET ?`,[req.body], (err, results)=>{
            if(err) throw err;
            res.send(results)
        })
       
    })
}

exports.update = (req, res)=>{
    var id  = req.params.id
        if( id==1 || id==2 ){
            throw new Error("BROKEN");
        }
        req.getConnection((err, connection)=>{
            if(err) throw err;
        connection.query(`UPDATE userTypes SET ? WHERE user_group = ?`,[req.body, id], (err, results)=>{
                if(err) throw err;
              res.send(results)
            })
            
        }) 
 }

 exports.delete = (req, res) =>{
     var id = req.params.id
     if (id ===1 || id ===2 || id ===3 || id ===4 || id===5){
        throw new Error("BROKEN");
     }
    req.getConnection((err, connection)=>{
        if(err) throw err;
            connection.query("DELETE FROM userTypes WHERE user_group =?",[id], (err,results)=>{ 
                if(err)throw err;
                connection.query(`DELETE FROM registration WHERE user_group = ?`,[id],function(err,results1){
                    if(err) throw err;
                    res.send({message:'ลบข้อมูลเรียบร้อยแล้ว มีข้อมูลผู้ใช้ทั้งหมดจำนวน '+results1.affectedRows+' บัญชีที่ถูกลบ'})
                })
            })
    })
 }