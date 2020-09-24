import React, {useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom";
import axios from 'axios'
import { connect } from 'react-redux'
import Button from "reactstrap/es/Button";

function StoriesCollection(props) {
    const [stories, setStories] = useState(null)
    const [loading, setLoading] = useState(true)
    // const [loginCount, setLoginCount] = useState(0)

    useEffect(() => {
        async function getStories() {
            console.log(props.user, typeof (props.user))
            const response = await axios.get('/api/items')
            console.log(response.data)
            setStories([...response.data])
            setLoading(false)
            // setLoginCount(1)

        }
        setLoading(true)
        getStories()
        // console.log(props.user)
    }, [props.user])

    if (loading) {
        // console.log(Object.keys(props.user).length)
        // if (Object.keys(props.user).length === 0 && loginCount > 0) {
        //     return <Redirect push={true} to={'/'} />
        // }
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
                                            <Button outline={true}>Add to cart</Button>
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
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {dispatch({ type: 'REMOVE_USER' })}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(StoriesCollection)