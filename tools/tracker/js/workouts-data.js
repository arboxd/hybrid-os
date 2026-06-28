/*
===========================================
HYBRID TRACKER
Workout Data Module
Version 0.3.0
===========================================
*/

const WorkoutData = {

    week1: {

        monday: {
            name: "Push + CrossFit",
            duration: 90,
            exercises: [
                { name:"Press banca", sets:4, reps:"6-8", weight:60 },
                { name:"Press inclinado mancuerna", sets:3, reps:"8-10", weight:22.5 },
                { name:"Press militar", sets:3, reps:"8-10", weight:20 },
                { name:"Elevaciones laterales", sets:3, reps:"15", weight:10 },
                { name:"CrossFit WOD", sets:1, reps:"Libre", weight:0 }
            ]
        },

        tuesday: {
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

        wednesday:{name:"Natación + Pierna",duration:90,exercises:[
            {name:"Natación técnica",sets:1,reps:"1200 m",weight:0},
            {name:"Sentadilla",sets:4,reps:"6-8",weight:80},
            {name:"Peso muerto rumano",sets:3,reps:"8-10",weight:70},
            {name:"Prensa",sets:3,reps:"12",weight:140},
            {name:"Pantorrilla",sets:4,reps:"15",weight:60}
        ]},

        thursday:{name:"Tempo Run + Upper",duration:80,exercises:[
            {name:"Tempo Run",sets:1,reps:"6 km",weight:0},
            {name:"Press militar",sets:4,reps:"8",weight:22.5},
            {name:"Remo mancuerna",sets:3,reps:"10",weight:25},
            {name:"Face Pull",sets:3,reps:"15",weight:25},
            {name:"Plancha",sets:3,reps:"60 seg",weight:0}
        ]},

        friday:{name:"Natación + Full Body",duration:90,exercises:[
            {name:"Natación continua",sets:1,reps:"1500 m",weight:0},
            {name:"Sentadilla frontal",sets:3,reps:"8",weight:60},
            {name:"Press banca",sets:3,reps:"8",weight:55},
            {name:"Dominadas",sets:3,reps:"5",weight:0},
            {name:"Farmer Walk",sets:4,reps:"30 m",weight:24}
        ]},

        saturday:{name:"Long Run",duration:75,exercises:[
            {name:"Carrera larga",sets:1,reps:"10-14 km",weight:0},
            {name:"Movilidad",sets:1,reps:"20 min",weight:0}
        ]},

        sunday:{name:"Recovery",duration:30,exercises:[
            {name:"Movilidad",sets:1,reps:"20 min",weight:0},
            {name:"Foam Roller",sets:1,reps:"15 min",weight:0},
            {name:"Estiramiento",sets:1,reps:"15 min",weight:0}
        ]}
    }

};
