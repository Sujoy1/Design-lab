import React from 'react'
import './index.css'
import { NavLink } from 'react-router-dom'

const Card = (props) => {
    return (
        <div className="col-md-4 col-10 mx-auto">
            <div className="card">
            <img src={props.imgsrc} className="card-img-top" alt={props.imgsrc}></img>
            <div className="card-body">
            <h5 className="card-title font-weight-bold text-dark">{props.title}</h5>
            <p className="card-text text-dark">{props.content}</p>
            <NavLink to="" className="btn btn-primary" style={{marginRight : 100 }}>Check Details</NavLink>
            <NavLink to="" className="btn btn-primary" >Register Now</NavLink>
            </div>
            </div>
        </div>
    )
}

export default Card