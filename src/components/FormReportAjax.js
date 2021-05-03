import React, { Fragment } from 'react'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'

import './Form.css'

class Form extends React.Component {
  static defaultProps = {
    name: 'פניה לעמותה',
    subject: 'פניה לעמותה מהאתר',
    successMessage: 'תודה על פנייתך. נחזור אליך בהקדם.<br/>נודה לתמיכתך, <a href="https://secure.cardcom.solutions/e/xSwQ">הצטרף לעמותה</a>.',
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
    const formData = new FormData(form)
    this.setState({ disabled: true })
    fetch(form.action, {
      method: 'POST',
      headers: { "Content-Type": "multipart/form-data" },
      body: new URLSearchParams(formData).toString()
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
        window.scrollTo(0,0)
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
        <form
          className="Form"
          name={name}
          onSubmit={this.handleSubmit}
          data-netlify="true"
        >
          {this.state.alert && (
            <div className="Form--Alert" dangerouslySetInnerHTML={{__html: this.state.alert}}></div>
          )}
          <div className="Form--Group">
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="שם המוצר"
                name="productName"
                required
              />
              <span>שם המוצר</span>
            </label>
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="שם היצרן"
                name="manufacturer"
                required
              />
              <span>שם היצרן</span>
            </label>
          </div>
          <div className="Form--Group">
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="שם היבואן"
                name="importer"
              />
              <span>שם היבואן</span>
            </label>
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="ברקוד"
                name="barcode"
              />
              <span>ברקוד</span>
            </label>
          </div>
          <label className="Form--Label">
            <input
              className="Form--Input Form--InputText"
              type="text"
              placeholder="מקום הרכישה"
              name="where"
            />
            <span>מקום הרכישה</span>
          </label>
          <label className="Form--Label">
            <textarea
              className="Form--Input Form--Textarea Form--InputText"
              placeholder="Message"
              name="description"
              rows="3"
              required
            />
            <span>תאור הסימון הלקוי</span>
          </label>
          <label className="Form--Label">
            <textarea
              className="Form--Input Form--Textarea Form--InputText"
              placeholder="Message"
              name="reaction"
              rows="3"
            />
            <span>תאור התגובה האלרגית במידה והיתה</span>
          </label>
          <div className="Form--Group">
            <label className="Form--Radio">
              <input
                className="Form--Input Form--RadioInput"
                type="radio"
                name="warningExist"
                value="yes"
                required
              />
              <span>קיים סימון אלרגנים</span>
            </label>
            <label className="Form--Radio">
              <input
                className="Form--Input Form--RadioInput"
                type="radio"
                name="warningExist"
                value="no"
                required
              />
              <span>לא קיים סימון אלרגנים</span>
            </label>
          </div>
          <label className="Form--Label">
            <input
              id="front-image"
              className="Form--Input Form--InputText"
              type="file"
              placeholder="תמונת אריזה – חזית"
              name="frontImage"
              accept="image/png, image/jpeg"
              required
            />
            <span>תמונת אריזה – חזית</span>
          </label>
          <label className="Form--Label">
            <input
              id="back-image"
              className="Form--Input Form--InputText"
              type="file"
              placeholder="תמונת אריזה – גב"
              name="backImage"
              accept="image/png, image/jpeg"
              required
            />
            <span>תמונת אריזה – גב</span>
          </label>

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
