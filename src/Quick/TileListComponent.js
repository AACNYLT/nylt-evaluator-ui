import React from 'react';
import TileComponent from './TileComponent';
import Api from '../Utils/Api';
import './css.css';

export default class TileListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {scouts: []};
        this.componentize = this.componentize.bind(this);
    }

    componentDidMount() {
        Api.GetScouts().then(result => {
            this.setState({
                scouts: result
            });
        });
    }

    componentize() {
        return this.state.scouts.map(scout => {
            return <li onClick={() => {this.props.launchProfile(scout)}} key={scout.id}><TileComponent scout={scout}/></li>
        });
    }

    render() {
        return (
            <ul>
                {this.componentize()}
            </ul>
        )
    }
}