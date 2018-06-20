import { connect } from 'react-redux';

import { request } from '../../actions/fetch';

import validateInput from '../../../server/common/inputsValidation';

import './Request.sass';

class Request extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            message: '',
            wasSend: false,
            loading: false,
            errors: {}
        };
    };

    onSubmit = e => {
        e.preventDefault();

        const checkObj = { email: { field: this.state.email, require: true }, message: { field: this.state.message, require: true } };
        const { errors, isValid } = validateInput(checkObj);
        if(!isValid) {
            this.setState({ errors });
        } else {
            this.setState({ loading: true });
            this.props.request(checkObj)
                .then(res => {
                    this.setState({ loading: false });
                })
                .catch(err => this.setState({
                    errors: setError(err),
                    loading: false
                }))
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
            <div className="Request">
                <h2>Send request</h2>

                <form onSubmit={this.onSubmit} className="content">
                    {this.state.errors.globalError && <div className="error">{this.state.errors.globalError}</div>}


                    <label htmlFor="email_request"><strong>E-mail:</strong></label>
                    <input type="text"
                           name="email"
                           value={this.state.email}
                           onChange={this.onChange}
                           id="email_request"
                    />
                    {this.state.errors.email && <div className="error">{this.state.errors.email}</div>}

                    <label htmlFor="message_request"><strong>Type your request here:</strong></label>
                    <textarea
                        name="message"
                        value={this.state.message}
                        onChange={this.onChange}
                        id="message_request"
                    />
                    {this.state.errors.message && <div className="error">{this.state.errors.message}</div>}

                    <button className="btn primary" type="submit" disabled={this.state.loading}>Send request</button>
                </form>
            </div>
        );
    };
};

export default connect(null, { request })(Request);