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
                transform: 'translateX(100%)'
            },
            to: {
                transform: 'translate(0%)'
            }
        };
        const leave = {
            from: {
                transform: 'translateX(0%, -50%)'
            },
            to: {
                transform: 'translateX(-100%)'
            }
        };

        return (
            <Transition show={this.props.show} enter={enter} leave={leave}
                        style={{ position: 'fixed', top: 0, left: 0, minHeight: '100vh', width: '100%' }}>
                <div className={classnames({ Loading: true })}>

                    <div className="eye_egg">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>

                    <div className="name">
                        <p>Loading...</p>
                    </div>

                </div>
            </Transition>
        );
    };
};