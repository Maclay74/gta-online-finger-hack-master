import React from 'react'
import StageComponent from "../components/stage/Stage";
import config from './../config'
class Stage extends React.Component {

    constructor(props) {
        super(props);

        this.selectOptions = this.selectOptions.bind(this);
        this.check = this.check.bind(this);
        this.reset = this.reset.bind(this);
        this.start = this.start.bind(this);

        this.state = {
            finger: null,
            options: [],
            selectedOptions: [],
            showResults: true,
            time: 0,
            started: false,
        }
    }

    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    componentDidMount() {
        this.reset();
    }

    check() {
        this.setState({
            showResults: true,
        })

        clearInterval(this.timer)
    }

    start() {
        this.setState({
            started: true
        }, this.reset)
    }

    reset() {
        const { started, finger : prevFinger } = this.state;

        let finger = null;

        while (!finger || finger.image === prevFinger.image) {
            finger = config.fingers[this.getRandomIntInclusive(0, config.fingers.length - 1)];
            if (!prevFinger) break;
        }

        finger.options.sort(function() {
            return .5 - Math.random();
        });

        this.setState({
            finger,
            showResults: false,
            selectedOptions: [],
            time: 0,
        });


        clearInterval(this.timer)
        if (started) {
            this.timer = setInterval(() => {
                this.setState({
                    time: this.state.time + 1,
                })
            }, 1000)
        }


    }

    selectOptions(option) {

        const { selectedOptions} = this.state;
        let newSelectedOptions = [];

        if (this.state.selectedOptions.includes(option)) {
            newSelectedOptions = selectedOptions.filter(opt => opt.img !== option.img)

        } else {

            if (selectedOptions.length > 3) return;

            newSelectedOptions = [
                ...selectedOptions,
                option
            ]
        }

        this.setState({
            selectedOptions: newSelectedOptions,
        })
    }

    render() {
        const {finger, selectedOptions, showResults, started, time} = this.state;

        return (
            <StageComponent
                fingerImage={finger ? finger.image : null}
                options={finger ? finger.options : null}
                selectedOptions={selectedOptions}
                onOptionClick={this.selectOptions}
                onResetClick={started ? this.reset : this.start}
                onCheckClick={this.check}
                started={started}
                showResults={showResults}
                time={time}
            />
        )
    }
}

export default Stage;