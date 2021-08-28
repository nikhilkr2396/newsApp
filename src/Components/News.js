import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export default class News extends Component {
    static defaultProps = {
       country : 'in',
       pageSize : 12,
       category : 'science'
    };

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    };

    constructor(){
        super();
        
        this.state ={
            articles : [],
            loading : false,
            page : 1
        }
    }

    // handeling state of first page, content of first page (articles) and loading gif 
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3c1a16e89e5b422b892acd58fe19e001&page=1&pageSize=${this.props.pageSize}`

        this.setState({loading: true});

        let data = await fetch(url);
        let parseData = await data.json();

        this.setState({ articles : parseData.articles , 
            totalResults : parseData.totalResults,
            loading : false
        });
         
      }

    // handeling state of previous page, content of previous page (articles) and loading gif
    handlePreviousClick = async () => {
        
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3c1a16e89e5b422b892acd58fe19e001&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`

        this.setState({loading: true});
        
        let data = await fetch(url);
        let parseData = await data.json();

        this.setState({ 
            articles : parseData.articles ,
            page : this.state.page - 1,
            loading : false
        });
    }  

    // handeling state of next page, content of next page (articles) and loading gif
    handleNextClick = async () => {
       if(this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)){
           
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3c1a16e89e5b422b892acd58fe19e001&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`

            this.setState({loading: true});

            let data = await fetch(url);
            let parseData = await data.json();

            this.setState({ 
                articles : parseData.articles ,
                page : this.state.page + 1,
                loading : false
            });
       }    
      

    }


    render() {
        return (
            <div className="container my-3" style={{textAlign: 'center'}}>
                
                <h1 style={{color: '#0071FF'}}>TOP BULLETIN</h1>

                <div className="container d-flex justify-content-between"> 
                    <button disabled={this.state.page <= 1} onClick={this.handlePreviousClick} className="btn btn-default" style={{fontSize:'40px'}} > &laquo; </button>   
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick} className="btn btn-default" style={{fontSize:'40px'}} > &raquo; </button>     
                </div>
                        
                
                {/* if loading is true then we need to show the spinner gif else we have to show the articles */}
                {this.state.loading === true ? <Spinner /> : 
                   
                    <div className="row">
                        {this.state.articles.map((element)=>{
                            return(
                                <div className="col-md-3 my-3" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.urlToImage? element.urlToImage : "https://www.pewtrusts.org/-/media/post-launch-images/2020/09/sln_sept8_1/16x9_m.jpg?h=1024&w=1820&la=en&hash=7923EE14DBA15FFEABF4A3757E18E3D6"} newsUrl={element.url}/>
                                </div>
                            )
                        })}
                    </div>
                   
                }
                
                <div className="container d-flex justify-content-around"> 
                    <button disabled={this.state.page <= 1} onClick={this.handlePreviousClick} className="btn btn-primary" > &laquo; Previous </button>  
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick} className="btn btn-primary" > Next &raquo; </button>     
                </div>
                           
            </div>
        )
    }
}
