import FlipMove from 'react-flip-move';
import classnames from 'classnames';

import sc1 from '../../../screenshots/1.png';
import sc2 from '../../../screenshots/2.png';
import sc3 from '../../../screenshots/3.png';
import sc4 from '../../../screenshots/4.png';
const screens = [sc1, sc2, sc3, sc4];

import './Content.sass';

const description = (
    <div className="description">
        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab culpa dolores doloribus eaque
            explicabo illum laudantium maxime minima, nobis non praesentium rem repellendus sed soluta, ullam
            vel voluptas voluptatibus. Sint.
        </div>
        <div>Animi delectus dolor eligendi, iusto quae quia. Ab asperiores at cumque debitis incidunt maiores,
            maxime. Consectetur deleniti doloremque magnam minima nostrum vitae, voluptas voluptates! Aspernatur
            dolorem doloribus eveniet odit possimus?
        </div>
        <div>Animi commodi distinctio dolore et hic minima nostrum quaerat quisquam saepe sit. Adipisci at
            facere illo in minima pariatur sequi sit temporibus voluptates voluptatibus? Illum magnam non
            perferendis vero voluptates.
        </div>
        <div>Facere, hic, nostrum! A accusamus aliquam, aspernatur consectetur, dolore doloribus eius enim est
            et iusto laudantium libero modi nesciunt officia praesentium quas quis quisquam quos repellat sequi
            soluta voluptates voluptatum.
        </div>
        <div>Aperiam asperiores, autem commodi cumque cupiditate dicta dolorum earum, est explicabo fugiat
            libero magni minus modi neque, non odio odit porro quasi quibusdam quidem repellat repellendus sed
            temporibus unde vero!
        </div>
    </div>
);
const screenshots = (
    <div className="screenshots">
        {screens.map((item, i) => (
            <div key={i} className="screen_wrapper">
                <img src={item} alt={i}/>
                <div className="description">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aspernatur, corporis et
                    facilis incidunt laborum nesciunt quam quibusdam quisquam quos sit soluta, sunt, tempore tenetur
                    ut? Asperiores aut dolor reprehenderit!
                </div>
            </div>
        ))}
    </div>
);

export default class Content extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            content: description,
            count: 0,
            totalPages: 2
        };
    };

    componentDidMount() {
        document.getElementsByClassName('bg')[0].classList.add('root');
    };

    componentWillUnmount() {
        document.getElementsByClassName('bg')[0].classList.remove('root');
    };

    componentDidUpdate(prevProps, prevState) {
        if(this.state.count !== prevState.count) {
            this.setState({ content: this.contentSwitcher() });
        };
    };

    contentSwitcher = () => {
        switch(this.state.count) {
            case(0):
                return description;
            case(1):
                return screenshots;
            default:
                return description;
        }
    };

    pagination = () => {
        let nextPage = this.state.count + 1;
        if(nextPage > this.state.totalPages - 1) {
            nextPage = 0;
        };

        this.setState({ count: nextPage });
    };

    render() {
        return (
            <div className="Content">
                <FlipMove appearAnimation="fade" duration={500}>
                    {this.state.content}
                </FlipMove>
                <div className={classnames({ switch_mark: true, last: this.state.count === this.state.totalPages - 1})}
                     onClick={this.pagination}>
                    <div className="angle"></div>
                </div>
            </div>
        );
    };
};