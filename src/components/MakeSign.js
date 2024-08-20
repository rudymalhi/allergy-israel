import React, { Component }  from 'react'
import "jspdf/dist/polyfills.es.js";
import { jsPDF } from "jspdf";
import addFonts from '../fonts/Heebo';

const allergenMap = {
  milk: "חלב",
  eggs: "ביצים",
  nuts: "אגוזים",
  peanuts: "בוטנים",
  almond: "שקדים",
  pinenuts: "צנוברים",
  sesame: "שומשום",
  fish: "דגים",
  legume: "קטניות",
  soy: "סויה",
}

const nutsMap = {
  nut1: "מלך",
  nut2: "פקאן",
  nut3: "קשיו",
  nut4: "פיסטוק",
  nut5: "לוז",
  nut6: "מקדמיה",
  nut7: "ברזיל",
}

export default class MakeSign extends Component {
  static defaultProps = {
    className: ''
  }

  state = {
    target: "p",
    nuts: false,
    other: false
  }

  handleSubmit = event => {
    event.preventDefault()
    const doc = new jsPDF({ orientation: "landscape", format: "a3" });
    const data = new FormData(event.target);

    addFonts(doc);
    doc.setR2L(true);
    doc.setFont('Heebo', 'normal', 'normal');
    doc.setFontSize(48);
    let type = "";
    switch (data.get("target")) {
      case "p":
        type = "גן";
        break;
      case "q":
        type = "מתחם";
        break;
      case "c":
        type = "כיתה";
        break;
      case "s":
        type = "בית הספר";
        break;
    }
    doc.text(
      `ב${type} שלנו לומדים תלמידים בעלי אלרגיה מסכנת חיים.`,
      210, 140, { align: "center" }
    );
    doc.setFontSize(36);
    doc.text(
      "תודה על תשומת הלב ושיתוף הפעולה,",
      210, 270, { align: "center" }
    )
    doc.text(
      "ההנהלה והצוות החינוכי",
      210, 285, { align: "center" }
    )
    doc.setFont('Heebo', 'normal', 'bold');
    doc.setFontSize(60);
    const allergens = [];
    for (const k in allergenMap) {
      if (data.get(k) === "on") {
        const detailedNuts = [];
        if (k === "nuts") {
          for (const k in nutsMap) {
            if (data.get(k) === "on") {
              detailedNuts.push(nutsMap[k])
            }
          }
        } 
        allergens.push(allergenMap[k] + (detailedNuts.length ? ` )${detailedNuts.join(", ")}(` : ""))
      }
    }
    if (data.get("other") === "on" && data.get("otherText")) {
      allergens.push(data.get("otherText"))
    }
    doc.text(
      `חל איסור להכניס ל${type} מוצרים המכילים`,
      210, 170, { align: "center" }
    );
    doc.text(
      allergens.reduce((acc, curr, idx) => {
        return acc + ` ${(allergens.length > 1 && idx === allergens.length - 1) ? "ו" : ""}${curr}${idx < allergens.length - 2 ? "," : ""}`
      }, ""),
      210, 200, { align: "center", maxWidth: 410 }
    );
    const headerImage = new Image();
    headerImage.src = '/images/welcome.png';
    doc.addImage(headerImage, 'PNG', 30, 10, 370, 80);

    const image = new Image();
    image.src = '/images/logo-for-pdf.png';
    doc.addImage(image, 'PNG', 10, 250, 100, 40);

    doc.save("allergy-sign.pdf");
  }

  handleOptionChange = event => {
    this.setState({
      target: event.target.value
    });
  }

  handleNutChange = event => {
    this.setState({
      nuts: event.target.checked
    });
  }

  handleOtherChange = event => {
    this.setState({
      other: event.target.checked
    });
  }

  render() {
    const { className } = this.props
    return (
      <div className={`MakeSign ${className}`}>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input id="preschool" checked={this.state.target === "p"} value="p" name="target" type="radio" onChange={this.handleOptionChange}/>
            <label for="preschool"> שלט לגן</label>&nbsp;&nbsp;&nbsp;
            <input id="preschools" checked={this.state.target === "q"} value="q" name="target" type="radio" onChange={this.handleOptionChange}/>
            <label for="preschools"> שלט למתחם גנים</label>&nbsp;&nbsp;&nbsp;
            <input id="classroom" checked={this.state.target === "c"} value="c" name="target" type="radio" onChange={this.handleOptionChange}/>
            <label for="classroom"> שלט לכיתה</label>&nbsp;&nbsp;&nbsp;
            <input id="school" checked={this.state.target === "s"} value="s" name="target" type="radio" onChange={this.handleOptionChange}/>
            <label for="school"> שלט לבית הספר</label>&nbsp;&nbsp;&nbsp;
          </div>
          <br/>
          <div class="flexbox-container">
            <div>
              <input id="nuts" name="nuts" type="checkbox" checked={this.state.nuts} onChange={this.handleNutChange}/><label for="nuts"> אגוזים</label>&nbsp;&nbsp;&nbsp;
            </div>
            <div>
              <input id="peanuts" name="peanuts" type="checkbox"/><label for="peanuts"> בוטנים</label>&nbsp;&nbsp;&nbsp;
              </div>
            <div>
              <input id="fish" name="fish" type="checkbox"/><label for="fish"> דגים</label>&nbsp;&nbsp;&nbsp;
            </div>
            {(this.state.target !== "s") && (
              <>
                {Object.keys(allergenMap).filter(k => !["nuts","peanuts","fish"].includes(k)).map((k) => (
                  <div>
                    <input id={k} name={k} type="checkbox"/><label for={k}> {allergenMap[k]}</label>&nbsp;&nbsp;&nbsp;
                  </div>
                ))}
              </>
            )}
            <div>
              <input id="other" name="other" type="checkbox" checked={this.state.other} onChange={this.handleOtherChange}/><label for="other"> אחר</label>&nbsp;&nbsp;&nbsp;
              {this.state.other && (
                <>
                <input id="otherText" name="otherText" type="text" placeholder="פירוט אלרגנים נוספים"/>&nbsp;&nbsp;&nbsp;
                </>
              )}
            </div>
          </div>
          <br/>
          {this.state.nuts && (
          <div>
            <label>סוגי אגוזים: </label>
            {Object.keys(nutsMap).map((k) => (
              <>
              <input id={k} name={k} type="checkbox"/><label for={k}> {nutsMap[k]}</label>&nbsp;&nbsp;&nbsp;
              </>
            ))}
          </div>
          )}
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
