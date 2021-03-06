import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Form extends Component {
    static childContextTypes = {
        form: PropTypes.object
    };

    componentWillMount() {
        this.inputs = [];

        this.handleSubmit = this.handleSubmit.bind(this);
        this.detachField = this.detachField.bind(this);
        this.attachField = this.attachField.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    getChildContext() {
        return {
            form: {
                attachField: this.attachField,
                detachField: this.detachField
            }
        };
    }

    render() {
        return <form onSubmit={this.handleSubmit}>{this.props.children}</form>;
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.onSubmit(this.getModel());
    }

    getModel() {
        return this.inputs.reduce((model, input) => {
            const value = input.getValue();
            const name = input.props.name;
            // Конвертим квадратные скобки в точки
            const keys = name.replace(/\[(\w+)\]/g, '.$1').split('.');

            let base = model;

            while (keys.length) {
                const key = keys.shift();

                if (keys.length) {
                    // Если следующий ключ - число, значит мы должны изпользовать массив
                    base = base[key] = base[key] || (isNaN(keys[0]) ? {} : []);
                } else {
                    base = base[key] = value;
                }
            }

            return model;
        }, {});
    }

    detachField(field) {
        this.inputs = this.inputs.filter(input => input !== field);
    }

    attachField(field) {
        this.inputs.push(field);
    }

    resetForm() {
        this.inputs.forEach(input => input.resetValue());
    }
}
