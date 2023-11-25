const express=require('express')
const axios = require('axios');
const path=require('path')
const bodyParser=require('body-parser')
const app=express()
const port=3000
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
const apiKey = '50db29f424a24bff9a17d8f8589dcba3';
// app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('./public'))
app.get('/hello',(req,res)=>{
  res.send("testing")
})
//Test code to get the JSON of the News
app.get('/', async (req, res) => {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;

    const response = await axios.get(apiUrl);
    // Send the formatted news data as JSON
      // res.json(response.data.articles)
      let data1={
       img:response.data.articles[0].urlToImage,
        title:response.data.articles[0].title,
        description:response.data.articles[0].description,
        time:response.data.articles[0].publishedAt,
        author:response.data.articles[0].author
      }
      let data2={
        img:response.data.articles[1].urlToImage,
         title:response.data.articles[1].title,
         description:response.data.articles[1].description,
         time:response.data.articles[1].publishedAt,
         author:response.data.articles[1].author
       }
       let data3={
        img:response.data.articles[2].urlToImage,
         title:response.data.articles[2].title,
         description:response.data.articles[2].description,
         time:response.data.articles[2].publishedAt,
         author:response.data.articles[2].author
       }
       let data4={
        img:response.data.articles[3].urlToImage,
         title:response.data.articles[3].title,
         description:response.data.articles[3].description,
         time:response.data.articles[3].publishedAt,
         author:response.data.articles[3].author
       }
       let data5={
        img:response.data.articles[4].urlToImage,
         title:response.data.articles[4].title,
         description:response.data.articles[4].description,
         time:response.data.articles[4].publishedAt,
         author:response.data.articles[4].author
       }
       let data6={
        img:response.data.articles[5].urlToImage,
         title:response.data.articles[5].title,
         description:response.data.articles[5].description,
         time:response.data.articles[5].publishedAt,
         author:response.data.articles[5].author
       }
      res.render('home',{data1: data1,data2:data2,data3:data3,data4:data4,data5:data5,data6:data6})
      
   
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/technology',async(req,res)=>{
  try{
  const apiUrl = `https://newsapi.org/v2/top-headlines?category=technology&country=in&apiKey=${apiKey}`
  const response = await axios.get(apiUrl)
  let data1={
    img:response.data.articles[0].urlToImage,
     title:response.data.articles[0].title,
     description:response.data.articles[0].description,
     time:response.data.articles[0].publishedAt,
     author:response.data.articles[0].author
   }
   let data2={
    img:response.data.articles[1].urlToImage,
     title:response.data.articles[1].title,
     description:response.data.articles[1].description,
     time:response.data.articles[1].publishedAt,
     author:response.data.articles[1].author
   }
   let data3={
    img:response.data.articles[2].urlToImage,
     title:response.data.articles[2].title,
     description:response.data.articles[2].description,
     time:response.data.articles[2].publishedAt,
     author:response.data.articles[2].author
   }
   let data4={
    img:response.data.articles[3].urlToImage,
     title:response.data.articles[3].title,
     description:response.data.articles[3].description,
     time:response.data.articles[3].publishedAt,
     author:response.data.articles[3].author
   }
   let data5={
    img:response.data.articles[4].urlToImage,
     title:response.data.articles[4].title,
     description:response.data.articles[4].description,
     time:response.data.articles[4].publishedAt,
     author:response.data.articles[4].author
   }
   let data6={
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
    res.status(500).send('Not fetched');
  }

})
app.get('/business',async(req,res)=>{
  try{
  const apiUrl = `https://newsapi.org/v2/top-headlines?category=business&country=in&apiKey=${apiKey}`
  const response = await axios.get(apiUrl)
  let data1={
    img:response.data.articles[0].urlToImage,
     title:response.data.articles[0].title,
     description:response.data.articles[0].description,
     time:response.data.articles[0].publishedAt,
     author:response.data.articles[0].author
   }
   let data2={
    img:response.data.articles[1].urlToImage,
     title:response.data.articles[1].title,
     description:response.data.articles[1].description,
     time:response.data.articles[1].publishedAt,
     author:response.data.articles[1].author
   }
   let data3={
    img:response.data.articles[2].urlToImage,
     title:response.data.articles[2].title,
     description:response.data.articles[2].description,
     time:response.data.articles[2].publishedAt,
     author:response.data.articles[2].author
   }
   let data4={
    img:response.data.articles[3].urlToImage,
     title:response.data.articles[3].title,
     description:response.data.articles[3].description,
     time:response.data.articles[3].publishedAt,
     author:response.data.articles[3].author
   }
   let data5={
    img:response.data.articles[4].urlToImage,
     title:response.data.articles[4].title,
     description:response.data.articles[4].description,
     time:response.data.articles[4].publishedAt,
     author:response.data.articles[4].author
   }
   let data6={
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
    res.status(500).send('Internal Server Error');
  }

})
app.get('/science',async(req,res)=>{
  try{
  const apiUrl = `https://newsapi.org/v2/top-headlines?category=science&country=in&apiKey=${apiKey}`
  const response = await axios.get(apiUrl)
  let data1={
    img:response.data.articles[0].urlToImage,
     title:response.data.articles[0].title,
     description:response.data.articles[0].description,
     time:response.data.articles[0].publishedAt,
     author:response.data.articles[0].author
   }
   let data2={
    img:response.data.articles[1].urlToImage,
     title:response.data.articles[1].title,
     description:response.data.articles[1].description,
     time:response.data.articles[1].publishedAt,
     author:response.data.articles[1].author
   }
   let data3={
    img:response.data.articles[2].urlToImage,
     title:response.data.articles[2].title,
     description:response.data.articles[2].description,
     time:response.data.articles[2].publishedAt,
     author:response.data.articles[2].author
   }
   let data4={
    img:response.data.articles[3].urlToImage,
     title:response.data.articles[3].title,
     description:response.data.articles[3].description,
     time:response.data.articles[3].publishedAt,
     author:response.data.articles[3].author
   }
   let data5={
    img:response.data.articles[4].urlToImage,
     title:response.data.articles[4].title,
     description:response.data.articles[4].description,
     time:response.data.articles[4].publishedAt,
     author:response.data.articles[4].author
   }
   let data6={
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
    res.status(500).send('Internal Server Error');
  }

})
app.get('/sports',async(req,res)=>{
  try{
  const apiUrl = `https://newsapi.org/v2/top-headlines?category=sports&country=in&apiKey=${apiKey}`
  const response = await axios.get(apiUrl)
  let data1={
    img:response.data.articles[0].urlToImage,
     title:response.data.articles[0].title,
     description:response.data.articles[0].description,
     time:response.data.articles[0].publishedAt,
     author:response.data.articles[0].author
   }
   let data2={
    img:response.data.articles[1].urlToImage,
     title:response.data.articles[1].title,
     description:response.data.articles[1].description,
     time:response.data.articles[1].publishedAt,
     author:response.data.articles[1].author
   }
   let data3={
    img:response.data.articles[2].urlToImage,
     title:response.data.articles[2].title,
     description:response.data.articles[2].description,
     time:response.data.articles[2].publishedAt,
     author:response.data.articles[2].author
   }
   let data4={
    img:response.data.articles[3].urlToImage,
     title:response.data.articles[3].title,
     description:response.data.articles[3].description,
     time:response.data.articles[3].publishedAt,
     author:response.data.articles[3].author
   }
   let data5={
    img:response.data.articles[4].urlToImage,
     title:response.data.articles[4].title,
     description:response.data.articles[4].description,
     time:response.data.articles[4].publishedAt,
     author:response.data.articles[4].author
   }
   let data6={
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
    res.status(500).send('Internal Server Error');
  }

})
app.get('/health',async(req,res)=>{
  try{
  const apiUrl = `https://newsapi.org/v2/top-headlines?category=health&country=in&apiKey=${apiKey}`
  const response = await axios.get(apiUrl)
  let data1={
    img:response.data.articles[0].urlToImage,
     title:response.data.articles[0].title,
     description:response.data.articles[0].description,
     time:response.data.articles[0].publishedAt,
     author:response.data.articles[0].author
   }
   let data2={
    img:response.data.articles[1].urlToImage,
     title:response.data.articles[1].title,
     description:response.data.articles[1].description,
     time:response.data.articles[1].publishedAt,
     author:response.data.articles[1].author
   }
   let data3={
    img:response.data.articles[2].urlToImage,
     title:response.data.articles[2].title,
     description:response.data.articles[2].description,
     time:response.data.articles[2].publishedAt,
     author:response.data.articles[2].author
   }
   let data4={
    img:response.data.articles[3].urlToImage,
     title:response.data.articles[3].title,
     description:response.data.articles[3].description,
     time:response.data.articles[3].publishedAt,
     author:response.data.articles[3].author
   }
   let data5={
    img:response.data.articles[4].urlToImage,
     title:response.data.articles[4].title,
     description:response.data.articles[4].description,
     time:response.data.articles[4].publishedAt,
     author:response.data.articles[4].author
   }
   let data6={
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
    res.status(500).send('Internal Server Error');
  }

})
app.post('/search',(req,res)=>{
  const body=req.body
  console.log(body)
})
// app.get('/search',async(req,res)=>{
//   try{
//     const apiUrl = `https://newsapi.org/v2/everything?q=${searched}&country=in&apiKey=${apiKey}`
//     const response = await axios.get(apiUrl)
//     res.json(response.data.articles)
//   }
//   catch(error){
//     console.error('Error fetching news:', error.message);
//     res.status(500).send('Internal Server Error');
//   }
// })
app.all('*',(req,res)=>{
  res.render('error')
})
app.listen(port,()=>{
    console.log(`Server Started at port ${port}`)
})