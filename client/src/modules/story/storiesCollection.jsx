import React, {useEffect, useState} from "react";
// import {Link, Redirect} from "react-router-dom";
import axios from 'axios'
import { connect } from 'react-redux'
import Button from "reactstrap/es/Button";

function StoriesCollection(props) {
    const [stories, setStories] = useState(null)
    const [loading, setLoading] = useState(true)

    // this code snippet has been used from stackoverflow to get count of each story id
    function getCountOfEachId(arr) {
        let counts = {};
        arr.forEach(function(x) {
            counts[x] = (counts[x] || 0)+1;
        });
        return counts
    }

    useEffect(() => {
        async function getStories() {
            const response = await axios.get('/api/items')

            const idCounts = await getCountOfEachId(props.items)

            response.data.forEach(story => {
              story.count = idCounts[`${story._id}`]
            })

            setStories([...response.data])
            props.setStories([...response.data])
            setLoading(false)
        }
        setLoading(true)
        getStories()
    }, [props.items])

    const addItemToCart = (itemId) => {
        // console.log(itemId)
        props.addItemToCheckout(itemId)
    }

    if (loading) {
        return (
            <div className="list_story_header fixed-top">
                <h1 className={'homelink'}>Loading your Stories...</h1>
            </div>
        )
    }
    return (

        <div className="container col-lg-9 col-sm-12">
            <div className="list_story_header fixed-top">
                <h1 className="logo">Add Stories to your cart from here...</h1>
            </div>
            <div className="row row-cols-1 row-cols-md-1">
                {
                    (stories !== null) ?
                        stories.map((story, index) =>{
                            return (
                                <div key={story._id} className="col mb-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title">{story.name}</h4>
                                            <div className="text">{story.desc}</div>
                                            {/*<div className={'card-link'}><Link to={`/story/${story.id}`} >Read more...</Link></div>*/}
                                        </div>
                                        <div className="card-footer">
                                            <div className={'card-link'}>Price: &#8377;{story.price}</div>
                                            <Button onClick={() => addItemToCart(story._id)} outline={true}>Add to cart</Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        : (
                            <div className="col mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">No Stories to show...</h4>
                                    </div>
                                </div>
                            </div>
                        )
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        items: state.items
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCheckout: (itemId) => {dispatch({ type: 'ADD_ITEM', itemId })},
        setStories: (stories) => {dispatch({type: 'SET_STORIES', stories})}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(StoriesCollection)