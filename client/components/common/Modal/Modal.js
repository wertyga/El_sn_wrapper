import Transition from '../Transition/Transition';

import './Modal.sass';

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {

        const enterModal = {
            from: { opacity: 0, transform: 'translate(-50%, -150%)'},
            to: { opacity: 1, transform: 'translate(-50%, -100%)'},
        };
        const leaveModal = {
            from: enterModal.from,
            to: enterModal.from
        };

        return (
            <Transition
                show={this.props.showModal}
                enter={enterModal}
                leave={leaveModal}
            >
                <div className="Modal">
                    {this.props.children}
                </div>
            </Transition>
        );
    };
};