import './Credentials.sass';

export default class Credentials extends React.Component {
    render() {
        return (
            <div className="Credentials">
                <p>
                    <span>This application created by</span>
                    <span><strong>©</strong><strong>WE.Technologies</strong></span>
                </p>
                <p>
                    <span>Contact information:</span>
                    <span>E-mail: <strong>cryptosigner.we@gmail.com</strong></span>
                </p>
            </div>
        );
    };
};