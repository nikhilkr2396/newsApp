import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
    
    constructor(){
        super();
        
        this.state ={
            articles : [],
            loading : false,
            page : 1
        }
    }

    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=3c1a16e89e5b422b892acd58fe19e001&page=1&pageSize=16"
        let data = await fetch(url);
        let parseData = await data.json();

        this.setState({ articles : parseData.articles , totalResults : parseData.totalResults });
         
      }

    handlePreviousClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=3c1a16e89e5b422b892acd58fe19e001&page=${this.state.page - 1}&pageSize=16`
        let data = await fetch(url);
        let parseData = await data.json();

        this.setState({ 
            articles : parseData.articles ,
            page : this.state.page - 1
        });
    }  

    handleNextClick = async () => {
       if(this.state.page + 1 <= Math.ceil(this.state.totalResults / 16)){
            let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=3c1a16e89e5b422b892acd58fe19e001&page=${this.state.page + 1}&pageSize=16`
            let data = await fetch(url);
            let parseData = await data.json();

            this.setState({ 
                articles : parseData.articles ,
                page : this.state.page + 1
            });
       }    
      

    }


    render() {
        return (
            <div className="container my-3">
                <h2>News Card - Top headings</h2>
                <div className="row">
                    {this.state.articles.map((element)=>{
                        return(
                            <div className="col-md-3 my-3" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.urlToImage? element.urlToImage : "https://www.pewtrusts.org/-/media/post-launch-images/2020/09/sln_sept8_1/16x9_m.jpg?h=1024&w=1820&la=en&hash=7923EE14DBA15FFEABF4A3757E18E3D6"} newsUrl={element.url}/>
                            </div>
                        )
                    })}
                </div>
               
                <nav aria-label="Page navigation example">
                    <ul className="pagination d-flex justify-content-around">
                        <li className="page-item">
                        <button disabled={this.state.page <= 1} onClick={this.handlePreviousClick} className="page-link"  aria-label="Previous">
                            <span aria-hidden="true">&laquo; Previous</span>
                        </button>
                        </li>
                        <li>
                        <button onClick={this.handleNextClick} className="page-link"  aria-label="Next">
                            <span aria-hidden="true">Next &raquo;</span>
                        </button>
                        </li>
                    </ul>
                </nav>
                                    
            </div>
        )
    }
}
