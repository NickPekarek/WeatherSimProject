let locationDB = [    {
    "id": 1,
    "state": "Colorado",
    "city": "Denver"
},
{
    "id": 3,
    "state": "Minnesota",
    "city": "Minneapolis"
},
{
    "id": 4,
    "state": "Utah",
    "city": "Salt Lake City"
}
     
]

let id = 1;

module.exports = {
    read: (req, res) => {
        res.status(200).json(locationDB)
    },
    create: (req, res) => {
        let {state, city} = req.body
        let newLocation = {
            id: id,
            state: state,
            city: city
        }
        locationDB.push(newLocation)
        id++
        res.status(200).json(locationDB)
    }
}