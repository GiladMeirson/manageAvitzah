



Global_ArrayToExcel=[];
Global_Leads=[];


$(document).ready(()=>{
     init();
})

const init = () => {
    //RenderPassModal();
    // document.getElementById('passIN').addEventListener('keypress',SendPass)
    
    //if the pass is true.
    fetchDataFromFirebase(refString.Leads_RefString)
    .then((data)=>{
        
        Global_Leads = Object.values(data);
        console.log(Global_Leads);
        RenderHeader(); 
        RenderMainDashboard();
        RenderBarCharMain();
        RenderPieChartMain();
    })

    
}



const SendPass = async (e)=>{
    if (e.keyCode==13) {
        const userPass = $('#passIN').val();
        const data = await fetchDataFromFirebase(PDSTRING);
        if (userPass===data) {
            $('#PassModal').fadeOut();
        }
    }

}











//------****************Renders******************------\\


function getGreeting() {
    const currentTime = new Date().getHours();

    if (currentTime >= 5 && currentTime < 12) {
        return "בוקר טוב אביצח";
    } else if (currentTime >= 12 && currentTime < 17) {
        return "אחר-צהריים טובים אביצח";
    } else if (currentTime >= 17 && currentTime < 20) {
        return "ערב טוב אביצח";
    } else {
        return "לילה טוב אביצח";
    }
}

const RenderPassModal=()=>{
    let str = `<section id="PassModal">
    <div class="wrpModal">
        <p class="passTitle">הכנס סיסמא</p>
        <input type="password" name="passA" id="passIN">
    </div>
    </section>`;
    document.body.innerHTML = str;

}


const RenderBarCharMain =()=>{
    //need to change to real data.
    const xValues = ["אתר-1", "אתר-2", "אתר-3"];
    const yValues = [40, 30, 25];
    var barColors = ["#f38080", "#68ef82","#6594f1"];

    new Chart("BarChart", {
  type: "bar",
    data: {
        labels: xValues,
        datasets: [{
        backgroundColor: barColors,
        data: yValues,

        }],
    },
    options: {
        legend: {display: false},
        title: {
        display: true,
        text: "כמות צפיות לפי אתרים"
        },
        scales: {
            y: {
              beginAtZero: true
            }
        }
    },
    
    });
}

const RenderPieChartMain=()=>{
    var xValues = ["אתר-1", "אתר-2", "אתר-3"];
    var yValues = [55, 49, 44];
    var barColors = [
        "#f38080", "#68ef82","#6594f1"
    ];
    
    new Chart("PieChart", {
      type: "pie",
      data: {
        labels: xValues,
        datasets: [{
          backgroundColor: barColors,
          data: yValues
        }]
      },
      options: {
        title: {
          display: true,
          text: "כמות לידים לפי אתרים"
        }
      }
    });
}

const RenderMainDashboard = ()=>{
    const str = `
    <main class="main">


    <div class="grid-container">
        <div class="grid-item">
            <canvas id="BarChart" style="min-height: 100%;"></canvas>
        </div>
        <div class="grid-item">
            <p dir="rtl" class="textTitle"><span id="leadNum" class="leadNum">5</span> לידים חדשים מאז <br><br>הפעם האחרונה</p>
        </div>
        <div class="grid-item">
        <img class="icon" src="../assets/img/table1.png" alt="">
            <p dir="rtl" onclick="RenderDataTable()"  class="textTitle" style="font-size: 45px;">  
            טבלת כל הלידים </p>

        </div>
        <div class="grid-item">
            <canvas id="PieChart" style="max-width:270px"></canvas>
        </div>
    </div>

</main>
    `;

    document.getElementById('ph').innerHTML = str;
}

const RenderHeader = ()=>{
    const str = `
    <div class="toolbar">
    <nav class="menu">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    <div class="logo">Logo</div>

</div>

<header>
    <h1 dir="rtl">${getGreeting()}</h1>
</header>

<div id="ph">

</div>`;
document.body.innerHTML = str;
}

const RenderDataTable= async ()=>{
    let data = Global_Leads;
    console.log(data)
    let str = `<div class="dataTable-LeadsWRP">
    <div><p class="Title1">טבלת לידים</p></div>
    <hr>
    <div class="alignThis">
    <button onclick="backtoMainPage()" id="backLink">חזור לדף הראשי</button>
    <button onclick="exportLeadsToExcel()" class="iteminLine">ייצא לאקסל</button>
    </div>
    <table id="dataTable-Leads" class="display" style="width:100%">
    <thead>
        <tr>
            <th>תז</th>
            <th>שם מלא</th>
            <th>מס טלפון</th>
            <th>תאריך לידה</th>
            <th>גיל</th>
            <th>סטטוס</th>
            <th>מכשיר</th>
            <th>מאיפה</th>
            <th>פעולות</th>
            <th><input onchange="changeAllMarks(this)" style="text-align:right;" type="checkbox" name="MarkAll" id="MarkAll"></th>
      
      
        </tr>
      </thead>
      <tbody>`;
      for (let i = 0; i < data.length; i++) {
        const lead = data[i];
        let birthDate = formatDateFromNumber(lead.birthdateNumber);
        let age = calculateAgeFromNumber(lead.birthdateNumber);
        str+=`<tr id="E_${lead.id}">`;
        str+=`<td>${lead.id}</td>`;
        str+=`<td>${lead.name}</td>`;
        str+=`<td>${lead.phone}</td>`;
        str+=`<td>${birthDate}</td>`;
        str+=`<td>${age}</td>`;
        str+=`<td>${lead.status}</td>`;
        str+=`<td>${lead.device}</td>`;
        str+=`<td>${lead.from}</td>`;
        str+=`<td><button>CLICK</button></td>`;
        str+=`<td><input onchange="MarkMe(this)" class="marksIN"  type="checkbox" name="markMe" id="MarkMe_${lead.id}"></td>`;
        str+=`</tr>`;
        
      }
        
      str+=` </tbody>
       <tfoot>
        <tr>
            <th>תז</th>
            <th>שם מלא</th>
            <th>מס טלפון</th>
            <th>תאריך לידה</th>
            <th>גיל</th>
            <th>סטטוס</th>
            <th>מכשיר</th>
            <th>מאיפה</th>
            <th>פעולות</th>
            <th>סמן</th>
        </tr>
      </tfoot>
    </div></table>`;

    document.getElementById('ph').innerHTML=str;
    new DataTable('#dataTable-Leads',{
        order: [[0, 'desc']]
      });

}

//------****************Renders******************------\\




const changeAllMarks=(elm)=>{
    //console.log(elm.checked)
    const arrayOfMarks = document.getElementsByClassName('marksIN');
    for (let i = 0; i < arrayOfMarks.length; i++) {
        const element = arrayOfMarks[i];
        element.checked = elm.checked;
       // console.log('element',element);
       if (elm.checked==true) {
        let id=parseInt(element.id.replace('MarkMe_',''));
        let lead = getObjectById(id,Global_Leads);
        Global_ArrayToExcel.push(lead)
       }


        
    }
    if (elm.checked==false) {
        Global_ArrayToExcel=[];
    }
}
const MarkMe=(elm)=>{
    let id=elm.id.replace('MarkMe_','');

    if (elm.checked) {
        let lead = getObjectById(id,Global_Leads);
        Global_ArrayToExcel.push(lead)  
    }
    else {
        Global_ArrayToExcel = removeObjectById(id,Global_ArrayToExcel);
    }
}


const exportLeadsToExcel = ()=>{
    //if need custom so its need to be here.. to - Global_ArrayToExcel
    jsonToExcelAndDownload(Global_ArrayToExcel,'test');
}


function getObjectById(id, arrayOfObjects) {
    for (let obj of arrayOfObjects) {
      if (obj.id == id) {
        return obj;
      }
    }
    return null; // Return null if no object with the given id is found
}
function removeObjectById(idToRemove, array) {
    let newarray=[];
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        console.log('to see ',idToRemove,element.id )
        if (idToRemove!=element.id) {
            newarray.push(element);
        }
        
    }
    return newarray;
}

function jsonToExcelAndDownload(data, fileName) {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'sheet1');
    XLSX.writeFile(wb, fileName + '.xlsx');
}



const isUserMobile = () => {
    if (/Mobi/.test(navigator.userAgent)) {
        // User is on a mobile device
        //console.log("User is on a mobile device.");
        return true;
    } else {
        // User is on a desktop device
        //console.log("User is on a desktop device.");
        return false;
    }
}


const backtoMainPage=()=>{
    RenderHeader(); 
    RenderMainDashboard();
    RenderBarCharMain();
    RenderPieChartMain();
}

function formatDateFromNumber(number) {
    // Create a new Date object with the given number of milliseconds since January 1, 1970
    const date = new Date(number);
  
    // Get the day, month, and year components from the date object
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits (e.g., '01' instead of '1')
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
    const year = date.getFullYear();
  
    // Return the formatted date string in the format dd/mm/yyyy
    return `${day}/${month}/${year}`;
}

function calculateAgeFromNumber(number) {
    // Create a new Date object with the given number of milliseconds since January 1, 1970
    const date = new Date(number);
    
    // Get the current date
    const currentDate = new Date();
  
    // Calculate the difference in years between the current year and the year of the input date
    const age = currentDate.getFullYear() - date.getFullYear();
  
    // Check if the current date has passed the birthday of the person
    // If the current month is before the birth month, or if it's the birth month but the current day is before the birth day,
    // we subtract 1 from the age
    if (
      currentDate.getMonth() < date.getMonth() ||
      (currentDate.getMonth() === date.getMonth() && currentDate.getDate() < date.getDate())
    ) {
      return age - 1;
    }
  
    // Otherwise, return the calculated age
    return age;
}


function sendEmail(To,Subject,Body) {




    Email.send({
        SecureToken:'9512cd3e-b42e-4791-8bb0-7294b2bc2dfb',
        To: To,
        From: "gilad.meirson@gmail.com",
        Subject: Subject,
        Body:Body,
    }).then(
        //message =>swal("The message sent successfully!", "I will answer soon..", "success")
        alert('succses')
    );

  



}


const PUT = (id,ref,newValue)=>{
   let array =  fetchDataFromFirebase(ref);
   for (let obj of array) {
    if (obj.id === id) {
      obj = newValue;
    }
  }
  let res = Save2Once(ref,array);
  
}

