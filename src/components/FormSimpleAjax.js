import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'

import './Form.css'

class Form extends React.Component {
  static defaultProps = {
    name: 'פניה לעמותה',
    subject: 'פניה לעמותה מהאתר',
    successMessage: 'תודה על פנייתך. נחזור אליך בהקדם',
    errorMessage:
      'There is a problem, your message has not been sent, please try contacting us via email'
  }

  state = {
    alert: '',
    disabled: false
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.disabled) return

    const form = e.target
    const data = serialize(form)
    this.setState({ disabled: true })
    fetch(form.action + '?' + stringify(data), {
      method: 'POST'
    })
      .then(res => {
        if (res.ok) {
          return res
        } else {
          throw new Error('Network error')
        }
      })
      .then(() => {
        form.reset()
        this.setState({
          alert: this.props.successMessage,
          disabled: false
        })
      })
      .catch(err => {
        console.error(err)
        this.setState({
          disabled: false,
          alert: this.props.errorMessage
        })
      })
  }

  render() {
    const { name, subject } = this.props

    return (
      <Fragment>
        <Helmet>
          <script src="https://www.google.com/recaptcha/api.js" />
        </Helmet>
        <form
          className="Form"
          name={name}
          onSubmit={this.handleSubmit}
          data-netlify="true"
        >
          {this.state.alert && (
            <div className="Form--Alert">{this.state.alert}</div>
          )}
          <div className="Form--Group">
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="שם פרטי"
                name="firstname"
                required
              />
              <span>שם פרטי</span>
            </label>
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="שם משפחה"
                name="lastname"
                required
              />
              <span>שם משפחה</span>
            </label>
          </div>
          <label className="Form--Label">
            <input
              className="Form--Input Form--InputText"
              type="email"
              placeholder="אימייל"
              name="emailAddress"
              required
            />
            <span>אימייל</span>
          </label>
          <div className="Form--Group">
            <label className="Form--Label has-arrow">
              <select
                className="Form--Input Form--Select"
                name="type"
                defaultValue="סיבת הפניה"
                required
              >
                <option disabled hidden>
                  סיבת הפניה
                </option>
                <option>כללי</option>
                <option>מעוניין להתנדב</option>
                <option>הזמנת הדרכה</option>
              </select>
            </label>
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="טלפון"
                name="phone"
                required={false}
              />
              <span>מספר טלפון</span>
            </label>
          </div>
          <label className="Form--Label">
            <textarea
              className="Form--Input Form--Textarea Form--InputText"
              placeholder="Message"
              name="message"
              rows="10"
              required
            />
            <span>הודעה</span>
          </label>
          <div data-netlify-recaptcha="true"></div>
          {!!subject && <input type="hidden" name="subject" value={subject} />}
          <input type="hidden" name="form-name" value={name} />
          <input
            className="Button Form--SubmitButton"
            type="submit"
            value="שלח"
            disabled={this.state.disabled}
          />
        </form>
      </Fragment>
    )
  }
}

export default Form
