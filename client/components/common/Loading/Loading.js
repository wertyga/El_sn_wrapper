import classnames from 'classnames';

import Transition from '../Transition/Transition';

import './Loading.sass';

export default class loading extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {

        return (
            <Transition show={this.props.show}
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