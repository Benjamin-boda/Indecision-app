class VisibilityToggle extends React.Component {
    constructor(props) {
        super(props);
        this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
        this.state = {
            visibility: false
        }
    }
    handleToggleVisibility() {
        this.setState((prevState) => {
            return {
                visibility: !prevState.visibility
            }
        })
    }
    render() {
        return (
            <div>
            <h1>Visibility Toggle</h1>
            <button onClick={this.handleToggleVisibility}>{this.state.visibility ? "Hide details" : "Show details"}</button>
            {this.state.visibility && (
                <div>
                    <p>Here are some details</p>
                </div>
            )}
            </div>
        )
    }
}

ReactDOM.render(<VisibilityToggle />, document.getElementById("app"));

// let Visibility = false;

// const buttonChoice = () => {
//     Visibility = !Visibility;
//     visibleApp();
// }

// const appRoot = document.getElementById("app");

// const visibleApp = () => {
    
//     const visible = (
//         <div>
//         <h1>Visibility toggle</h1>
//         <button onClick={buttonChoice}>{Visibility ? "Hide details" : "Show details"}</button>
//         {Visibility && (
//             <div>
//                 <p>Here are some details</p>
//             </div>
//         )}
//         </div>
//     );
//     ReactDOM.render(visible, appRoot);
// }

// visibleApp();

