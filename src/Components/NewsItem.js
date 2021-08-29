import React, { Component } from 'react'

export class NewsItem extends Component {
    

    render() {
        let {title, description, imgUrl, newsUrl, newsDate, author, source} = this.props;
        let d = new Date(newsDate);
        return (
            <div>
                
                <div className="card">
                <span className="position-absolute  translate-middle badge rounded-pill" style={{color:'#ADEFD1FF', left:'88%', zIndex: 1, backgroundColor:'#101820FF',}}>  {source}  </span>
                <img src={imgUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text" style={{textAlign:'left', color:'rgb(0, 113, 255)'}}> <b> {author} </b></p> <br/>
                    <p className="card-text" style={{textAlign:'right' , color:'#858585'}}>{d.toDateString()}</p> 
                    <p className="card-text">{description}</p>
                    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-link">Read More</a>
                    
                </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
