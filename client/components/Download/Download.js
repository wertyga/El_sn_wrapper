import axios from 'axios';

import linux_icon from '../../../icons/linux.png';
import windows_icon from '../../../icons/windows.png';
import mac_icon from '../../../icons/mac.png';

import './Download.sass';

export default class Download extends React.Component {
    constructor() {
        super();

        this.state = {
            errors: ''
        };
    };

    componentDidMount() {
        this.moveBg();
        window.addEventListener('resize', this.moveBg);
    };

    componentWillUnmount() {
        document.getElementsByClassName('bg')[0].classList.remove('root');
        window.removeEventListener('resize', this.moveBg);
    };

    moveBg = () => { // Cover or not bg class all window
        if(window.innerWidth <= 450) {
            document.getElementsByClassName('bg')[0].classList.add('root');
        } else {
            document.getElementsByClassName('bg')[0].classList.remove('root');
        };
    };

    download = (e) => {
        e.preventDefault();

        const sys = e.currentTarget.getAttribute('data-download');

        const fileName = `crypto_signer-${e.currentTarget.getAttribute('data-download')}-x64.zip`;
        window.open(`/downloads/${sys}`)
    };

    render() {
        return (
            <div className="Download">

                {this.state.errors && <div className="error">{this.state.errors}</div>}

                <h2>Download</h2>

                    <div className="content">
                        <div className="item" data-download="linux" onClick={this.download}>
                            <div className="image">
                                <img src={linux_icon} alt="linux download"/>
                            </div>
                            <p>Linux x64 ZIP package</p>
                        </div>
                        <div className="item" data-download="win32" onClick={this.download}>
                            <div className="image">
                                <img src={windows_icon} alt="win32 download"/>
                            </div>
                            <p>Windows x64 ZIP package</p>
                        </div>
                        <div className="item" data-download="darwin" onClick={this.download}>
                            <div className="image">
                                <img src={mac_icon} alt="darwin download"/>
                            </div>
                            <p>MacOS x64 ZIP package</p>
                        </div>
                    </div>

            </div>
        );
    };
};