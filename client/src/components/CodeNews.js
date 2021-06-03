import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Dashboard from '../views/Dashboard'
import {
    Container,
    Col,
    Row,
} from 'react-bootstrap';

const CodeNews = () => {

    const [articles, setArticles] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/apiKey')
        .then((res)=>{
            console.log(res)
            let tempArr = [];
            for(let i=0;i < 3; i++){
                tempArr.push({
                    title: res.data.articles[i].title,
                    url: res.data.articles[i].url
                })
            }
            setArticles(tempArr);
        })
        .catch((err)=>console.log(err))
    },[])

    return(
        <div className="col-2 row-5 mr-5" style={{display:"inline-block", color:"green"}}>
                    <h3 style={{color:"black"}}>Recent News</h3>
                    {articles.map((article, idx)=>(
                        <div>
                    <a href={article.url} key={idx} style={{color:"green"}} target="_blank" rel="noreferrer">{article.title}</a>
                    </div>
                ))}
        </div>
    )
}

export default CodeNews;