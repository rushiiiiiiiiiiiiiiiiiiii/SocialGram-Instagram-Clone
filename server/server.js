var express = require('express')
var app = express()
var cors = require('cors')
var multer = require('multer')
var con = require('./conn')
app.use(cors())
app.use(express.json())


// app.post('/register', (req,res)=>{
//     var sql = 'INSERT INTO login(name,username,email,password) VALUES(?,?,?,?)'
//     var {name,uname,email,password} = req.body;
      
//     con.query(sql,[name,uname,email,password],(err,result)=>{
//         if(err) return res.json(err)
//             return res.json(result);
//     })
// })

app.post('/login', (req,res)=>{
  var sql = 'SELECT * FROM login WHERE email = ? AND password = ?'
  var {email,password} = req.body;
  con.query(sql,[email,password],(err,result)=>{
    if(err) return res.json(err)
      // console.log(result[0].id)
      if(result.length>0){
        const sql='UPDATE login SET IsLogin = 1 WHERE id = ?';
        con.query(sql,[result[0].id],(err,response)=>{
          if(err) return res.json(err)
            return res.json(result);
        })
      }
  })
})

app.post('/logout/:id',(req,res)=>{
  const id=req.params.id
  const sql='UPDATE login SET IsLogin = 0 WHERE id = ?'
  con.query(sql,[id],(err,result)=>{
    if(err) return res.json(err)
      return res.json(result);
  })
})

app.use('/uploads', express.static('uploads'))                                                           

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, './uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,`image-${Date.now()}${file.originalname}`)
    }
})

const upload = multer({
    storage:storage
})
const data = multer()

app.post('/register', upload.single("photo"),(req,res)=>{
  var sql = 'INSERT INTO login(photos,name,username,email,password,IsLogin) VALUES(?,?,?,?,?,0)'
  var filename = req.file.filename;
  var name = req.body.name;
  var uname = req.body.uname;
  var email = req.body.email;
  var password = req.body.password;

  con.query(sql,[filename,name,uname,email,password],(err,result)=>{
      if(err) return res.json(err)
          return res.json(result);
  })
})

app.post('/create/:id',upload.single("photo"),(req,res)=>{
  var sql ='INSERT INTO addpost(sid,caption,location,photos) VALUES(?,?,?,?)'
  var sid = req.body.id;
  var caption = req.body.caption;
  var location = req.body.location;
  var filename = req.file.filename;
  // console.log(filename)
  con.query(sql,[sid,caption,location,filename],(err,result)=>{
    if(err)  return res.json(err)
      return res.json(result)
  })
})
app.post('/createstory/:id',upload.single("photo"),(req,res)=>{
  var sql ='INSERT INTO storytb(sid,photos) VALUES(?,?)'
  var sid = req.body.id;
  var filename = req.file.filename;


  con.query(sql,[sid,filename],(err,result)=>{
    if(err)  return res.json(err)
      return res.json(result)
  })
})
app.get('/getpost/:id', (req, res) => {
  const sql = "SELECT * FROM addpost WHERE sid=?";
  const sid = req.params.id;
 // Correct variable name

  con.query(sql, [sid], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});
app.get('/getstory/:id', (req, res) => {
  const sql = "SELECT * FROM storytb WHERE sid=?";
  const sid = req.params.id;

  con.query(sql, [sid], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});
app.get('/getstoryall/:id', (req, res) => {
  const id =parseInt(req.params.id);
  const sql = "SELECT * FROM storytb WHERE sid != ? ";

  con.query(sql,[id],(err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});
app.get('/getuser/:id', (req, res) => {
  const sql = "SELECT * FROM login WHERE id=?";
  const sid = req.params.id;
  // Correct variable name

  con.query(sql, [sid], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});
app.get('/getpostall', (req, res) => {
  const sql = "SELECT * FROM addpost";

  con.query(sql, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});
app.get('/getuserall', (req, res) => {
  const sql = "SELECT * FROM login";

  con.query(sql, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});
app.get('/getpostcom/:id', (req, res) => {
  var id = req.params.id;
  const sql = "SELECT * FROM addpost WHERE id=?";

  con.query(sql, [id],(err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});
app.post('/like/:id',(req,res)=>{
  var sid = req.body.id;
  var pid = req.body.pid;
  var like = req.body.likes;
  var sqls=`SELECT * FROM liketb WHERE sid=${sid} and pid=${pid}`
  con.query(sqls,(err,result)=>{
    if(err) return err;
      if(result.length>0){
  var sql ='DELETE FROM liketb WHERE sid=? AND pid=?'
    con.query(sql,[sid,pid],(err,result)=>{
      if(err)  return res.json(err);
        return res.json(result)
    })
  }
  else{
  var sql ='INSERT INTO liketb(sid,pid,likes) VALUES(?,?,?)'    
  con.query(sql,[sid,pid,like],(err,result)=>{
    if(err)  return res.json(err)
      return res.json(result)
  })
}
 })
})
app.get('/chatuser/:id',async (req,res) => {
  const id=req.params.id;
  var sql="SELECT * FROM login WHERE id <> ?"
  con.query(sql,[id],(err,result)=>{
    if(err) return err;
    return res.json(result)
  })
})

app.get('/getlike/:id', (req, res) => {
  const ids = req.params.id;
  const sql = `SELECT count(*) AS \`${ids}\` FROM liketb WHERE pid = ?`;
  // Execute the query with a parameterized value for pid
  con.query(sql, [ids], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message }); // Return error with proper status code
    }
    // Return the result with the dynamic alias as the key
    if (result.length > 0) {
      return res.json(result[0]); // The dynamic alias will be the key of the result
    } else {
      return res.status(404).json({ message: 'No likes found for the given post ID' });
}
});
});
app.get('/getsave/:id',(req,res)=>{
  const id = req.params.id
  const sql = "SELECT * FROM savetb WHERE sid=?"
  con.query(sql,[id],(err,result)=>{
    if(err) return res.json(err)
      return res.json(result)
  })
})
app.get('/getcomment/:id',(req,res)=>{
  var id = req.params.id;
  const sql = "SELECT * FROM commenttb WHERE pid=?"
  con.query(sql,[id],(err,result)=>{
    if(err) return res.json(err)
      return res.json(result)
  })
})
app.get('/commentlength/:id',async(req,res)=>{
  const ids=req.params.id
  const sql = `SELECT count(*) AS \`${ids}\` FROM commenttb WHERE pid = ?`;
  con.query(sql,[ids],(err,result)=>{
    if(err)return err;
    return res.json(result[0]);
  })
})
app.post('/comment/:id',(req,res)=>{
  var sid = req.body.id;
  var pid = req.body.pid;
  var comment = req.body.comment;
  var sql ='INSERT INTO commenttb(sid,pid,comment) VALUES(?,?,?)'

  
  con.query(sql,[sid,pid,comment],(err,result)=>{
    if(err)  return res.json(err)
     return res.json(result)
  })
})
app.post('/save/:id',(req,res)=>{
  var sid = req.body.id;
  var pid = req.body.pid;
  var save = req.body.save;
  var sqls=`SELECT * FROM savetb WHERE sid=${sid} and pid=${pid}`
  con.query(sqls,(err,result)=>{
    if(err) return err;
      if(result.length>0){
  var sql ='DELETE FROM savetb WHERE sid=? AND pid=?'
    con.query(sql,[sid,pid],(err,result)=>{
      if(err)  return res.json(err);
        return res.json(result)
    })
  }
  else{
  var sql ='INSERT INTO savetb(sid,pid,save) VALUES(?,?,?)'    
  con.query(sql,[sid,pid,save],(err,result)=>{
    if(err)  return res.json(err)
      return res.json(result)
  })
}
 })
})
app.post('/SendMess',async(req,res)=>{
  const {Message,ReceiverID,SenderID}=req.body
  var sql ='INSERT INTO chats(SenderID,ReceiverID,Message) VALUES(?,?,?)'  
  con.query(sql,[SenderID,ReceiverID,Message],(err,result)=>{
    if(err) return err;
    return res.json(result)
  })  
})
app.get('/Message',async(req,res)=>{
  const{userId,id}=req.query
  const sql=` SELECT * FROM chats
    WHERE (SenderID = ? AND ReceiverID = ?)
    OR (SenderID = ? AND ReceiverID = ?)
    `
  con.query(sql,[userId,id,id,userId],(err,result)=>{
    // console.log(userId,id)
    if(err) return err;
    return res.json(result)
  })
})
app.post('/follow',(req,res)=>{
  const{userId,id}=req.body
  console.log(userId,id);
  const sql ='INSERT INTO follower(follower,following) VALUES(?,?)';
   con.query(sql,[id,userId],(err,result)=>{
    if(err) return err;
    return res.json(result)
  })
})
app.get('/getfollower',async(req,res)=>{
  const{userId,id}=req.query
  const sql=`SELECT * FROM follower
    WHERE (follower = ?)
    OR (following = ?)`
  con.query(sql,[id,id],(err,result)=>{
    if(err) return err;
    return res.json(result)
  })
})
app.delete('/unfollow/:id',async(req,res)=>{
  const id=req.params.id;
  const sql="DELETE FROM follower WHERE following=?";
  con.query(sql,[id],(err,result)=>{
    if(err) return err;
    return res.json(result)
  })
})
app.listen(8000, ()=>{
  console.log("server running on 8000")
})
// AIzaSyCUquQJirgRWIJ9Bn7nmXt6BAvxMhK6L2Y