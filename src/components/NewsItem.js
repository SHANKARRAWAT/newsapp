import React, { Component } from 'react'


export default class NewsItem extends Component {
  
  render() {
   let{title,description,imageUrl,newsUrl,author,date,source}=this.props;
    return (
      <div>
              <div className="card" style={{width:"18rem"}}>
           
              <img src={!imageUrl?"https://ichef.bbci.co.uk/news/1024/branded_news/AC61/production/_130292144_fbe4ad7c51395427015c82b71ed5ea3a9df7c29b0_0_4000_22511000x563.jpg":imageUrl} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">{title}...  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                {source}
                </span></h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-body-secondary">By: {!author?"Unknown":author}  Date:{new Date(date).toGMTString()}</small></p>
                <a href={newsUrl}  target="=_blank"  className="btn  btn-sm btn-dark">Read more</a>
              </div>
            </div>
      </div>
    )
  }
}
