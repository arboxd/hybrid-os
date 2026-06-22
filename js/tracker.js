/*
===========================================
HYBRID TRACKER
Version 0.2.0
Build 0004
===========================================
*/

const Tracker = {

    version: "0.2.0",

    state: {
		

        week: 1,
		
		selectedWeek: 1,

		selectedDay: "monday",

        recovery: 85,

        weight: 82.1,

        today: "Push + CrossFit",
		
		completedExercises: {},
		
		exerciseData:{},

    },
	
			profile: {

    name: "Obed",

    age: 38,

    height: 171,

    weight: 82.1,

    targetWeight: 77,

    goal: "HYROX + Spartan",

    gym: "Smart Fit Tepozan"

},

	
	workouts: {

   week1:{

    monday:{
        name:"Push + CrossFit",
        duration:90,
        exercises:[
            {name:"Press banca",sets:4,reps:"6-8",weight:60},
            {name:"Press inclinado mancuerna",sets:3,reps:"8-10",weight:22.5},
            {name:"Press militar",sets:3,reps:"8-10",weight:20},
            {name:"Elevaciones laterales",sets:3,reps:"15",weight:10},
            {name:"CrossFit WOD",sets:1,reps:"Libre",weight:0}
        ]
    },

    tuesday:{
        name:"Running + Pull",
        duration:75,
        exercises:[
            {name:"Running Z2",sets:1,reps:"5 km",weight:0},
            {name:"Dominadas",sets:4,reps:"5",weight:0},
            {name:"Remo con barra",sets:4,reps:"8-10",weight:50},
            {name:"Jalón al pecho",sets:3,reps:"10-12",weight:55},
            {name:"Curl bíceps",sets:3,reps:"12",weight:12}
        ]
    },

    wednesday:{
        name:"Natación + Pierna",
        duration:90,
        exercises:[
            {name:"Natación técnica",sets:1,reps:"1200 m",weight:0},
            {name:"Sentadilla",sets:4,reps:"6-8",weight:80},
            {name:"Peso muerto rumano",sets:3,reps:"8-10",weight:70},
            {name:"Prensa",sets:3,reps:"12",weight:140},
            {name:"Pantorrilla",sets:4,reps:"15",weight:60}
        ]
    },

    thursday:{
        name:"Tempo Run + Upper",
        duration:80,
        exercises:[
            {name:"Tempo Run",sets:1,reps:"6 km",weight:0},
            {name:"Press militar",sets:4,reps:"8",weight:22.5},
            {name:"Remo mancuerna",sets:3,reps:"10",weight:25},
            {name:"Face Pull",sets:3,reps:"15",weight:25},
            {name:"Plancha",sets:3,reps:"60 seg",weight:0}
        ]
    },

    friday:{
        name:"Natación + Full Body",
        duration:90,
        exercises:[
            {name:"Natación continua",sets:1,reps:"1500 m",weight:0},
            {name:"Sentadilla frontal",sets:3,reps:"8",weight:60},
            {name:"Press banca",sets:3,reps:"8",weight:55},
            {name:"Dominadas",sets:3,reps:"5",weight:0},
            {name:"Farmer Walk",sets:4,reps:"30 m",weight:24}
        ]
    },

    saturday:{
        name:"Long Run",
        duration:75,
        exercises:[
            {name:"Carrera larga",sets:1,reps:"10-14 km",weight:0},
            {name:"Movilidad",sets:1,reps:"20 min",weight:0}
        ]
    },

    sunday:{
        name:"Recovery",
        duration:30,
        exercises:[
            {name:"Movilidad",sets:1,reps:"20 min",weight:0},
            {name:"Foam Roller",sets:1,reps:"15 min",weight:0},
            {name:"Estiramiento",sets:1,reps:"15 min",weight:0}
        ]
    }

}

},

   init(){

    console.log(

        "HYBRID TRACKER",

        this.version

    );

    this.loadProfile();

    this.loadTrainingProgress();
	
	this.loadExerciseData();

    this.renderDashboard();

    this.initNavigation();
	

},

    renderDashboard(){

        this.setText(
            "week",
            this.state.week
        );

        this.setText(
            "recovery",
            this.state.recovery + "%"
        );
		
		document
     .getElementById("page-container")
    .innerHTML = `

<div class="card">

    <h2>🏃 Bienvenido</h2>

    <p>
        Tu preparación para HYROX y Spartan ya está en marcha.
    </p>

</div>

<div class="card">

    <h3>📅 Entrenamiento de hoy</h3>

    <p>

        ${this.state.today}

    </p>

</div>

<div class="card">

    <h3>⚖️ Peso actual</h3>

    <h2>

        ${this.state.weight} kg

    </h2>

</div>

<div class="card">

    <h3>❤️ Recovery</h3>

    <h2>

        ${this.state.recovery}%

    </h2>

</div>

<div class="card">

    <h3>📆 Semana</h3>

    <h2>

        ${this.state.week}

    </h2>

</div>

<div class="card">

    <h3>🎯 Próximo objetivo</h3>

    <p>

        HYROX + Spartan

    </p>
	
	<button onclick="Tracker.renderProfile()">

    Editar perfil

</button>

</div>

`;

    },
	
	
	renderTraining(){

    const workout =
        this.workouts[
            "week" + this.state.selectedWeek
        ][
            this.state.selectedDay
        ];
		
		const completedCount =
    workout.exercises.filter((exercise,index)=>{

        const key =
            this.state.selectedDay + "-" + index;

        return this.state.completedExercises[key];

    }).length;

const progress =
    Math.round(
        completedCount /
        workout.exercises.length * 100
    );

    const days = [

        ["monday","Lun"],

        ["tuesday","Mar"],

        ["wednesday","Mié"],

        ["thursday","Jue"],

        ["friday","Vie"],

        ["saturday","Sáb"],

        ["sunday","Dom"]

    ];

    let html = `

    <div class="card">

        <h2>

            Semana ${this.state.selectedWeek}

        </h2>

        <div class="day-selector">

    `;

    days.forEach(day=>{

        html += `

        <button

            onclick="Tracker.changeDay('${day[0]}')"

            ${this.state.selectedDay===day[0] ? "disabled":""}

        >

            ${day[1]}

        </button>

        `;

    });

    html += `

        <div class="card">

    <h2>

        ${workout.name}

    </h2>

    <p>

        Duración:
        ${workout.duration} min

    </p>

    <p>

        Progreso:
        ${completedCount}
        /
        ${workout.exercises.length}

        (${progress}%)

    </p>

    <progress

        value="${progress}"

        max="100"

        style="width:100%;height:18px;">

    </progress>

</div>

    `;

    workout.exercises.forEach((exercise,index)=>{

    const key =
        this.state.selectedDay + "-" + index;

    const completed =
        this.state.completedExercises[key] || false;

        html += `

<div class="card">

<h3>

${completed ? "✅" : "⬜"} ${exercise.name}

</h3>

<p>

${exercise.sets} x ${exercise.reps}

</p>

<label>

Peso

</label>

<input

id="weight-${key}"

type="number"

value="${

this.state.exerciseData[key]?.weight ??

exercise.weight

}"

step="2.5"

onchange="Tracker.saveExerciseData(

'${this.state.selectedDay}',

${index}

)"
>

<label>

RPE

</label>

<input

id="rpe-${key}"

type="number"

min="1"

max="10"

value="${

this.state.exerciseData[key]?.rpe ?? ""

}"

onchange="Tracker.saveExerciseData(

'${this.state.selectedDay}',

${index}

)"
>

<label>

Notas

</label>

<textarea

id="notes-${key}"

rows="2"

onchange="Tracker.saveExerciseData(

'${this.state.selectedDay}',

${index}

)"

>${

this.state.exerciseData[key]?.notes ?? ""

}</textarea>

<br><br>

<button

onclick="Tracker.toggleExercise(
'${this.state.selectedDay}',
${index}
)"

>

${completed ? "Desmarcar" : "Completar"}

</button>

</div>

`;

    });

    document
        .getElementById("page-container")
        .innerHTML = html;

},



changeDay(day){

    this.state.selectedDay = day;

    this.renderTraining();

},


toggleExercise(day,index){

    const key = day + "-" + index;

    this.state.completedExercises[key] =
        !this.state.completedExercises[key];

    this.saveTrainingProgress();

    this.renderTraining();

},

saveExerciseData(day,index){

    const key = day + "-" + index;

    this.state.exerciseData[key]={

        weight:document.getElementById(
            "weight-"+key
        ).value,

        rpe:document.getElementById(
            "rpe-"+key
        ).value,

        notes:document.getElementById(
            "notes-"+key
        ).value

    };

    localStorage.setItem(

        "tracker-exercises",

        JSON.stringify(

            this.state.exerciseData

        )

    );

},

renderProfile(){

document.getElementById("page-container").innerHTML=`

<div class="card">

<h2>

Perfil

</h2>

<label>

Nombre

</label>

<input
id="profile-name"
value="${this.profile.name}">

<label>

Edad

</label>

<input
id="profile-age"
type="number"
value="${this.profile.age}">

<label>

Estatura (cm)

</label>

<input
id="profile-height"
type="number"
value="${this.profile.height}">

<label>

Peso (kg)

</label>

<input
id="profile-weight"
type="number"
step="0.1"
value="${this.profile.weight}">

<label>

Peso objetivo

</label>

<input
id="profile-target"
type="number"
step="0.1"
value="${this.profile.targetWeight}">

<label>

Objetivo

</label>

<input
id="profile-goal"
value="${this.profile.goal}">

<label>

Gimnasio

</label>

<input
id="profile-gym"
value="${this.profile.gym}">

<br><br>

<button
onclick="Tracker.saveProfile()">

Guardar

</button>

<button
onclick="Tracker.renderDashboard()">

Cancelar

</button>

</div>

`;

},


saveProfile(){

    this.profile.name =
        document.getElementById("profile-name").value;

    this.profile.age =
        parseInt(
            document.getElementById("profile-age").value
        );

    this.profile.height =
        parseInt(
            document.getElementById("profile-height").value
        );

    this.profile.weight =
        parseFloat(
            document.getElementById("profile-weight").value
        );

    this.profile.targetWeight =
        parseFloat(
            document.getElementById("profile-target").value
        );

    this.profile.goal =
        document.getElementById("profile-goal").value;

    this.profile.gym =
        document.getElementById("profile-gym").value;

    this.state.weight =
        this.profile.weight;

    localStorage.setItem(
        "tracker-profile",
        JSON.stringify(this.profile)
    );

    this.renderDashboard();

},


saveTrainingProgress(){

    localStorage.setItem(

        "tracker-training",

        JSON.stringify(

            this.state.completedExercises

        )

    );

},


loadProfile(){

    const profile =
        localStorage.getItem("tracker-profile");

    if(profile){

        this.profile =
            JSON.parse(profile);

        this.state.weight =
            this.profile.weight;

    }

},


loadTrainingProgress(){

    const progress =

        localStorage.getItem(

            "tracker-training"

        );

    if(progress){

        this.state.completedExercises =

            JSON.parse(progress);

    }

},


loadExerciseData(){

    const saved=

        localStorage.getItem(

            "tracker-exercises"

        );

    if(saved){

        this.state.exerciseData=

            JSON.parse(saved);

    }

},


    setText(id,value){

        const element =
        document.getElementById(id);

        if(element){

            element.textContent=value;

        }

    },

    initNavigation(){

        const buttons =
        document.querySelectorAll(".nav-btn");

        const pages =
        document.querySelectorAll(".page");

        buttons.forEach(button=>{

            button.addEventListener("click",()=>{

                buttons.forEach(btn=>
                    btn.classList.remove("active")
                );

                button.classList.add("active");

                pages.forEach(page=>
                    page.classList.remove("active-page")
                );

                const id = button.dataset.page;

if(id==="dashboard"){

    this.renderDashboard();

}

if(id==="training"){

    this.renderTraining();

}

            });

        });

    }

};

document.addEventListener(

    "DOMContentLoaded",

    ()=>Tracker.init()

);