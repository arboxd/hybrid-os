/*
==================================================
 HYBRID TRACKER
 Version : 0.3.0
 Build   : 0005
==================================================
*/

class HybridTracker {

    constructor() {

        this.profile = {

            name: "Obed",

            age: 38,

            height: 171,

            weight: 82.1,

            targetWeight: 77,

            goal: "HYROX + Spartan"

        };

        this.state = {

            currentTab: "dashboard",

            currentWeek: 1,

            recovery: 85

        };

        this.workouts = this.loadDefaultWorkouts();

    }

    init() {

        this.bindNavigation();

        this.render();

    }

    render() {

        switch (this.state.currentTab) {

            case "dashboard":

                this.renderDashboard();

                break;

            case "training":

                this.renderTraining();

                break;

            case "running":

                this.renderRunning();

                break;

            case "swimming":

                this.renderSwimming();

                break;

            case "recovery":

                this.renderRecovery();

                break;

            case "history":

                this.renderHistory();

                break;

        }

    }

    bindNavigation() {

        const buttons = document.querySelectorAll(".nav-btn");

        buttons.forEach(button => {

            button.addEventListener("click", () => {

                buttons.forEach(btn =>
                    btn.classList.remove("active")
                );

                button.classList.add("active");

                this.state.currentTab =
                    button.dataset.page;

                this.render();

            });

        });

    }

    page() {

        return document.getElementById("page-container");

    }

    renderDashboard() {

        document.getElementById("week").textContent =
            this.state.currentWeek;

        document.getElementById("recovery").textContent =
            this.state.recovery + "%";

        this.page().innerHTML = `
        
        <div class="card">

            <h2>
                Bienvenido ${this.profile.name}
            </h2>

            <p>
                Objetivo actual:
                <strong>${this.profile.goal}</strong>
            </p>

        </div>

        <div class="card">

            <h3>Peso</h3>

            <h1>${this.profile.weight} kg</h1>

            <p>
                Meta:
                ${this.profile.targetWeight} kg
            </p>

        </div>

        <div class="card">

            <h3>Entrenamiento de Hoy</h3>

            <h2>Push + CrossFit</h2>

            <p>

                Duración estimada

                90 min

            </p>

        </div>

        <div class="card">

            <h3>

                Próxima Competencia

            </h3>

            <h2>

                HYROX

            </h2>

            <p>

                Preparación Semana
                ${this.state.currentWeek}

            </p>

        </div>

        `;

    }

    renderTraining() {

        this.page().innerHTML = `

        <div class="card">

            <h2>

                Workout Player

            </h2>

            <p>

                Disponible en la siguiente entrega.

            </p>

        </div>

        `;

    }

    renderRunning() {

        this.page().innerHTML = `

        <div class="card">

            <h2>

                Running

            </h2>

        </div>

        `;

    }

    renderSwimming() {

        this.page().innerHTML = `

        <div class="card">

            <h2>

                Swimming

            </h2>

        </div>

        `;

    }

    renderRecovery() {

        this.page().innerHTML = `

        <div class="card">

            <h2>

                Recovery

            </h2>

        </div>

        `;

    }

    renderHistory() {

        this.page().innerHTML = `

        <div class="card">

            <h2>

                Historial

            </h2>

        </div>

        `;

    }

    loadDefaultWorkouts() {

        return {

            week1: {

                monday: {

                    name: "Push + CrossFit"

                }

            }

        };

    }

}

document.addEventListener(

    "DOMContentLoaded",

    () => {

        const tracker =
            new HybridTracker();

        tracker.init();

    }

);