import {type Request, type Response } from 'express';


const arrOfObj = [
    {
        id: 1,
        name : "Fatima",
        age: 9,
        course: "Web development",
        email: "fatima@gmail.com",
        isActive: true
    },
    {
        id: 2,
        name : "Haleema",
        age: 8,
        course: "Cyber Security",
        email: "Haleema@gmail.com",
        isActive: true
        
    }
];
    type UpdateUserType = {
        name? : string ;
        age? : number ;
        course? : string ;
        email? : string ;
        isActive? : boolean ;
    }
      interface Userbody  {
        id : number;
        name : string;
        age : number;
        course : string;
        email : string;
        isActive : boolean;
      }
        // GET STUDENT
       export const getStudent = ( req:Request, res:Response ) => {
            try {
                 res.status(200).json ({
                    message : 'students retrieved successfully', 
                    students : arrOfObj

                 });
            } catch (error) {
                console.log ("Error:" , error);
                res.status(500).json ({
                    message: "Internal Server Error"
                });
            } 
        }
            // ADD STUDENT
            export const addStudent = ( req:Request <{}, {}, Userbody>, res:Response) => {
                try {
                    if( !req.body.name || !req.body.age || !req.body.email || !req.body.id
                      || !req.body.course ||  typeof req.body.isActive !== 'boolean' ){
                        return res.status(400).json ({
                            message: 'Invalid request body'
                        });
                      }
                     arrOfObj.push (req.body);
                     
                     res.status (201).json ({
                        message: 'student added successfully',
                        student: req.body
                     });

                } catch (error) {
                    console.log("Error:", error);
                    res.status(500).json ({
                        message: "Internal server Errror"
                    });
                }
            }
               //UPDATE STUDENT 
export const updatestudent = (req:Request <{id: string}, {}, UpdateUserType>,
     res: Response )=> {
      try{
        const studentId = Number (req.params.id);
        const studentIndex = arrOfObj.findIndex (student => student.id === studentId);
        if (studentIndex === -1) {
            return res.status (404).json ({
                message: 'student not found'
            });
        }
        const updatestudent : UpdateUserType = {};
        
        if ( req.body.name !== undefined) {
            updatestudent.name = req.body.name;
        }
         if ( req.body.age !== undefined) {
            updatestudent.age = req.body.age;
        }
         if (req.body.email !== undefined) {
            updatestudent.email = req.body.email;
        }
            if (req.body.course !== undefined) {
            updatestudent.course = req.body.course;
        }
        
        if (req.body.isActive !== undefined) {
            updatestudent.isActive = req.body.isActive;
        }
          
        arrOfObj [studentIndex] = {
            ...arrOfObj[studentIndex],
            ...updatestudent
            
        };
         res.status(200).json({
            message: 'Student updated successfully',
            student: arrOfObj[studentIndex]
        });
         } catch (error) {
        console.log("Error:", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
    // GET STUDENT BY ID
export const getStudentById = ( req: Request<{ id: string }>, res: Response) => {
    try {
        const studentId = Number(req.params.id);

        const student = arrOfObj.find(
            student => student.id === studentId
        );

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        res.status(200).json({
            message: 'Student retrieved successfully',
            student
        });

    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
  
     // DELETE STUDENT
export const deleteStudent = (req: Request<{ id: string }>, res: Response) => {
    try {
        const studentId = Number(req.params.id);

        const studentIndex = arrOfObj.findIndex(
            student => student.id === studentId
        );

        if (studentIndex === -1) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        const deletedStudent = arrOfObj.splice(studentIndex, 1);

        res.status(200).json({
            message: 'Student deleted successfully',
            student: deletedStudent[0]
        });

    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};