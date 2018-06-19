import { Link } from 'react-router-dom';
import FlipMove from 'react-flip-move';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import Loading from '../common/Loading/Loading';

import './Cabinet.sass';

export default class Cabinet extends React.Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            loading: false,
            errors: {}
        };
    };

    onSubmit = e => {
        e.preventDefault();
        this.setState({ loading: !this.state.loading });
        setTimeout(() => this.setState({ loading: !this.state.loading }), 1000)
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    };


    render() {

        return (
            <div className="Cabinet">

                <Loading show={this.state.loading}/>

                <form onSubmit={this.onSubmit}>
                    <input type="text"
                           name="username"
                           onChange={this.onChange}
                           value={this.state.username} disabled={this.state.loading}
                    />
                    {this.state.errors.username && <div className="error">{this.state.errors.username}</div>}

                    <input type="password"
                           name="password"
                           onChange={this.onChange}
                           value={this.state.password} disabled={this.state.loading}
                    />
                    {this.state.errors.password && <div className="error">{this.state.errors.password}</div>}

                    <button className="btn primary" disabled={this.state.loading} type="submit">Log in</button>
                    <button className="btn primary" disabled={this.state.loading} onClick={() => this.props.history.push('/sign-up')}>Sign up</button>
                </form>

            </div>
        );
    };
};