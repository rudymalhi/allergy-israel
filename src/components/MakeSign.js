import React from 'react'
import "jspdf/dist/polyfills.es.js";
import { jsPDF } from "jspdf";
import addFonts from '../fonts/Heebo';

export default class MakeSign extends React.Component {
  static defaultProps = {
    className: ''
  }

  handleSubmit = event => {
    event.preventDefault()
    const doc = new jsPDF({ orientation: "landscape" });
    const data = new FormData(event.target);

    addFonts(doc);
    doc.setR2L(true);
    doc.setFont('Heebo', 'normal', 'normal');
    doc.setFontSize(34);
    const type = `${data.get("target") === "p" ? "גן" : (data.get("target") === "c" ? "כיתה" : "בית הספר")}`;
    doc.text(
      `ב${type} שלנו לומדים תלמידים בעלי אלרגיה מסכנת חיים.`,
      150, 85, { align: "center" }
    );
    doc.setFontSize(18);
    doc.text(
      "תודה על תשומת הלב ושיתוף הפעולה,",
      150, 190, { align: "center" }
    )
    doc.text(
      "ההנהלה והצוות החינוכי",
      150, 198, { align: "center" }
    )
    doc.setFont('Heebo', 'normal', 'bold');
    doc.setFontSize(42);
    doc.text(
      `חל איסור להכניס ל${type} מוצרים המכילים`,
      150, 105, { align: "center" }
    );
    const allergens = [];
    if (data.get("milk") === "on") {
      allergens.push("חלב")
    }
    if (data.get("eggs") === "on") {
      allergens.push("ביצים")
    }
    if (data.get("nuts") === "on") {
      allergens.push("אגוזים")
    }
    if (data.get("peanuts") === "on") {
      allergens.push("בוטנים")
    }
    if (data.get("sesame") === "on") {
      allergens.push("שומשום")
    }
    if (data.get("fish") === "on") {
      allergens.push("דגים")
    }
    if (data.get("legume") === "on") {
      allergens.push("קטניות")
    }
    doc.text(
      allergens.reduce((acc, curr, idx) => {
        return acc + ` ${idx === allergens.length - 1 ? "ו" : ""}${curr}${idx < allergens.length - 2 ? "," : ""}`
      }, ""),
      150, 125, { align: "center" }
    );
    const headerImage = new Image();
    headerImage.src = '/images/welcome.png';
    doc.addImage(headerImage, 'PNG', 30, 10, 230, 50);

    const image = new Image();
    image.src = '/images/logo.png';
    doc.addImage(image, 'PNG', 10, 185, 50, 20);

    doc.save("allergy-sign.pdf");
  }

  render() {
    const { className } = this.props
    return (
      <div className={`MakeSign ${className}`}>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input id="preschool" checked value="p" name="target" type="radio"/><label for="preschool"> שלט לגן</label>&nbsp;&nbsp;&nbsp;
            <input id="classroom" value="c" name="target" type="radio"/><label for="classroom"> שלט לכיתה</label>&nbsp;&nbsp;&nbsp;
            <input id="school" value="s" name="target" type="radio"/><label for="school"> שלט לבית הספר</label>&nbsp;&nbsp;&nbsp;
          </div>
          <br/>
          <div>
            <input id="milk" name="milk" type="checkbox"/><label for="milk"> חלב</label>&nbsp;&nbsp;&nbsp;
            <input id="eggs" name="eggs" type="checkbox"/><label for="eggs"> ביצים</label>&nbsp;&nbsp;&nbsp;
            <input id="nuts" name="nuts" type="checkbox"/><label for="nuts"> אגוזים</label>&nbsp;&nbsp;&nbsp;
            <input id="peanuts" name="peanuts" type="checkbox"/><label for="peanuts"> בוטנים</label>&nbsp;&nbsp;&nbsp;
            <input id="sesame" name="sesame" type="checkbox"/><label for="sesame"> שומשום</label>&nbsp;&nbsp;&nbsp;
            <input id="fish" name="fish" type="checkbox"/><label for="fish"> דגים</label>&nbsp;&nbsp;&nbsp;
            <input id="legume" name="legume" type="checkbox"/><label for="legume"> קטניות</label>&nbsp;&nbsp;&nbsp;
          </div>
          <br/>
          <br/>
          <div>
            <input
              className='Button Form--SubmitButton'
              type='submit'
              value='שמור'
            />
          </div>
        </form>
      </div>
    )
  }
}
