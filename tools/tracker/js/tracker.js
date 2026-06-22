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

        recovery: 85,

        weight: 82.1,

        today: "Push + CrossFit"

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

        }

    }

},

    init(){

        console.log(
            "HYBRID TRACKER",
            this.version
        );

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

</div>

`;

    },
	
	renderTraining(){

    const workout =
        this.workouts.week1.monday;

    let html = `

    <div class="card">

        <h2>${workout.name}</h2>

        <p>

            Duración:
            ${workout.duration} min

        </p>

    </div>

    `;

    workout.exercises.forEach(exercise=>{

        html += `

        <div class="card">

            <h3>

                ${exercise.name}

            </h3>

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