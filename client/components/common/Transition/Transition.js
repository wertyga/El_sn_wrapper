const defaultTransitionDuration = 1000;

export default class Transition extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: this.props.show,
            appear: false,
            enterFromStyle: this.props.enter ? this.props.enter.from : { opacity: 0 },
            enterToStyle: this.props.enter ? this.props.enter.to : { opacity: 1 },
            leaveFromStyle: this.props.leave ? this.props.leave.from : { opacity: 1 },
            leaveToStyle: this.props.leave ? this.props.leave.to : { opacity: 0 }
        };
    };

    componentDidMount() {
        this.addChildrenStyles(this.state.enterFromStyle)
    };


    componentDidUpdate(prevProps, prevState) {
        if(this.props.show !== prevProps.show) {
            if(this.props.show) {
                this.setState({ show: true });
                setTimeout(() => this.addChildrenStyles(this.state.enterToStyle), 0);
            } else {
                this.addChildrenStyles(this.state.leaveFromStyle, (this.props.timeout || defaultTransitionDuration) / 2);
                setTimeout(() => {
                    return this.addChildrenStyles(this.state.leaveToStyle, (this.props.timeout || defaultTransitionDuration) / 2);
                }, (this.props.timeout || defaultTransitionDuration) / 2);

                setTimeout(() => {
                    this.addChildrenStyles(this.state.enterFromStyle);
                    this.setState({ show: false });
                }, this.props.timeout || defaultTransitionDuration);

            };
        };

    };

    addChildrenStyles = (styleObj, transition) => {
        const children = this.mainRef.children;
        for(let i = 0; i < children.length; i++) {
            const item = children[i];
            Object.keys(styleObj).forEach(prop => {
                item.style[prop] = styleObj[prop];
                if(!transition) {
                    item.style['transition-duration'] = `${this.props.timeout || defaultTransitionDuration}ms`;
                } else {
                    item.style['transition-duration'] = `${transition}ms`;
                }
            })
        };

    };

    render() {
        const addStyles = this.props.style || {}
        return (
            <div
                ref={node => this.mainRef = node}
                style={{
                    display: !this.state.show && 'none',
                    ...addStyles
                }}
            >
                {this.props.children}
            </div>
        );
    };
};

Transition.propTypes = {
    show: PropTypes.bool.isRequired, // Sign that show hide or not element/s
    timeout: PropTypes.number, // Duration of animation (Default 500ms)
    appear: PropTypes.shape({
        from: PropTypes.object.isRequired,
        to: PropTypes.object.isRequired,
    }), // Css properties for appear/enter animation (Default it's "fade")
    leave: PropTypes.shape({
        from: PropTypes.object.isRequired,
    }), // Css properties for leave/disappear animation (Default it's "fade")
    addStyles: PropTypes.object, // Adding styles to root element
};