const express=require('express')
const axios = require('axios');
const path=require('path')
const cors=require('cors')
const sqlite3=require('sqlite3').verbose()
const bodyParser=require('body-parser');
const { url } = require('inspector');
const app=express()
const port=3000
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
  console.log(username,password)
  db.all('INSERT INTO credentials (username,password) VALUES (?,?)',[username,password],(err)=>{
    if(err){
      throw err
    }
    else {
      console.log('sucess')
    }

  })
})
app.get('/login',(req,res)=>{
  res.render('login')
})
app.post('/login',(req,res)=>{
 const username=req.body.username
 const password=req.body.password
 console.log(username,password)
 if(username && password)
    {
        query = `
        SELECT * FROM credentials 
        WHERE username = "${username}"
        `;

        db.all(query, function(error, data){

            if(data.length > 0)
            {
                for(var count = 0; count < data.length; count++)
                {
                    if(data[count].password == password)
                    {

                        return res.redirect("/home");
                    }
                    else
                    {
                       return res.send('Incorrect Password');
                    }
                }
            }
            else
            {
                return res.send('username wrong');
            }
        });
    }

})
app.post('/logout',(req,res)=>{
  res.render('landing')
})
//Test code to get the JSON of the News
app.get('/home', async (req, res) => {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;

    const response = await axios.get(apiUrl);
    // Send the formatted news data as JSON
      // res.json(response.data.articles)
      let data1={
        url:response.data.articles[0].url,
        img:response.data.articles[0].urlToImage,
         title:response.data.articles[0].title,
         description:response.data.articles[0].description,
         time:response.data.articles[0].publishedAt,
         author:response.data.articles[0].author
       }
       let data2={
        url:response.data.articles[1].url,
        img:response.data.articles[1].urlToImage,
         title:response.data.articles[1].title,
         description:response.data.articles[1].description,
         time:response.data.articles[1].publishedAt,
         author:response.data.articles[1].author
       }
       let data3={
        url:response.data.articles[2].url,
        img:response.data.articles[2].urlToImage,
         title:response.data.articles[2].title,
         description:response.data.articles[2].description,
         time:response.data.articles[2].publishedAt,
         author:response.data.articles[2].author
       }
       let data4={
        url:response.data.articles[3].url,
        img:response.data.articles[3].urlToImage,
         title:response.data.articles[3].title,
         description:response.data.articles[3].description,
         time:response.data.articles[3].publishedAt,
         author:response.data.articles[3].author
       }
       let data5={
        url:response.data.articles[4].url,
        img:response.data.articles[4].urlToImage,
         title:response.data.articles[4].title,
         description:response.data.articles[4].description,
         time:response.data.articles[4].publishedAt,
         author:response.data.articles[4].author
       }
       let data6={
        url:response.data.articles[5].url,
        img:response.data.articles[5].urlToImage,
         title:response.data.articles[5].title,
         description:response.data.articles[5].description,
         time:response.data.articles[5].publishedAt,
         author:response.data.articles[5].author
       }
      res.render('home',{data1: data1,data2:data2,data3:data3,data4:data4,data5:data5,data6:data6})
      
   
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).render('error')
  }
});
app.get('/technology',async(req,res)=>{
  try{
  const apiUrl = `https://newsapi.org/v2/top-headlines?category=technology&country=in&apiKey=${apiKey}`
  const response = await axios.get(apiUrl)
  let data1={
    url:response.data.articles[0].url,
    img:response.data.articles[0].urlToImage,
     title:response.data.articles[0].title,
     description:response.data.articles[0].description,
     time:response.data.articles[0].publishedAt,
     author:response.data.articles[0].author
   }
   let data2={
    url:response.data.articles[1].url,
    img:response.data.articles[1].urlToImage,
     title:response.data.articles[1].title,
     description:response.data.articles[1].description,
     time:response.data.articles[1].publishedAt,
     author:response.data.articles[1].author
   }
   let data3={
    url:response.data.articles[2].url,
    img:response.data.articles[2].urlToImage,
     title:response.data.articles[2].title,
     description:response.data.articles[2].description,
     time:response.data.articles[2].publishedAt,
     author:response.data.articles[2].author
   }
   let data4={
    url:response.data.articles[3].url,
    img:response.data.articles[3].urlToImage,
     title:response.data.articles[3].title,
     description:response.data.articles[3].description,
     time:response.data.articles[3].publishedAt,
     author:response.data.articles[3].author
   }
   let data5={
    url:response.data.articles[4].url,
    img:response.data.articles[4].urlToImage,
     title:response.data.articles[4].title,
     description:response.data.articles[4].description,
     time:response.data.articles[4].publishedAt,
     author:response.data.articles[4].author
   }
   let data6={
    url:response.data.articles[5].url,
    img:response.data.articles[5].urlToImage,
     title:response.data.articles[5].title,
     description:response.data.articles[5].description,
     time:response.data.articles[5].publishedAt,
     author:response.data.articles[5].author
   }
   res.render('home',{data1: data1,data2:data2,data3:data3,data4:data4,data5:data5,data6:data6})
  }
 
  catch(error){
    console.error('Error fetching news:', error.message);
    res.status(500).render('error')
  }

})
app.get('/business',async(req,res)=>{
  try{
  const apiUrl = `https://newsapi.org/v2/top-headlines?category=business&country=in&apiKey=${apiKey}`
  const response = await axios.get(apiUrl)
  let data1={
    url:response.data.articles[0].url,
    img:response.data.articles[0].urlToImage,
     title:response.data.articles[0].title,
     description:response.data.articles[0].description,
     time:response.data.articles[0].publishedAt,
     author:response.data.articles[0].author
   }
   let data2={
    url:response.data.articles[1].url,
    img:response.data.articles[1].urlToImage,
     title:response.data.articles[1].title,
     description:response.data.articles[1].description,
     time:response.data.articles[1].publishedAt,
     author:response.data.articles[1].author
   }
   let data3={
    url:response.data.articles[2].url,
    img:response.data.articles[2].urlToImage,
     title:response.data.articles[2].title,
     description:response.data.articles[2].description,
     time:response.data.articles[2].publishedAt,
     author:response.data.articles[2].author
   }
   let data4={
    url:response.data.articles[3].url,
    img:response.data.articles[3].urlToImage,
     title:response.data.articles[3].title,
     description:response.data.articles[3].description,
     time:response.data.articles[3].publishedAt,
     author:response.data.articles[3].author
   }
   let data5={
    url:response.data.articles[4].url,
    img:response.data.articles[4].urlToImage,
     title:response.data.articles[4].title,
     description:response.data.articles[4].description,
     time:response.data.articles[4].publishedAt,
     author:response.data.articles[4].author
   }
   let data6={
    url:response.data.articles[5].url,
    img:response.data.articles[5].urlToImage,
     title:response.data.articles[5].title,
     description:response.data.articles[5].description,
     time:response.data.articles[5].publishedAt,
     author:response.data.articles[5].author
   }
   res.render('home',{data1: data1,data2:data2,data3:data3,data4:data4,data5:data5,data6:data6})
  }

  catch(error){
    console.error('Error fetching news:', error.message);
    res.status(500).render('error')
  }

})
app.get('/science',async(req,res)=>{
  try{
  const apiUrl = `https://newsapi.org/v2/top-headlines?category=science&country=in&apiKey=${apiKey}`
  const response = await axios.get(apiUrl)
  let data1={
    url:response.data.articles[0].url,
    img:response.data.articles[0].urlToImage,
     title:response.data.articles[0].title,
     description:response.data.articles[0].description,
     time:response.data.articles[0].publishedAt,
     author:response.data.articles[0].author
   }
   let data2={
    url:response.data.articles[1].url,
    img:response.data.articles[1].urlToImage,
     title:response.data.articles[1].title,
     description:response.data.articles[1].description,
     time:response.data.articles[1].publishedAt,
     author:response.data.articles[1].author
   }
   let data3={
    url:response.data.articles[2].url,
    img:response.data.articles[2].urlToImage,
     title:response.data.articles[2].title,
     description:response.data.articles[2].description,
     time:response.data.articles[2].publishedAt,
     author:response.data.articles[2].author
   }
   let data4={
    url:response.data.articles[3].url,
    img:response.data.articles[3].urlToImage,
     title:response.data.articles[3].title,
     description:response.data.articles[3].description,
     time:response.data.articles[3].publishedAt,
     author:response.data.articles[3].author
   }
   let data5={
    url:response.data.articles[4].url,
    img:response.data.articles[4].urlToImage,
     title:response.data.articles[4].title,
     description:response.data.articles[4].description,
     time:response.data.articles[4].publishedAt,
     author:response.data.articles[4].author
   }
   let data6={
    url:response.data.articles[5].url,
    img:response.data.articles[5].urlToImage,
     title:response.data.articles[5].title,
     description:response.data.articles[5].description,
     time:response.data.articles[5].publishedAt,
     author:response.data.articles[5].author
   }
   res.render('home',{data1: data1,data2:data2,data3:data3,data4:data4,data5:data5,data6:data6})
  }
  catch(error){
    console.error('Error fetching news:', error.message);
    res.status(500).render('error')
  }

})
app.get('/sports',async(req,res)=>{
  try{
  const apiUrl = `https://newsapi.org/v2/top-headlines?category=sports&country=in&apiKey=${apiKey}`
  const response = await axios.get(apiUrl)
  let data1={
    url:response.data.articles[0].url,
    img:response.data.articles[0].urlToImage,
     title:response.data.articles[0].title,
     description:response.data.articles[0].description,
     time:response.data.articles[0].publishedAt,
     author:response.data.articles[0].author
   }
   let data2={
    url:response.data.articles[1].url,
    img:response.data.articles[1].urlToImage,
     title:response.data.articles[1].title,
     description:response.data.articles[1].description,
     time:response.data.articles[1].publishedAt,
     author:response.data.articles[1].author
   }
   let data3={
    url:response.data.articles[2].url,
    img:response.data.articles[2].urlToImage,
     title:response.data.articles[2].title,
     description:response.data.articles[2].description,
     time:response.data.articles[2].publishedAt,
     author:response.data.articles[2].author
   }
   let data4={
    url:response.data.articles[3].url,
    img:response.data.articles[3].urlToImage,
     title:response.data.articles[3].title,
     description:response.data.articles[3].description,
     time:response.data.articles[3].publishedAt,
     author:response.data.articles[3].author
   }
   let data5={
    url:response.data.articles[4].url,
    img:response.data.articles[4].urlToImage,
     title:response.data.articles[4].title,
     description:response.data.articles[4].description,
     time:response.data.articles[4].publishedAt,
     author:response.data.articles[4].author
   }
   let data6={
    url:response.data.articles[5].url,
    img:response.data.articles[5].urlToImage,
     title:response.data.articles[5].title,
     description:response.data.articles[5].description,
     time:response.data.articles[5].publishedAt,
     author:response.data.articles[5].author
   }
   res.render('home',{data1: data1,data2:data2,data3:data3,data4:data4,data5:data5,data6:data6})
  }
  catch(error){
    console.error('Error fetching news:', error.message);
    res.status(500).render('error')
  }

})
app.get('/health',async(req,res)=>{
  try{
  const apiUrl = `https://newsapi.org/v2/top-headlines?category=health&country=in&apiKey=${apiKey}`
  const response = await axios.get(apiUrl)
  let data1={
    url:response.data.articles[0].url,
    img:response.data.articles[0].urlToImage,
     title:response.data.articles[0].title,
     description:response.data.articles[0].description,
     time:response.data.articles[0].publishedAt,
     author:response.data.articles[0].author
   }
   let data2={
    url:response.data.articles[1].url,
    img:response.data.articles[1].urlToImage,
     title:response.data.articles[1].title,
     description:response.data.articles[1].description,
     time:response.data.articles[1].publishedAt,
     author:response.data.articles[1].author
   }
   let data3={
    url:response.data.articles[2].url,
    img:response.data.articles[2].urlToImage,
     title:response.data.articles[2].title,
     description:response.data.articles[2].description,
     time:response.data.articles[2].publishedAt,
     author:response.data.articles[2].author
   }
   let data4={
    url:response.data.articles[3].url,
    img:response.data.articles[3].urlToImage,
     title:response.data.articles[3].title,
     description:response.data.articles[3].description,
     time:response.data.articles[3].publishedAt,
     author:response.data.articles[3].author
   }
   let data5={
    url:response.data.articles[4].url,
    img:response.data.articles[4].urlToImage,
     title:response.data.articles[4].title,
     description:response.data.articles[4].description,
     time:response.data.articles[4].publishedAt,
     author:response.data.articles[4].author
   }
   let data6={
    url:response.data.articles[5].url,
    img:response.data.articles[5].urlToImage,
     title:response.data.articles[5].title,
     description:response.data.articles[5].description,
     time:response.data.articles[5].publishedAt,
     author:response.data.articles[5].author
   }
   res.render('home',{data1: data1,data2:data2,data3:data3,data4:data4,data5:data5,data6:data6})
  }
  catch(error){
    console.error('Error fetching news:', error.message);
    res.status(500).render('error')
  }

})
app.post('/search',async(req,res)=>{
   try{
    const searched=req.body.searched
    console.log(searched)
    const apiUrl = `https://newsapi.org/v2/everything?q=${searched}&apiKey=${apiKey}`
    // console.log(apiUrl)
    const response = await axios.get(apiUrl)
    let data1={
      url:response.data.articles[0].url,
      img:response.data.articles[0].urlToImage,
       title:response.data.articles[0].title,
       description:response.data.articles[0].description,
       time:response.data.articles[0].publishedAt,
       author:response.data.articles[0].author
     }
     let data2={
      url:response.data.articles[1].url,
      img:response.data.articles[1].urlToImage,
       title:response.data.articles[1].title,
       description:response.data.articles[1].description,
       time:response.data.articles[1].publishedAt,
       author:response.data.articles[1].author
     }
     let data3={
      url:response.data.articles[2].url,
      img:response.data.articles[2].urlToImage,
       title:response.data.articles[2].title,
       description:response.data.articles[2].description,
       time:response.data.articles[2].publishedAt,
       author:response.data.articles[2].author
     }
     let data4={
      url:response.data.articles[3].url,
      img:response.data.articles[3].urlToImage,
       title:response.data.articles[3].title,
       description:response.data.articles[3].description,
       time:response.data.articles[3].publishedAt,
       author:response.data.articles[3].author
     }
     let data5={
      url:response.data.articles[4].url,
      img:response.data.articles[4].urlToImage,
       title:response.data.articles[4].title,
       description:response.data.articles[4].description,
       time:response.data.articles[4].publishedAt,
       author:response.data.articles[4].author
     }
     let data6={
      url:response.data.articles[5].url,
      img:response.data.articles[5].urlToImage,
       title:response.data.articles[5].title,
       description:response.data.articles[5].description,
       time:response.data.articles[5].publishedAt,
       author:response.data.articles[5].author
     }
     res.render('home',{data1: data1,data2:data2,data3:data3,data4:data4,data5:data5,data6:data6})
    }
  catch(error){
    console.error('Error fetching news:', error.message);
    res.status(500).render('error')
  }
})
// app.get('/news/:id',async(req,res)=>{
//   try{
//     const searched=req.body.searched
//     console.log(searched)
//     const apiUrl = `https://newsapi.org/v2/everything?q=${searched}&apiKey=${apiKey}`
//     // console.log(apiUrl)
//     const response = await axios.get(apiUrl)
//   console.log(req.params.id)
//   const title='NEWS'
//   if(req.params.id=='data1')
//   {
//     console.log('Hello data 1')
//     var data={
//       img:response.data.articles[0].urlToImage,
//       title:response.data.articles[0].title,
//       description:response.data.articles[0].description,
//       time:response.data.articles[0].publishedAt,
//       author:response.data.articles[0].author
//     }
    
//   }
//   else if(req.params.id=='data2'){
//     var data={
//       url:response.data.articles[1].url,
//       img:response.data.articles[1].urlToImage,
//       title:response.data.articles[1].title,
//       description:response.data.articles[1].description,
//       time:response.data.articles[1].publishedAt,
//       author:response.data.articles[1].author,
//       content:response.data.articles[1].content
//     }
//   }
//   else if(req.params.id=='data3'){
//     var data={
//       img:response.data.articles[2].urlToImage,
//       title:response.data.articles[2].title,
//       description:response.data.articles[2].description,
//       time:response.data.articles[2].publishedAt,
//       author:response.data.articles[2].author,
//       content:response.data.articles[2].content
//     }
//   }
//   else if(req.params.id=='data4'){
//     var data={
//       img:response.data.articles[3].urlToImage,
//       title:response.data.articles[3].title,
//       description:response.data.articles[3].description,
//       time:response.data.articles[3].publishedAt,
//       author:response.data.articles[3].author,
//       content:response.data.articles[3].content
//     }
//   }
//   else if(req.params.id=='data5'){
//     var data={
//       img:response.data.articles[4].urlToImage,
//       title:response.data.articles[4].title,
//       description:response.data.articles[4].description,
//       time:response.data.articles[4].publishedAt,
//       author:response.data.articles[4].author,
//       content:response.data.articles[4].content
//     }
//   }
//   else if(req.params.id=='data6'){
//     var data={
//       img:response.data.articles[5].urlToImage,
//       title:response.data.articles[5].title,
//       description:response.data.articles[5].description,
//       time:response.data.articles[5].publishedAt,
//       author:response.data.articles[5].author,
//       content:response.data.articles[5].content
//     }
//   }
//   res.render('news',{title:title,data:data})
// }
// catch(error){
//   console.error('Error fetching news:', error.message);
//   res.status(500).render('error')
// }
// })
app.all('*',(req,res)=>{
  res.render('error')
})
app.listen(port,()=>{
    console.log(`Server Started at port ${port}`)
})