import axios from 'axios';
import { connect } from 'react-redux';

import Loading from '../common/Loading/Loading';
import Modal from '../common/Modal/Modal';

import './Donate.sass';

class Donate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            showModal: false,
            loading: false,
            errors: this.props.globalErrors || ''
        };
    };

    componentDidMount() {
        if(this.props.match.path === '/donate/success/:fiatDonate' && !this.state.errors) {
            setTimeout(() =>  this.setState({ showModal: true }), 300)
        };
    };

    componentDidUpdate(prevProps) {
        if(this.props.globalErrors !== prevProps.globalErrors) {
            this.setState({
                errors: this.props.globalErrors
            });
        };
    };

    onChange = (e) => {
        if(isNaN(e.target.value)) return;
        this.setState({
            value: e.target.value,
            errors: ''
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        if(!this.state.value) {
            this.setState({ errors: 'Donate something' })
        } else {
            this.setState({ loading: true });
            axios.post('/donate', { fiatDonate: this.state.value })
                .then((res) => {
                   window.location.href = res.data;
                })
                .catch(err => {
                    this.setState({
                        loading: false,
                        errors: err.response ? err.response.data.errors : err.message
                    });
                })
        }
    };

    render() {

        const modal = (
            <div className="modal">
                <p>Your donate have been received!</p>
                <p>We'll do the best we can!</p>
                <button className="btn primary" onClick={() => this.setState({ showModal: false })}>O.K.</button>
            </div>
        );

        return (
            <div className="Donate">
                {this.state.errors && <div className="error">{this.state.errors || this.props.globalErrors}</div>}
                <Loading show={this.state.loading}/>

                    <Modal
                        showModal={this.state.showModal}
                    >
                        <p>Your donate have been received!</p>
                        <p>We'll do the best we can!</p>
                        <button className="btn primary" onClick={() => this.setState({ showModal: false })}>O.K.</button>
                    </Modal>

                <div className="btc_donate">
                    <h4>Support project by Cryptocurrency:</h4>
                    <p>BTC wallet: <span> 18ikPNYocCZxkpUGdubhHuF9wuE4w4tpyt</span></p>
                </div>
                <div className="fiat_donate">
                    <h4>Support project by fiat with PayPal:</h4>
                    <form onSubmit={this.onSubmit}>
                        <h5>Amount donate:</h5>
                        <input type="text"
                               value={this.state.value}
                               onChange={this.onChange}
                        />
                        <span> .$</span>
                        <button className="btn primary" disabled={this.state.loading}>Donate</button>
                    </form>
                </div>
            </div>
        );
    };
};

const mapState = state => {
    return {
        globalErrors: state.globalErrors,
        payment: state.payment
    }
};

export default connect(mapState)(Donate);