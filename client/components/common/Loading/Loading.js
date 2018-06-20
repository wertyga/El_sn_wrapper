import classnames from 'classnames';

import Transition from '../Transition/Transition';

import './Loading.sass';

export default class loading extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {

        const enter = {
            from: {
                transform: 'translate(50%, -50%)'
            },
            to: {
                transform: 'translateX(0%)'
            }
        };
        const leave = {
            from: {
                transform: 'translate(0%, -50%)'
            },
            to: {
                transform: 'translate(-100%, 0%)'
            }
        };

        return (
                <div className={classnames({ Loading: true, show: this.props.show })}>

                    <div className="eye_egg">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>

                    <div className="name">
                        <p>Loading...</p>
                    </div>

                </div>
        );
    };
};