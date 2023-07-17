import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
export default class News extends Component {
   

    capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  constructor(props){
    super(props);
    console.log("this is news constructor")
    this.state={
      articles:[],
      loading:false,
      page:1,
      totalResults:0
    }
    document.title=this.capitalizeFirstLetter(this.props.category)+"-NewsMonkey";
  }

   async componentDidMount(){
    // console.log("component dit mount")
    // console.log(this.state.page);
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=18df67f6ec6c4d399989051100842f1d&page=1&pageSize=${this.props.pageSize}`
    // this.setState({
    //   loading:true
    //  })
    // let data=await fetch(url);// it returns the promise fetch
    // let parsedata=await data.json();
    // console.log(parsedata);
    // this.setState({articles:parsedata.articles,
    //   totalResults:parsedata.totalResults,
    //   loading:false
    // });
    
    this.updateNems();
 
  }

   async updateNems(){
    this.props.setProgress(10);
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=18df67f6ec6c4d399989051100842f1d&page=${this.state.page}&pageSize=${this.props.pageSize}`


    this.setState({
      loading:true
     })
    this.setState({
      loading:true
    })
    let data=await fetch(url);// it returns the promise fetch
    this.props.setProgress(50);
    let parsedata=await data.json();

    this.setState({
        articles:parsedata.articles,
        loading:false,
        page:this.state.page+1
    })
    this.props.setProgress(100);
   }
   handlePrevious=async()=>{
    console.log("handle  previous");
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=18df67f6ec6c4d399989051100842f1d&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
    // this.setState({
    //   loading:true
    //  })

    // let data=await fetch(url);// it returns the promise fetch
    // let parsedata=await data.json();
    // this.setState({
    //     page:this.state.page-1,
    //     articles:parsedata.articles,
    //     loading:false
    // })
   

     this.setState({
      page:this.state.page-1
    },()=>this.updateNems())
    
  }


  handleNext=async()=>{
    console.log("handle next is call ");
   
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=18df67f6ec6c4d399989051100842f1d&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    //  this.setState({
    //   loading:true
    //  })
    // let data=await fetch(url);// it returns the promise fetch
    // let parsedata=await data.json();

    // this.setState({
    //      page:this.state.page+1,
    //      articles:parsedata.articles,
    //      loading:false
    // })
    
    this.setState({
      page:this.state.page+1
    },()=>this.updateNems())

  }
  


  fetchMoreData = async () => {

    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=18df67f6ec6c4d399989051100842f1d&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({
      loading:true
     })

    let data=await fetch(url);// it returns the promise fetch
    let parsedata=await data.json();
    console.log(parsedata);

    this.setState({articles:this.state.articles.concat(parsedata.articles),
      totalResults:parsedata.totalResults,
      loading:false,
      page:this.state.page+1
    });
  }

  render() {
    return (
     
         <div className="container ">

              <h1 className="text-center conatiner " style={{marginTop:68}}>NewsMonkey -Top {this.capitalizeFirstLetter(this.props.category)} headlines </h1>
              {/* {this.state.loading && <Spinner/>} */}
              <InfiniteScroll
              dataLength={this.state.articles.length}
              next={this.fetchMoreData}
              hasMore={this.state.articles.length!==this.state.totalResults}
              loader={ <Spinner/> }
              >
              <div className="row my-4">
                  {/* arrays traversal this.sate=> represents current class declared state .articles =>articles are drawn form object state  .map is a method */}
                     {this.state.articles.map((element)=>{
                      return <div className="col-md-4"  key= {element.url} >
                      <NewsItem title={element.title==null?"":element.title.slice(0,71)} description={element.description==null?"":element.description.slice(0,88)} imageUrl={element.urlToImage} newsUrl={element.url}  author={element.author} date={element.publishedAt} source={element.source.name} />
                      </div>

                     })}
                  </div>
            </InfiniteScroll>


                 {/* <div className="d-flex justify-content-between">
                 {/* <button disabled={this.state.page<=1}  type="button" onClick={this.handlePrevious} className="btn btn-dark">&laquo; previous</button>
                 <button type="button" disabled={this.state.page+1>Math.ceil(this.state.totalResults/ this.props.pageSize)}   onClick={this.handleNext} className="btn btn-dark">next &raquo;</button> */}
                 {/* </div> */} 
         
     </div>
    )
  }
}


