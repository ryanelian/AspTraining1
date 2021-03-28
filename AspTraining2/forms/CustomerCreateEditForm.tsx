import React from "react";
import validate from 'validate.js';
import { SubmitButton } from "./SubmitButton";

export interface CustomerFormValues {
    name: string;
    email: string;
}

export class CustomerCreateEditForm extends React.Component<{
    values: CustomerFormValues;
    onChange: (values: CustomerFormValues) => void,
    onValidSubmit: (values: CustomerFormValues) => Promise<void>
}, {
    submitting: boolean,
    formState: {
        [key in keyof CustomerFormValues]: {
            error: string;
            dirty: boolean;
        }
    }
}>{

    constructor(props) {
        super(props);
        this.state = {
            submitting: false,
            formState: {
                name: {
                    error: '',
                    dirty: false
                },
                email: {
                    error: '',
                    dirty: false
                },
            },
        };
    }

    inputClassName = (input: keyof CustomerFormValues) => {
        let className = 'form-control';
        const inputState = this.state.formState[input];

        if (inputState.dirty) {
            if (inputState.error) {
                className += ' is-invalid'
            } else {
                className += ' is-valid'
            }
        }

        return className;
    }

    validate = (input?: keyof CustomerFormValues) => {
        const validationConstraints: {
            [key in keyof CustomerFormValues]?: unknown
        } = {};


        if (!input || input === 'name') {
            validationConstraints.name = {
                presence: {
                    allowEmpty: false,
                },
                length: {
                    maximum: 255
                }
            };
        }
        if (!input || input === 'email') {
            validationConstraints.email = {
                presence: {
                    allowEmpty: false,
                },
                length: {
                    maximum: 255
                },
                email: true,
            };
        }

        const validationResult: {
            [key in keyof CustomerFormValues]: string[]
        } = validate.validate(this.props.values, validationConstraints);

        return validationResult;
    }

    onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        this.setState({
            submitting: true
        });

        const formState = this.state.formState;
        const validationResults = this.validate();

        for (const key in formState) {
            formState[key].dirty = true;

            if (validationResults && validationResults[key]) {
                formState[key].error = validationResults[key][0];
            } else {
                formState[key].error = '';
            }
        }

        this.setState({
            formState: formState
        });

        try {
            // if no error...
            if (!validationResults) {
                await this.props.onValidSubmit(this.props.values);
                this.setState({
                    formState: {
                        name: {
                            error: '',
                            dirty: false
                        },
                        email: {
                            error: '',
                            dirty: false
                        },
                    },
                });
            }
        } catch (err) {
        }

        this.setState({
            submitting: false,
        });
    }

    onNameChanged = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValues = this.props.values;
        newValues.name = e.target.value;
        this.props.onChange(newValues);

        const formState = this.state.formState;
        formState.name.dirty = true;

        const validationResult = this.validate('name');
        if (validationResult && validationResult.name[0]) {
            formState.name.error = validationResult.name[0];
        } else {
            formState.name.error = '';
        }

        this.setState({
            formState: formState
        });
    };

    onEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValues = this.props.values;
        newValues.email = e.target.value;
        this.props.onChange(newValues);

        const formState = this.state.formState;
        formState.email.dirty = true;

        const validationResult = this.validate('email');
        if (validationResult && validationResult.email[0]) {
            formState.email.error = validationResult.email[0];
        } else {
            formState.email.error = '';
        }

        this.setState({
            formState: formState,
        });
    };

    renderErrorMessage(key: keyof CustomerFormValues) {
        const inputState = this.state.formState[key];
        if (inputState.error) {
            return <span className="text-danger small">{inputState.error}</span>;
        }
        return undefined;
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <fieldset disabled={this.state.submitting}>
                    <div className="mb-3">
                        <label className="fw-bold mb-2" htmlFor="name">Name</label>
                        <input id="name" className={this.inputClassName("name")}
                            value={this.props.values.name} onChange={this.onNameChanged}></input>
                        {this.renderErrorMessage("name")}
                    </div>
                    <div className="mb-3">
                        <label className="fw-bold mb-2" htmlFor="email">Email</label>
                        <input id="email" className={this.inputClassName("email")}
                            value={this.props.values.email} onChange={this.onEmailChanged}></input>
                        {this.renderErrorMessage("email")}
                    </div>
                    <div className="mb-3">
                        <SubmitButton busy={this.state.submitting}></SubmitButton>
                    </div>
                </fieldset>
            </form>
        );
    }
}
