

# React Router

```shell
$ npm i react-router-dom
```

```jsx
// App.js
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
...

class App extends Component {
		render() {
        return (
            <Router>
                <div className="root">
                    <Navbar />
                    <div className="container">
                        <Alert alert={this.state.alert} />
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={(props) => (
                                    <Fragment>
                                        <Search
                                            searchUsers={this.searchUsers}
                                            clearUsers={this.clearUsers}
                                            showClear={
                                                this.state.users.length > 0
                                                    ? true
                                                    : false
                                            }
                                            setAlert={this.setAlert}
                                        />
                                        <Users
                                            loading={this.state.loading}
                                            users={this.state.users}
                                        />
                                    </Fragment>
                                )}
                            />
                            <Route exact path="/about" component={About} />
                        </Switch>
                    </div>
                </div>
            </Router>
};
```

Router-link

```jsx
// Navbar.js
import { Link } from "react-router-dom";

const Navbar = (props) => {
    return (
        <nav className="navbar bg-primary">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
    );
};
```



