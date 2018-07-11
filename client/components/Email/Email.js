import axios from 'axios';

import Loading from '../common/Loading/Loading';

import './Email.sass';

export default class Email extends React.Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            errors: ''
        };
    };

    componentDidMount() {
        this.setState({ loading: true });
        axios.post('/fetch/unsubscribe', {
            userID: this.props.match.params.userID,
            emailToken: this.props.match.params.emailToken
        })
            .then(() => {
                this.setState({ loading: false });
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    errors: setError(err)
                });
            })
    };

    render() {
        return (
            <div className="Email">
                <Loading show={this.state.loading}/>
                <h2>Email subscribing</h2>
                {this.state.errors && !this.state.loading && <div className="error">{this.state.errors}</div>}
                {!this.state.errors && !this.state.loading &&
                    <div className="content">
                        <p>You have been unsubscribe from any email sending</p>
                        <p>To enable it - visit to your application account to setting tab</p>
                    </div>
                }
            </div>
        );
    };
};