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
            <Transition show={this.props.show} enter={enter} leave={leave} timeout={1000}
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