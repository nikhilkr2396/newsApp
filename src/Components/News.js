import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
    static defaultProps = {
       country : 'in',
       pageSize : 12,
       category : 'general',
       setProgress : 0
    };

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        setProgress: PropTypes.func,
    };

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    capitalizeAllLetter(string) {
        return string.toUpperCase();
    }

    constructor(props){
        super(props);
        
        this.state ={
            articles : [],
            loading : true,
            page : 1,
            totalResults : 0
        }

        document.title = `NewsCard | ${this.capitalizeFirstLetter(this.props.category)}`;
    }

    // handeling state of first page, content of first page (articles) and loading gif 
    async componentDidMount() {
        this.props.setProgress(0);

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a6538f20845644668e820952f9435acc&page=1&pageSize=${this.props.pageSize}`

        this.props.setProgress(25);

        let data = await fetch(url);

        this.props.setProgress(50);

        let parseData = await data.json();

        this.props.setProgress(75);

        this.setState({ articles : parseData.articles , 
            totalResults : parseData.totalResults,
            loading : false
        });
         
        this.props.setProgress(100);
      }

    fetchMoreData = async () =>{
        
        this.setState({page : this.state.page + 1});

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a6538f20845644668e820952f9435acc&page=${this.state.page}&pageSize=${this.props.pageSize}`

        this.setState({loading: true});

        let data = await fetch(url);
        let parseData = await data.json();

        this.setState({ 
            articles : this.state.articles.concat(parseData.articles) , 
            totalResults : parseData.totalResults,
            loading : false
        });
    }

    render() {
        return (
            <>
                <h1 className="my-3" style={{color: '#f11946', textAlign: 'center'}}> {this.props.category === "general" ? "TOP BULLETINS":`TOP ${this.capitalizeAllLetter(this.props.category)} HEADLINES`}</h1>
                                     
                {this.state.loading === 'true' ? <Spinner/> : 
                <InfiniteScroll  dataLength={this.state.articles.length}  next={this.fetchMoreData}  hasMore={this.state.articles.length !== this.state.totalResults}  loader={<Spinner />} >

                    <div className="container my-3" >
                        <div className="row">
                            {this.state.articles.map((element)=>{
                                return(
                                    <div className="col-md-3 my-3" key={element.url}>

                                        <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : element.content} imgUrl={element.urlToImage ? element.urlToImage : "https://media.istockphoto.com/photos/blank-daily-newspaper-picture-id503149471?k=20&m=503149471&s=612x612&w=0&h=vVY5HcbK_-OYJqTsNjZAHFCxil6jaQMVLaypgN_uWDk="} newsUrl={element.url} newsDate={element.publishedAt} author={element.author ? element.author : "Unknown Source"} source={element.source.name}/>

                                    </div>
                                )
                            })}
                        </div>  
                    </div>

                </InfiniteScroll>  
                }
            </>
        )
    }
}
