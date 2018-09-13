export function new_set(exerciseid, previous, weight, reps, sessionid, order) {
 return fetch('http://localhost:8000/api/set/new-set/', {
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