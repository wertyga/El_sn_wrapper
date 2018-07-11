import { connect } from 'react-redux';

import isEmpty from 'lodash/isEmpty';

import './UserPage.sass';

class UserPage extends React.Component {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        if(isEmpty(this.props.user) || this.props.user._id !== this.props.match.params.id) this.props.history.push('/cabinet');
    };

    render() {
        return (
            <div className="UserPage">
                <div><strong>Username: </strong><span>{this.props.user.username}</span></div>
                <div><strong>E-mail: </strong><span>{this.props.user.email}</span></div>
                <div><strong>Is extention account: </strong><span>{this.props.user.isCool ? 'Yes' : 'No'}</span></div>
            </div>
        );
    };
};

const mapState = state => ({
    user: state.user
});

export default connect(mapState)(UserPage);