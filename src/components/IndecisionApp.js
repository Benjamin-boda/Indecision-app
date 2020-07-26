import React from "react";
import AddOption from "./AddOption";
import Header from "./Header";
import Action from "./Action";
import Options from "./Options";
import OptionModal from "./OptionModal";
import {startAddOption, startRemoveOption, startResetOption} from  "../actions/options";
import { connect } from "react-redux";

export class IndecisionApp extends React.Component {
    state = {
        selectedOption: undefined
    };
    // handleDeleteOptions = () => {
    //     this.setState(() => ({ options: []}));
    // };
    // handleDeleteOption = (optionToRemove) => {
    //     this.setState((prevState) => ({
    //         options: prevState.options.filter((option) => optionToRemove !== option)}))
    // };
    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.props.options.length);
        const option = this.props.options[randomNum];
        this.setState(() => ({
            selectedOption: option
        }))
    };
    handleAddOption = (option) => {
        if (!option) {
            return "Enter valid value to add a item"
        } else if (this.props.options.indexOf(option) > 0) {
            return "This option already exists"
        } else {
            this.props.addOption(option);
            return false;
        }
        // this.setState((prevState) => ({options: prevState.options.concat(option)}));
    };
    handleClearModal = () => {
        this.setState(() => ({selectedOption: undefined}));
    };
    // componentDidMount() {
    //     try {
    //         const json = localStorage.getItem("options");
    //         const options = JSON.parse(json);

    //         if (options) {
    //             this.setState(() => ({options}))
    //         }
    //     } catch(e) {
    //         // Do nothing at all
    //     } 
    // }
    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.options.length !== this.state.options.length) {
    //         const json = JSON.stringify(this.state.options);
    //         localStorage.setItem("options", json);
    //     }
    // }
    // componentWillUnmount() {
    //     console.log("componentWillUnmount")
    // }
    
    render() {
        const subtitle = "Put your in the hands of a computer !";

        return (
            <div>
                <Header subtitle = {subtitle}/>
                <div className="container">
                    <Action 
                        hasOptions = {this.props.options.length > - 1}
                        handlePick = {this.handlePick}
                    />
                    <div className="widget">
                        <Options 
                            options = {this.props.options} 
                            handleDeleteOptions={this.props.handleDeleteOptions}
                            handleDeleteOption={this.props.handleDeleteOption}
                        />
                        <AddOption handleAddOption = {this.handleAddOption}/>
                    </div>
                </div>
                <OptionModal 
                    selectedOption = {this.state.selectedOption}
                    handleClearModal = {this.handleClearModal}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    options: state.options
});

const mapDispatchToProps = (dispatch) => ({
    addOption: (option) => dispatch(startAddOption(option)),
    handleDeleteOption: (option) => dispatch(startRemoveOption(option)),
    handleDeleteOptions: () => dispatch(startResetOption())
});

export default connect(mapStateToProps, mapDispatchToProps)(IndecisionApp);
