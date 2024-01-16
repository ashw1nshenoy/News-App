const express=require('express')
const axios = require('axios');
const path=require('path')
const cors=require('cors')
const bcrypt = require('bcrypt');
const sqlite3=require('sqlite3').verbose()
const bodyParser=require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('connect-flash');
const app=express()
const port=3000
const saltRounds=10
const apiKey = '50db29f424a24bff9a17d8f8589dcba3';
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('./public'))
app.get('/hello',(req,res)=>{
  res.send("testing")
})
let db = new sqlite3.Database('credentials.db',(err)=>{
  if(err){
    console.log(err.message)
  }
  console.log('connected to db successfully')
})
//LOGIN AND SIGNUP
app.get('/',(req,res)=>{
  res.render('landing')
})
app.get('/register',(req,res)=>{
  res.render('signup')
})
app.post('/register',(req,res)=>{
  
  const username=req.body.username
  const password=req.body.password
  const hash = bcrypt.hashSync(password, saltRounds);
  console.log(username,hash)
  db.all('INSERT INTO credentials (username,password) VALUES (?,?)',[username,hash],(err)=>{
    if(err){
      throw err
    }
    else {
      console.log('sucess')
      return res.render('login');
    }

  })
})
// Use middleware for session
app.use(
  session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
  })
);
app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});
// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    db.get('SELECT * FROM credentials WHERE username = ?', [username], async (err, row) => {
      if (err) {
        console.error(err.message);
        return done(err);
      }
      if (!row) {
        console.log('User not found');
        return done(null, false, { message: 'Incorrect username or password.' });
      }

      const hashedPassword = row.password;
  

      try {
        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        if (passwordMatch) {
          console.log('Password is correct');
          return done(null, row);
        } else {
          console.log('Incorrect password');
          return done(null, false, { message: 'Incorrect username or password.' });
        }
      } catch (compareError) {
        console.error(compareError.message);
        return done(compareError);
      }
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  db.get('SELECT * FROM credentials WHERE username = ?', [username], (err, row) => {
      done(err, row);
  });
});
app.get('/login',(req,res)=>{
  res.render('login')
})
app.post(
  '/login',
  passport.authenticate('local', {
      successRedirect: '/home',
      failureRedirect: '/login',
      failureFlash: true,
  })
);
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
app.get('/logout', (req, res) => {
  req.logout(req.user, err => {
    if(err) return next(err);
    res.redirect('/');
  });
});

app.get('/home',isAuthenticated, async (req, res) => {
 
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;

    const response = await axios.get(apiUrl);
    // Send the formatted news data as JSON
      // res.json(response.data.articles)
      // let data={
      //   url:response.data.articles.url,
      //   img:response.data.articles.urlToImage,
      //    title:response.data.articles.title,
      //    description:response.data.articles.description,
      //    time:response.data.articles.publishedAt,
      //    author:response.data.articles.author
      //  }
       
      res.render('home',{ data:response.data.articles})
      
   
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).render('error')
  }
});
app.get('/technology',isAuthenticated,async(req,res)=>{
  try{
  const apiUrl = `https://newsapi.org/v2/top-headlines?category=technology&country=in&apiKey=${apiKey}`
  const response = await axios.get(apiUrl);     
    res.render('home',{ data:response.data.articles})
    
 
} catch (error) {
  console.error('Error fetching news:', error.message);
  res.status(500).render('error')
}

})
app.get('/business',isAuthenticated,async(req,res)=>{
  try{
  const apiUrl = `https://newsapi.org/v2/top-headlines?category=business&country=in&apiKey=${apiKey}`
  const response = await axios.get(apiUrl);     
    res.render('home',{ data:response.data.articles})
    
 
} catch (error) {
  console.error('Error fetching news:', error.message);
  res.status(500).render('error')
}
})
app.get('/lifestyle',isAuthenticated,async(req,res)=>{
  try{
  const apiUrl = `https://newsapi.org/v2/everything?q=lifestyle&apiKey=${apiKey}`
  const response = await axios.get(apiUrl);     
    res.render('home',{ data:response.data.articles})
    
 
} catch (error) {
  console.error('Error fetching news:', error.message);
  res.status(500).render('error')
}
})
app.get('/music',async(req,res)=>{
  try{
  const apiUrl = `https://newsapi.org/v2/everything?q=music&apiKey=${apiKey}`
  const response = await axios.get(apiUrl);     
    res.render('home',{ data:response.data.articles})
    
 
} catch (error) {
  console.error('Error fetching news:', error.message);
  res.status(500).render('error')
}

})
app.get('/science',isAuthenticated,async(req,res)=>{
  try{
  const apiUrl = `https://newsapi.org/v2/top-headlines?category=science&country=in&apiKey=${apiKey}`
  const response = await axios.get(apiUrl);     
    res.render('home',{ data:response.data.articles})
    
 
} catch (error) {
  console.error('Error fetching news:', error.message);
  res.status(500).render('error')
}

})
app.get('/fashion',isAuthenticated,async(req,res)=>{
  try{
  const apiUrl = `https://newsapi.org/v2/everything?q=fashion&apiKey=${apiKey}`
  const response = await axios.get(apiUrl);
        res.render('home',{ data:response.data.articles})
        
     
    } catch (error) {
      console.error('Error fetching news:', error.message);
      res.status(500).render('error')
    }
})
app.get('/sports',isAuthenticated,async(req,res)=>{
  try{
  const apiUrl = `https://newsapi.org/v2/top-headlines?category=sports&country=in&apiKey=${apiKey}`
  const response = await axios.get(apiUrl);    
    res.render('home',{ data:response.data.articles})
    
 
} catch (error) {
  console.error('Error fetching news:', error.message);
  res.status(500).render('error')
}

})
app.get('/health',isAuthenticated,async(req,res)=>{
  try{
  const apiUrl = `https://newsapi.org/v2/top-headlines?category=health&country=in&apiKey=${apiKey}`
  const response = await axios.get(apiUrl);     
    res.render('home',{ data:response.data.articles})
} catch (error) {
  console.error('Error fetching news:', error.message);
  res.status(500).render('error')
}
})
app.post('/search',isAuthenticated,async(req,res)=>{
   try{
    const searched=req.body.searched
    console.log(searched)
    const apiUrl = `https://newsapi.org/v2/everything?q=${searched}&apiKey=${apiKey}`
    // console.log(apiUrl)
    const response = await axios.get(apiUrl);       
      res.render('home',{ data:response.data.articles})
      
   
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).render('error')
  }
})
app.all('*',(req,res)=>{
  res.render('error')
})
app.listen(port,()=>{
    console.log(`Server Started at port ${port}`)
})