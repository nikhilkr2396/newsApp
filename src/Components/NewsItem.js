import React, { Component } from 'react'

export class NewsItem extends Component {
    

    render() {
        let {title, description, imgUrl, newsUrl, newsDate, author, source} = this.props;
        let d = new Date(newsDate);
        return (
            <div>
                
                <div className="card">
                <span className="badge rounded-pill" style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute',backgroundColor:'#cf352e', left: '0'}}>  {source}  </span>
                <a href={newsUrl} target="_blank" rel="noreferrer" > <img src={imgUrl} className="card-img-top"/> </a>
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
