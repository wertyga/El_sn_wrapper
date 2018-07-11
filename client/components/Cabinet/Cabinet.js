import { connect } from 'react-redux';

import { login } from '../../actions/auth';

import inputValidation from '../../../server/common/functions/inputsValidation';

import Loading from '../common/Loading/Loading';

import './Cabinet.sass';

class Cabinet extends React.Component {
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

        const sendObj = {
            username: {
                field: this.state.username,
                require: true
            },
            password: {
                field: this.state.password,
                require: true
            }
        };

        const {isValid, errors} = inputValidation(sendObj);
        if(!isValid) {
            this.setState({ errors });
        } else {
            this.setState({ loading: true });
            this.props.login(sendObj)
                .then(user => {
                    this.setState({ loading: false });
                    this.props.history.push(`/user/${user._id}`)
                })
                .catch(err => {
                    let error =
                        (err.response.data && err.response.data.errors) ?
                            err.response.data.errors :
                            (err.response.data ? { globalError: err.response.data } : { globalError: err.message});
                    if(err.response && typeof err.response.data === 'string' && err.response.data.indexOf('ECONNREFUSED') !== -1) error = { globalError: 'Network disabled'};
                    this.setState({
                        loading: false,
                        errors: error
                    })
                })
        };
    };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
            errors: { ...this.state.errors, [e.target.name]: '', globalError: '' }
        });
    };


    render() {

        return (
            <div className="Cabinet">



                <Loading show={this.state.loading}/>

                <form onSubmit={this.onSubmit}>
                    {this.state.errors.globalError && <div className="error">{this.state.errors.globalError}</div>}
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
                    {/*<button className="btn primary" disabled={this.state.loading} onClick={() => this.props.history.push('/sign-up')}>Sign up</button>*/}
                </form>

            </div>
        );
    };
};

export default connect(null, { login })(Cabinet);