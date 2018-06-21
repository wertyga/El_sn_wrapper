import './Content.sass';

export default class Content extends React.Component {

    componentDidMount() {
        document.getElementsByClassName('bg')[0].classList.add('root');
    };

    componentWillUnmount() {
        document.getElementsByClassName('bg')[0].classList.remove('root');
    };

    render() {
        return (
            <div className="Content">
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
    };
};