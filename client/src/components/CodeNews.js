import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
    // Container,
    // Col,
    // Row,
} from 'react-bootstrap';

const CodeNews = () => {

    const [articles, setArticles] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/apiKey')
        .then((res)=>{
            // console.log(res)
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
                <div className="order-sm-1 mb-4 col-10 col-sm-2 mt-2 justifiy-content-start offset-1 border mr-5 p-3" style={{display:"inline-block", color:"green"}}>
                            <h3 style={{color:"black"}}>Recent News</h3>
                            {articles.map((article, idx)=>(
                                <div key={idx} className="mb-3">
                            <a href={article.url} style={{color:"green"}} target="_blank" rel="noreferrer">{article.title}</a>
                            </div>
                        ))}
                </div>
    )
}

export default CodeNews;