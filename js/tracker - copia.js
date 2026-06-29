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

                const id =
                button.dataset.page;

                document
                    .getElementById(id)
                    .classList
                    .add("active-page");

            });

        });

    }

};

document.addEventListener(

    "DOMContentLoaded",

    ()=>Tracker.init()

);