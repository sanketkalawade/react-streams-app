import React,{ Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux'; 
import {createStream} from '../../actions/index';

class StreamCreate extends Component{
    renderError({error, touched}){
        if (touched && error) {
            return(
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            );
        }
    }
    // renderInput = (formProps) =>{  
    //     const className = `field ${formProps.meta.error && formProps.meta.touched ? 'error':''}`;
    //     console.log(formProps.meta);
                      
    //     return(
    //         <div className={className}>
    //             <label>{formProps.label}</label>
    //             <input onChange={formProps.input.onChange} {formProps.meta.touched} value={formProps.input.value}/>
    //             {this.renderError(formProps.meta)}
    //         </div>
            
    //     )
    // }

    //shorter version of above method
    renderInput = ({input,label, meta}) =>{
        const className = `field ${meta.error && meta.touched ? 'error':''}`;
        return(
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        )
    }
    onStreamFormSubmit = (formValueProps) =>{
        this.props.createStream(formValueProps);
    }
   render(){
        return(
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onStreamFormSubmit)}>
                <Field  name='title' component={this.renderInput} label='Enter Title'/>
                <Field  name='description' component={this.renderInput} label='Enter Description'/>
                <button className="ui button primary">Submit</button>
            </form>
        )
   }
}

const validateCreateStreamForm = formValues =>{
    const errors ={};
    if (!formValues.title) {
        errors.title = 'you must enter valid title'
    }
    if (!formValues.description) {
        errors.description = 'you must enter valid description'
    }
    return errors;

}

const formWrapped = reduxForm({
    form:'CreateNewStream',
    validate:validateCreateStreamForm
})(StreamCreate);

export default connect(null,{createStream})(formWrapped);