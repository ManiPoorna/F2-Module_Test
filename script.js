const addStudent = document.getElementById("add");

const form = document.getElementById("form");

let totalStudents = [];

addStudent.addEventListener("click", getData);

function getData(event){
    event.preventDefault();
    const student = {
        NAME : document.getElementById('name').value,
        EMAIL :  document.getElementById('email').value,
        GPA :  document.getElementById('gpa').value,
        AGE :  document.getElementById('age').value,
        DEGREE :  document.getElementById('degree').value
    }
    totalStudents.push(student);
    // console.log(totalStudents);
    renderData(totalStudents);
    form.reset();
}

const table = document.getElementById("table");

function renderData(details){
    table.innerHTML = ` <tr>
                            <th>ID</th>
                            <th>Student Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>GPA</th>
                            <th>Degree</th>
                        </tr>`;
    let count = 1;
    // console.log(details);
    for(let i=0;i<details.length;i++){
        let eachDetail = details[i];
        const row = document.createElement('tr');
        row.id = `id${count}`;
        row.innerHTML = `<td>${count}</td>
                        <td>${eachDetail.NAME} </td>
                        <td>${eachDetail.EMAIL}</td>
                        <td>${eachDetail.AGE}</td>
                        <td>${eachDetail.GPA}</td>
                        <td class="edit-delete">
                            ${eachDetail.DEGREE}
                            <div class="changes">
                                <i class="fa-solid fa-pen edit" style="color: #d5d7db;" onclick="openEdit()"></i>
                                <i class="fa-regular fa-trash-can delete" style="color: #d5d7db;" onclick="openDelete()"></i>
                            </div>
                        </td>`
        count++;
        table.appendChild(row);
    }    
}

table.addEventListener("click", function(event) {
const clickedRow = event.target.closest("tr");

if (clickedRow) {
    const rowId = clickedRow.id;
    // console.log("Clicked row ID: " + rowId);
    const rowDetails = document.getElementById(rowId);
    // console.log(rowDetails);
    const rowData = Array.from(clickedRow.cells).map(cell => cell.textContent);
    
    //Getting details and displaying into input boxes.
    let name = document.getElementById("name");
    name.value = rowData[1];
    let email = document.getElementById("email");
    email.value = rowData[2];
    let age = document.getElementById("age");
    age.value = rowData[3];
    let gpa = document.getElementById("gpa");
    gpa.value = rowData[4].trim();
    let degree = document.getElementById("degree");
    degree.value = rowData[5].trim();


}
});


// Edit button

function openEdit(){
    const edit =document.getElementById("add");
    addStudent.value = "Edit Student";
    // console.log("Edit Opened");
    table.addEventListener("click", function(event) {
        const clickedRow = event.target.closest("tr");
        
        if (clickedRow) {
            const rowId = clickedRow.id;
            // console.log("EDIT row ID: " + rowId);
            const rowDetails = document.getElementById(rowId);
            const rowData = Array.from(clickedRow.cells).map(cell => cell.textContent);
    
            const toBeDeleted = rowData[2];
            if(addStudent){
                // rowDetails.remove();
                for(let i=0;i<totalStudents.length;i++){
                    if(totalStudents[i].EMAIL === toBeDeleted){
                        // console.log(totalStudents[i].EMAIL, toBeDeleted);
                        totalStudents.splice(i,1);
                        break;
                    }
                }
            }
        };        
    })
    edit.addEventListener('click',()=>{
        edit.value = "Add Student";
    })
}


// Delete Button

function openDelete(){
    // console.log("Delete Opened");
    table.addEventListener("click", function(event) {
        const clickedRow = event.target.closest("tr");
        
        if (clickedRow) {
            const rowId = clickedRow.id;
            // console.log("DELETE row ID: " + rowId);
            const rowDetails = document.getElementById(rowId);
            const rowData = Array.from(clickedRow.cells).map(cell => cell.textContent);
    
            const toBeDeleted = rowData[2];
            // console.log(toBeDeleted);
            rowDetails.remove();
            for(let i=0;i<totalStudents.length;i++){
                if(totalStudents[i].EMAIL === toBeDeleted){
                    // console.log(totalStudents[i].EMAIL, toBeDeleted);
                    totalStudents.splice(i,1);
                    break;
                }
            }
            // console.log(totalStudents);

            //Getting details and displaying into input boxes.
            let name = document.getElementById("name");
            name.value = "";
            let email = document.getElementById("email");
            email.value = "";
            let age = document.getElementById("age");
            age.value = "";
            let gpa = document.getElementById("gpa");
            gpa.value = "".trim();
            let degree = document.getElementById("degree");
            degree.value = "".trim();
        };        
    })
}


// Search Code


const searchInput = document.getElementById("search");

    searchInput.addEventListener("input", function() {
      const searchValue = searchInput.value.toLowerCase();
      const rows = table.getElementsByTagName("tr");
      if(searchValue === ""){
        renderData(details);
      }

      for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName("td");
        let found = false;

        for (let j = 0; j < cells.length; j++) {
          const cellValue = cells[j].textContent.toLowerCase();
          if (cellValue.includes(searchValue)) {
            found = true;
            break;
          }
        }
        if(found){
            rows[i].style.display = "";    
        }
        else{
            rows[i].style.display = "none";
        }
      }
})