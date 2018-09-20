export const APIURL = 'http://127.0.0.1:8000/api/'

// export const APIURL = 'https://setsandreps.fitness/api/'

export function new_set(exerciseid, previous, weight, reps, sessionid, order) {
 return fetch(`${APIURL}set/new-set/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + JSON.parse(localStorage.getItem('api-token'))
            },
            body: JSON.stringify({
                exercise_id: exerciseid,
                previous: previous,
                weight: weight,
                reps: reps,
                session_id: sessionid,
                order: order
            })
        })
            .then(r => r.json())
    }