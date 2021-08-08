function getELement(id) {
  return document.getElementById(id);
}
function add() {
  let data = {
    firstname: getELement("firstname").value,
    lastname: getELement("lastname").value,
    address: getELement("address").value,
    city: getELement("city").value,
    province: getELement("province").value,
    postal: getELement("postal").value,
    phone: getELement("phone").value,
    mail: getELement("mail").value,
    notes: getELement("notes").value,
  };

  //checking if error exists
  let phnStatus = false;
  let postalStatus = false;

  // check for phone
  var phn_pttrn_1 = /\([0-9]{3}\)[0-9]{3}-[0-9]{4}/gm;
  var phn_pttrn_2 = /[0-9]{3}-[0-9]{3}-[0-9]{4}/gm;
  const phone_no = data.phone + "";
  if (phn_pttrn_1.test(phone_no) || phn_pttrn_2.test(phone_no)) {
    phnStatus = false;
  } else {
    alert("Enter a valid phone number");
    phnStatus = true;
  }

  var postal_pttrn = /([0-9][A-Za-z][0-9] [A-Za-z][0-9][A-Za-z])/gm;
  const postal_code = data.postal + "";
  if (postal_pttrn.test(postal_code)) {
    postalStatus = false;
  } else {
    alert("Please enter correct postal code");
    postalStatus = true;
  }

  if (phnStatus == true || postalStatus == true) {
    console.log("Invalid entries!");
    alert("check entries before submitting");
  } else {
    if (localStorage.length) {
      console.log("localstorage present");
      let arr = JSON.parse(localStorage.getItem("formData"));
      arr.push(data);
      localStorage.setItem("formData", JSON.stringify(arr));
      alert("Saved!");
    } else {
      console.log("creating new storage");
      localStorage.setItem("formData", JSON.stringify([data]));
      alert("Saved!");
    }
  }
}

function loadData() {
  try {
    console.log("Fetching Data...");
    let show = getELement("show");
    let data = JSON.parse(localStorage.getItem("formData"));

    for (const row of data) {
      let tr = document.createElement("tr");
      for (const key in row) {
        let td = document.createElement("td");
        td.innerHTML = row[key];
        tr.appendChild(td);
      }
      show.appendChild(tr);
    }
  } catch {
    console.log("no localstorage object found");
  }
}
