var express = require('express')
var app = express()
var cors = require('cors')
var multer = require('multer')
var con = require('./conn')
app.use(cors())
app.use(express.json())


app.post('/register', (req,res)=>{
    var sql = 'INSERT INTO login(name,username,email,password) VALUES(?,?,?,?)'
    var {name,uname,email,password} = req.body;
      
    con.query(sql,[name,uname,email,password],(err,result)=>{
        if(err) return res.json(err)
            return res.json(result);
    })
})

app.post('/login', (req,res)=>{
  var sql = 'SELECT * FROM login WHERE email = ? AND password = ?'
  var {email,password} = req.body;
  con.query(sql,[email,password],(err,result)=>{
    if(err) return res.json(err)
      return res.json(result)
  })
})
app.use('/uploads', express.static('uploads'))                                                           

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, './uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,`image-${Date.now()}.${file.originalname}`)
    }
})

const upload = multer({
    storage:storage
})
const data = multer()


app.post('/create/:id',upload.single("photo"),(req,res)=>{
  var sql ='INSERT INTO addpost(sid,caption,location,photos) VALUES(?,?,?,?)'
  var sid = req.body.id;
  var caption = req.body.caption;
  var location = req.body.location;
  var filename = req.file.filename;


  con.query(sql,[sid,caption,location,filename],(err,result)=>{
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
app.get('/getlike',(req,res)=>{
  const sql = "SELECT * FROM liketb"
  con.query(sql,(err,result)=>{
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
  var sql ='INSERT INTO savetb(sid,pid,save) VALUES(?,?,?)'

  
  con.query(sql,[sid,pid,save],(err,result)=>{
    if(err)  return res.json(err)
      return res.json(result)
  })
})
app.listen(8000, ()=>{
  console.log("server running on 8000")
})