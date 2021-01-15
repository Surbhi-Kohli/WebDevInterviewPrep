/*Question 1*/
var Duryodhana = new Kaurav('Duryodhana', 'Gada')
let Arjuna = new Pandav('Arjuna', 'Gandiva')
const Dronacharya = new Guru('Dronacharya')
console.log(Duryodhana);
console.log(
  Arjuna.weapon,
  window.Arjuna,
  Duryodhana.weapon,
  window.Duryodhana,
  Dronacharya.name,
  window.Dronacharya
)
/* console.log(Duryodhana)
{
  name: "Duryodhana",
  weapon: "Gada"
}
//2nd console.log()
"Gandiva", undefined, "Gada", {
  name: "Duryodhana",
  weapon: "Gada"
}, "Dronacharya", undefined 
*/
/*Question 2*/
var name = "Puneet";

function Engineer() {
	this.name = "Yomesh";
}

console.log(new Engineer().name);
Engineer.prototype.name = "Saloni";
Engineer.prototype.channel = "https://bit.ly/devtools-yt";
console.log(new Engineer().channel);
console.log(new Engineer().name);

/*A.Puneet https://bit.ly/devtools-yt  Yomesh  B.Puneet https://bit.ly/devtools-yt  Saloni  C.Yomesh https://bit.ly/devtools-yt Yomesh
D. Puneet undefined Yomesh   E.Puneet
https://bit.ly/devtools-yt
Puneet

ans-C
EXPLANATION: Final object would look like

{ name: "Yomesh", __proto__: { name: "Saloni", channel: "https://bit.ly/devtools-yt" } }
While searching for property name, first look up would be on the direct enumerable properties of the object and since that exists (this.name = "Yomesh"),
it would be printed. If no direct property is present then Prototype chain is traversed and in that case value would be Saloni. 
In case of channel property, Prototype chain is traversed and value is printed.*/
