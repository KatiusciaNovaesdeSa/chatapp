var rooms = require('../model/Rooms_model')

    exports.getRooms = async function(req,res){
        try{
            let getRooms = await rooms.find()
            res.status(200).send(getRooms)
            console.log(req.params.reciever)
            console.log(req.params.sender)
        }catch(error){
            res.status(400).send({
                message:"no data",
                error:error.message
            })
        }
    }

     exports.createRoom = async function(req,res){
         await rooms.findOne({ name: req.body.name}).then(
            (result) => {
                if (result) {
                  res.status(500).send("erro user already exists")
                 
                } else {
                  
                    rooms.create({
                    id : req.body.id,
                    name : req.body.name,
                    createdDate :req.body.createdDate ,
                    editDate:req.body.editDate,
                    status:req.body.status
              
                  },
                  function (err, user) {
                    res.status(200).send("room created");
                  });
          }
        }).catch(err => {
            console.log(err)
        });
    }

    exports.editRoom = async function(req,res){
        try {
            await rooms.findOne({ name: req.body.name }).then(
                (result) => {
                    if (result) {
                      res.status(500).send("erro room already exists")
                     
                    } else {
                        rooms.updateOne({name:req.params.name}, {
                            id : req.body.id,
                            name : req.body.name,
                            createdDate :req.body.createdDate ,
                            editDate:req.body.editDate,
                            status:req.body.status
                    }).then(
                        (result) =>
                        {
                            if(result.nModified == 1){
                                res.status(200).send({
                                    message: "Room edited",
                                })
                            }else{
                                res.status(500).send({
                                    message: "Error to edit",
                                })
                            }
                        }
                    )
                    }            
                })
        } catch (error) {
            res.status(404).send({
                message: "Error to edit",
                error: error.message
            })
        }
   }


   exports.getOneRoom = async function(req,res){
    try{
        let getRooms = await rooms.find({name:req.params.name})
        res.status(200).send(getRooms)
    }catch(error){
        res.status(400).send({
            message:"no data",
            error:error.message
        })
    }
}

exports.delets = async function(req,res){
    try{
        let getRooms = await rooms.deleteOne({name:req.params.name})
        res.status(200).send(getRooms)
    }catch(error){
        res.status(400).send({
            message:"error to delete",
            error:error.message
        })
    }
}