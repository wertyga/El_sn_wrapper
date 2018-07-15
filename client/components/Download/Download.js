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

        // window.open(`/downloads/${sys}`);
        // return axios.get(`/downloads/${sys}`)
        //     .catch(err => {
        //         this.setState({ errors: err.response ? err.response.data.errors : err.message })
        //     })

        axios({
            url: `/downloads/${sys}`,
            method: 'GET',
            responseType: 'blob', // important
        }).then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Crypto_signer-${sys}-x64.zip`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    };

    render() {
        return (
            <div className="Download">

                {this.state.errors && <div className="error">{this.state.errors}</div>}

                <h2>Download</h2>

                    <div className="content">
                        <a className="item" href="../../../downloads/crypto_signer-linux-x64.zip" data-download="linux" download>
                            <div className="image">
                                <img src={linux_icon} alt="linux download"/>
                            </div>
                            <p>Linux x64 ZIP package</p>
                        </a>
                        <a className="item" href="../../../downloads/crypto_signer-win32-x64.zip" data-download="win32" download>
                            <div className="image">
                                <img src={windows_icon} alt="linux download"/>
                            </div>
                            <p>Windows x64 ZIP package</p>
                        </a>
                        <a className="item" href="../../../downloads/crypto_signer-darwin-x64.zip" data-download="darwin" download>
                            <div className="image">
                                <img src={mac_icon} alt="linux download"/>
                            </div>
                            <p>MacOS x64 ZIP package</p>
                        </a>
                    </div>

            </div>
        );
    };
};