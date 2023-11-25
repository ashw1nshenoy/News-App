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
    // console.log(response.data)
    // const newsArticles = response.data.articles.map(article => ({
    //   title: article.title,
    //   description: article.description,
    //   url: article.url,
    //   urlToImage:article.urlToImage,
    // }));
    // res.json(response.data.articles.url)
    // Send the formatted news data as JSON
      // res.json(response.data.articles)
      let data={
       img:response.data.articles[2].urlToImage,
        title:response.data.articles[2].title,
        description:response.data.articles[2].description,
        time:response.data.articles[2].publishedAt,
        author:response.data.articles[2].author
      }
      res.render('home',{data: data})
      
   
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/technology',async(req,res)=>{
  try{
  const apiUrl = `https://newsapi.org/v2/top-headlines?category=technology&country=in&apiKey=${apiKey}`
  const response = await axios.get(apiUrl)
  res.json(response.data.articles)
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
  res.json(response.data.articles)
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
  res.json(response.data.articles)
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
  res.json(response.data.articles)
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
  res.json(response.data.articles)
  }
  catch(error){
    console.error('Error fetching news:', error.message);
    res.status(500).send('Internal Server Error');
  }

})
app.post('/search',(req,res)=>{
  console.log(req.body)
})
app.get('/search',async(req,res)=>{

  try{
    const apiUrl = `https://newsapi.org/v2/everything?q=${searched}&country=in&apiKey=${apiKey}`
    const response = await axios.get(apiUrl)
    res.json(response.data.articles)
  }
  catch(error){
    console.error('Error fetching news:', error.message);
    res.status(500).send('Internal Server Error');
  }
})
app.all('*',(req,res)=>{
  res.send('Err')
})
app.listen(port,()=>{
    console.log(`Server Started at port ${port}`)
})