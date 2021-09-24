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
                <div className="justifiy-content-start offset-1 mr-5 border border-dark p-3 col-xs-0 col-md-8" style={{display:"inline-block", color:"green"}}>
                            <h3 style={{color:"black"}}>Recent News</h3>
                            {articles.map((article, idx)=>(
                                <div>
                            <a className="mb-5" href={article.url} key={idx} style={{color:"green"}} target="_blank" rel="noreferrer">{article.title}</a>
                            </div>
                        ))}
                </div>
    )
}

export default CodeNews;