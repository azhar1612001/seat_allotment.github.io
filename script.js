onload = function(){
    let collages = [
        {
            id : 1,
            collage : "nsit",
            total_seat : 0,
            seat_available : 0
        },
        {
            id : 2,
            collage : "dtu",
            total_seat : 0,
            seat_available : 0
        },
        {
            id : 3,
            collage : "iiit",
            total_seat : 0,
            seat_available : 0
        },
        {
            id : 4,
            collage : "igdtu",
            total_seat : 0,
            seat_available : 0
        }
    ];
    for(let i=0;i<collages.length;i++){
        collages[i].seat_available=collages[i].total_seat=Math.floor(Math.random()*50)+30;
    }
    // console.log(collages);
    const num_of_students = Math.floor(Math.random()*500)+100;
    const students = [];
    for(let i=0 ;i <num_of_students ;i++){
        let num_of_preferences = Math.floor(Math.random()*collages.length)+1;
        let perferences = []
        let coll = [];
        for(let j=0; j<num_of_preferences; j++)coll.push(j);
        for(let j=0 ;j<num_of_preferences ;j++){
            let ind = Math.floor(Math.random()*coll.length);
            let options = {
                preference_number : j+1,
                collage_index : coll[ind]
            }
            perferences.push(options);
            coll.splice(ind,1);  //removing the chosen collage
        }
        let student = {
            id : i+1,
            name : makename(),
            perference : perferences,
            allotated_collage : {
                status : false,
                collage : "None"
            },
            percentage : Math.floor(Math.random()*100)+1
        }
        students.push(student);
    }

    //sorting compare return negative 1st will be 1st, return positive 2nd will be 1st, return 0 no change 
    students.sort(function(stud1,stud2){return stud2.percentage-stud1.percentage});


    let table = document.getElementById("myTable");

    //console.log(students);

    //alloting each student 
    for(let i=0; i<num_of_students ; i++){
        for(let j=0 ;j<students[i].perference.length ;j++){
            // console.log(students[i].perference[j]);
            if(collages[students[i].perference[j].collage_index].seat_available>0){
                collages[students[i].perference[j].collage_index].seat_available--;
                students[i].allotated_collage.status = true;
                students[i].allotated_collage.collage = collages[students[i].perference[j].collage_index].collage;
                // console.log(students[i]);
                break;
            }
        }
        let cell = table.insertRow();
        cell.innerHTML = `
        <th>${students[i].name}</th>
        <th>${students[i].allotated_collage.status}</th>
        <th>${students[i].allotated_collage.collage}</th>
        <th>${students[i].percentage}</th>
        `;
    }
}

function makename() {
    let name = "";
    let possible = "abcdefghijklmnopqrstuvwxyz";
  
    for (let i = 0; i < 5; i++){
        name += possible.charAt(Math.floor(Math.random() * possible.length));
    }
  
    return name;
}
  