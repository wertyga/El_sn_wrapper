import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

import FlipMove from 'react-flip-move';
import classnames from 'classnames';

import login_screen from '../../screenshots/login_screen.jpg';
import settings_screen from '../../screenshots/settings_screen.jpg';
import main_screen from '../../screenshots/main_screen.jpg';
import whales_screen from '../../screenshots/whales_screen.jpg';
import power_screen from '../../screenshots/power_screen.jpg';

import './Content.sass';

export default class Content extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            content: '',
            count: 0,
            totalPages: 4,
            imageModal: false,
            image: '',
            imageModalStyle: {}
        };
    };

    componentDidMount() {
        document.getElementsByClassName('bg')[0].classList.add('root');
    };

    componentWillUnmount() {
        document.getElementsByClassName('bg')[0].classList.remove('root');
    };

    componentDidUpdate(prevProps, prevState) {
        if(this.state.imageModal !== prevState.imageModal) {
            document.body.style.overflowY = this.state.imageModal ? 'hidden' : 'initial';
            // this.modalImageSizes();
        };
    };

    modalImageSizes = () => {
        if(this.modalImage) {
            this.setState({
                imageModalStyle: this.modalImage.offsetWidth > this.modalImage.offsetHeight ? { height: '100%' } : { width: '100%' }
            });
        };
    };

    pagination = () => {
        let nextPage = this.state.count + 1;
        if(nextPage > this.state.totalPages - 1) {
            nextPage = 0;
        };

        this.setState({ count: nextPage });
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
    };

    zoomImage = (e) => {
        const image = e.target.getAttribute('src');
        if(!this.state.imageModal) {
            this.setState({ imageModal: true, image });
        } else {
            this.setState({ imageModal: false, image: '' });
        };

    };

    render() {

        const description = (
            <div className="description">
                <h2>Description</h2>
                <div className="content">
                    <div>
                        <p>This application created for trading cryptocurrency in relation to Bitcoin and dedication for <a href="https://www.binance.com/">Binance.com</a> stock exchage.</p>
                        <p>You can to assign sign price for certain cryptocurrency and if it reached this aim you  will be informed at once with
                            notification application itself or by emailing.
                        </p>
                        <br/>
                        <p>In this way you no need always track for price moving and risk your money.</p>
                        <p>In additionally you can cover all market with your entering points without the need to put buy order.</p>
                        <p>Besides the application provides information about buy/sell orders with big amount of deal that can helps you, if need, do some adjust your enter or exit point,
                            or focus and follow on some of them.
                        </p>
                        <br/>
                        {/*<p>For users with extention account(till every new user will receive it) will be available opportunity to get information*/}
                            {/*about abruptly go down or grow up of currency.*/}
                        {/*</p>*/}
                        <div className="final"><span>Yours:</span>   Crypto_signer team</div>
                    </div>
                </div>
            </div>
        );
        const screenshots = (
            <div className="screenshots">
                <h2>Screens overview</h2>
                <div className="content">
                    <div className="screen_wrapper">
                        <div className="img_wrapper" onClick={this.zoomImage}>
                            <img src={login_screen} alt="login"/>
                        </div>
                        <div className="desc">
                            <h4>Login screen</h4>
                            <p>Login screen dedicated to login or registrate new application user</p>
                        </div>

                    </div>
                    <div className="screen_wrapper">
                        <div className="img_wrapper" onClick={this.zoomImage}>
                            <img src={main_screen} alt="main_screen"/>
                        </div>
                        <div className="desc">
                            <h4>Main screen</h4>
                            <p>Main screen where you can set your sign price to follow certain pair coin</p>
                        </div>
                    </div>
                    <div className="screen_wrapper">
                        <div className="img_wrapper" onClick={this.zoomImage}>
                            <img src={whales_screen} alt="whales"/>
                        </div>
                        <div className="desc">
                            <h4>Whales orders screen</h4>
                            <p>Screen with orders with big buy/sell orders helps you to see "wall" level for any coin</p>
                        </div>
                    </div>
                    <div className="screen_wrapper">
                        <div className="img_wrapper" onClick={this.zoomImage}>
                            <img src={power_screen} alt="power_screen"/>
                        </div>
                        <div className="desc">
                            <h4>Power screen</h4>
                            <p>Power screen shows you coins that had very big price down of fast grow up</p>
                            <br/>
                            <p>Big price down: in 1 hour price down more then 8%</p>
                            <p>Fast grow up: in very short period of time price grow up 2% and more</p>
                        </div>
                    </div>
                    <div className="screen_wrapper">
                        <div className="img_wrapper" onClick={this.zoomImage}>
                            <img src={settings_screen} alt="settings_screen"/>
                        </div>
                        <div className="desc">
                            <h4>Settings screen</h4>
                            <p>In settings screen you may see and modify your account data</p>
                        </div>
                    </div>
                    <div className="screen_wrapper">
                        <div className="img_wrapper" onClick={this.zoomImage}>
                            <img src={settings_screen} alt="settings_screen"/>
                        </div>
                        <div className="desc">
                            <h4>Signup screen</h4>
                            <p>Here you can fill the form for registration new user</p>
                        </div>
                    </div>
                </div>
            </div>
        );
        const extention_account = (
            <div className="extention">
                <h2>Extention account</h2>
                <div className="content">
                    <p>
                        For users with extention account (till every new user will receive it) will be
                        available opportunity to get information about abruptly go down or grow up of currency.
                    </p>
                </div>
            </div>
        );
        const donate = (
            <div className="extention">
                <h2>Support project</h2>
                <div className="content">
                    <p>This project created by enthusiast team, that believe in future of free economy.</p>
                    <p>If you have found a bug or want make proposal to improve project send request from "Request" tab.</p>
                    <br/>
                    <p>For donate please visit <Link to="/donate">This page</Link></p>
                </div>
            </div>
        );

        return (
            <div className="Content">

                {this.state.imageModal &&
                    ReactDOM.createPortal(
                            <div className="image_modal" onClick={this.zoomImage}>
                                <div className="img_wrapper">
                                    <img ref={node => this.modalImage = node} src={this.state.image} alt="modal_image" style={this.state.imageModalStyle}/>
                                </div>
                            </div>,
                        document.getElementById('app')
                    )
                }

                <FlipMove enterAnimation="fade" leaveAnimation="none">
                    {this.state.count === 0 && description}
                    {this.state.count === 1 && screenshots}
                    {this.state.count === 2 && extention_account}
                    {this.state.count === 3 && donate}
                </FlipMove>

                <div className={classnames({ switch_mark: true, last: this.state.count === this.state.totalPages - 1})}
                     onClick={this.pagination}>
                    <div className="angle"></div>
                </div>
            </div>
        );
    };
};