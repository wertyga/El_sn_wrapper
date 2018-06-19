import classnames from 'classnames';

import './Loading.sass';

export default class loading extends React.Component {
    render() {
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