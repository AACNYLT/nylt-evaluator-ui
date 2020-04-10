import React from 'react';
import './css.css';

export default function ProfileComponent(props) {
return <div id="profile">
    <a onClick={props.onClose}>Close</a>
    <h2 className="profileHeader">{`${props.scout.firstName} ${props.scout.lastName}`}</h2>
    <textarea placeholder="Enter your evaluation"/>
    <br/>
    <button>Add Eval</button>
</div>
}