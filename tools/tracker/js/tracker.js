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

        today: "Push + CrossFit"

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

    week1: {

        monday: {

            name: "Push + CrossFit",

            duration: 90,

            exercises: [

                {
                    name: "Press banca",
                    sets: 4,
                    reps: "6-8",
                    weight: 60
                },

                {
                    name: "Press inclinado mancuerna",
                    sets: 3,
                    reps: "8-10",
                    weight: 22.5
                },

                {
                    name: "Press militar",
                    sets: 3,
                    reps: "8-10",
                    weight: 20
                },

                {
                    name: "Elevaciones laterales",
                    sets: 3,
                    reps: "15",
                    weight: 10
                }

            ]

        },
		
		tuesday: {

            name: "Push + CrossFit",

            duration: 90,

            exercises: [

                {
                    name: "Press banca",
                    sets: 4,
                    reps: "6-8",
                    weight: 60
                },

                {
                    name: "Press inclinado mancuerna",
                    sets: 3,
                    reps: "8-10",
                    weight: 22.5
                },

                {
                    name: "Press militar",
                    sets: 3,
                    reps: "8-10",
                    weight: 20
                },

                {
                    name: "Elevaciones laterales",
                    sets: 3,
                    reps: "15",
                    weight: 10
                }

            ]

        },
		
		wednesday: {

            name: "Push + CrossFit",

            duration: 90,

            exercises: [

                {
                    name: "Press banca",
                    sets: 4,
                    reps: "6-8",
                    weight: 60
                },

                {
                    name: "Press inclinado mancuerna",
                    sets: 3,
                    reps: "8-10",
                    weight: 22.5
                },

                {
                    name: "Press militar",
                    sets: 3,
                    reps: "8-10",
                    weight: 20
                },

                {
                    name: "Elevaciones laterales",
                    sets: 3,
                    reps: "15",
                    weight: 10
                }

            ]

        },
		
		thursday: {

            name: "Push + CrossFit",

            duration: 90,

            exercises: [

                {
                    name: "Press banca",
                    sets: 4,
                    reps: "6-8",
                    weight: 60
                },

                {
                    name: "Press inclinado mancuerna",
                    sets: 3,
                    reps: "8-10",
                    weight: 22.5
                },

                {
                    name: "Press militar",
                    sets: 3,
                    reps: "8-10",
                    weight: 20
                },

                {
                    name: "Elevaciones laterales",
                    sets: 3,
                    reps: "15",
                    weight: 10
                }

            ]

        },
		
		friday: {

            name: "Push + CrossFit",

            duration: 90,

            exercises: [

                {
                    name: "Press banca",
                    sets: 4,
                    reps: "6-8",
                    weight: 60
                },

                {
                    name: "Press inclinado mancuerna",
                    sets: 3,
                    reps: "8-10",
                    weight: 22.5
                },

                {
                    name: "Press militar",
                    sets: 3,
                    reps: "8-10",
                    weight: 20
                },

                {
                    name: "Elevaciones laterales",
                    sets: 3,
                    reps: "15",
                    weight: 10
                }

            ]

        },
		
		saturday: {

            name: "Push + CrossFit",

            duration: 90,

            exercises: [

                {
                    name: "Press banca",
                    sets: 4,
                    reps: "6-8",
                    weight: 60
                },

                {
                    name: "Press inclinado mancuerna",
                    sets: 3,
                    reps: "8-10",
                    weight: 22.5
                },

                {
                    name: "Press militar",
                    sets: 3,
                    reps: "8-10",
                    weight: 20
                },

                {
                    name: "Elevaciones laterales",
                    sets: 3,
                    reps: "15",
                    weight: 10
                }

            ]

        },
		
		sunday: {

            name: "Push + CrossFit",

            duration: 90,

            exercises: [

                {
                    name: "Press banca",
                    sets: 4,
                    reps: "6-8",
                    weight: 60
                },

                {
                    name: "Press inclinado mancuerna",
                    sets: 3,
                    reps: "8-10",
                    weight: 22.5
                },

                {
                    name: "Press militar",
                    sets: 3,
                    reps: "8-10",
                    weight: 20
                },

                {
                    name: "Elevaciones laterales",
                    sets: 3,
                    reps: "15",
                    weight: 11
                }

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

        </div>

    </div>

    <div class="card">

        <h2>

            ${workout.name}

        </h2>

        <p>

            Duración:
            ${workout.duration} min

        </p>

    </div>

    `;

    workout.exercises.forEach(exercise=>{

        html += `

        <div class="card">

            <h3>${exercise.name}</h3>

            <p>

                ${exercise.sets} x ${exercise.reps}

            </p>

            <label>Peso</label>

            <input
                type="number"
                value="${exercise.weight}"
                step="2.5">

            <label>RPE</label>

            <input
                type="number"
                min="1"
                max="10">

            <label>Notas</label>

            <textarea rows="2"></textarea>

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