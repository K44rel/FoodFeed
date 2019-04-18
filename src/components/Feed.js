import React, { Component } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

const SEARCH_PATH_BASE = "https://www.food2fork.com/api/search?key=47392cbd53afdcf2d2e54ef60fc47db6&sort=t";
const RECIPE_PATH_BASE = "https://www.food2fork.com/api/get";

const Article = ({data}) => {
  return (
    <a className="recipe" href={data.source_url} target="_blank">
      <img className="recipe__image" src={data.image_url} alt={data.title}/>
      <div className="recipe__title">{data.title}</div>
      <div className="recipe__source">From: {data.publisher}</div>
    </a>   
  )    
}

class Feed extends Component {
  constructor(props){
    super(props);
    this.state = {
      recipes: [],
    };
    this.getRecipes = this.getRecipes.bind(this);
    this.getRecipes(1);
  }
  
  getRecipes(page) {
    axios.get(`${SEARCH_PATH_BASE}page=${page}`)
        .then(response => {
          this.setState({recipes: response.data.recipes});
        })
        .catch(error => console.log(error));
  }

  render(){
    return (
      <div className="feed">
        {this.state.recipes !== undefined 
          ? this.state.recipes.map((recipe, index) => (
            <Article key={index} data={recipe} />
          )) 
          :
          <div>limit reached</div>
          }
      </div>
      )
      {/* <InfiniteScroll
        pageStart={0}
        loadMore={this.getRecipes}
        hasMore={true}
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
        {
          <div className="feed">
            {this.state.recipes !== undefined 
            ? this.state.recipes.map((recipe, index) => (
              <Article key={index} data={recipe} />
            )) 
            :
            <div>limit reached</div>
            }
          </div>
        }
      </InfiniteScroll> */}    
  }
}

export default Feed;