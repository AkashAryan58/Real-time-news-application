const apikey="18d1e739676d4b22a7f38af746cabfee";

const blogcontainer= document.getElementById("blog-container");
const searchField=document.getElementById("search-input");
const searchButton=document.getElementById("search-button");
async function fetchRandomNews(){
    try{
         const apiurl=`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=18d1e739676d4b22a7f38af746cabfee`
         const response= await fetch(apiurl);
         const data= await response.json();
         console.log(data);
         return data.articles;
    }
    catch(error){
        console.error("Error fetching random news",error);
        return [];
    }
}

searchButton.addEventListener("click",async () =>{
    console.log("executiing");
const query = searchField.value;
console.log(query);
if(query!=="")
{
         try{
              const article=await fetchNewsQuery(query)
              displayBlogs(article);
              console.log("executiing");
         }catch(error)
         {
            console.log("Error fetching news by query",error)
         }
}
});

async function fetchNewsQuery(query)
{
 try{
         const apiurl=`
https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=18d1e739676d4b22a7f38af746cabfee`;
         const response= await fetch(apiurl);
         const data= await response.json();
         console.log(data);
         return data.articles;
    }
    catch(error){
        console.error("Error fetching random news",error);
        return [];
    }
}

function displayBlogs(articles){
blogcontainer.innerHTML="";
articles.forEach((article) => {
    const blogCard=document.createElement("div");
    blogCard.classList.add("blog-card");
    const img= document.createElement("img");
    img.src=article.urlToImage;
    img.alt=article.title;
    const title=document.createElement("h2");
    const truncatedTitle=
    article.title.length>30?
    article.title.slice(0,30) + "....": article.title;
    title.textContent=truncatedTitle;
    const description= document.createElement("p");
    const truncatedDes = article.description.length>120?article.description.slice(0,100)+"....":
    article.description;
    description.textContent=truncatedDes;
    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener("click", ()=>{
        window.open(article.url, "_blank");
    });
    blogcontainer.appendChild(blogCard);
});
}

(async ()=>{
    console.log("hello");
    try{
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    }
    catch(error){
        console.error("error fetching random news",error);
    }
})();