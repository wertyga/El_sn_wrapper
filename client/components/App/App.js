import { Route, Switch } from 'react-router-dom';

import routes from '../../common/routes';

import UpperMenu from '../UpperMenu/UpperMenu';

import './App.sass';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            res: ''
        };
    };

    render() {
        return (
            <div className="App">
                <UpperMenu />

                <Switch>
                    {routes.map((item, i) => <Route key={i} {...item}/>)}
                </Switch>
            </div>
        );
    }
}

export default App;

