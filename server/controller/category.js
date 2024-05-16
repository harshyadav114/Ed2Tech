const Category=require('../model/category');
const Course=require('../model/course');

function getrandnum(len){
    return Math.floor(Math.random()*len);
}

exports.createCategory=async(req,res) =>{
    try{
        const {name,description}=req.body;
        
        if(!name || !description){
            return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
        }
        const category=await Category.create({name,description});
        
        return res.status(200).json({
			success: true,
			message: "Categorys Created Successfully",
		});
    }catch(error){
        return res.status(500).json({
			success: false,
			message: error.message,
		});
    }
}

exports.showAllCategory=async(req,res) =>{
    try{
        const categories=await Category.find({}).populate('courses').exec();
        res.status(200).json({
			success: true,
			data: categories,
		});
    }catch(error){
        return res.status(500).json({
			success: true,
			message: error.message,
		});
    }
}
exports.showAllCategorywithpublishedCourse=async(req,res) =>{
    try{
        const categories=await Category.find({})
                .populate({
                    path:'courses',
                    match:{status:'Published'},
                    options: { minMatch: 1 }
                }
                ).exec();
        const cate=categories?.filter((cat)=>cat.courses.length>0);
        console.log(cate)
        res.status(200).json({
			success: true,
			data: cate,
		});
    }catch(error){
        return res.status(500).json({
			success: true,
			message: error.message,
		});
    }
}

exports.categoryDetails=async(req,res) =>{
    try{
        const {categoryid}=req.body;
        console.log(categoryid);
        const category=await Category.findById(categoryid)
                            .populate({
                                path:'courses',
                                match:{status:'Published'},
                                populate:{
                                    path:'ratingandreview'
                                }
                            }).exec();
        console.log(category)
        if(!category){
            return res.status(404).json({ error: "Category not found" })
        }
        if(category.length === 0){
            console.log("No courses found for the selected category.")
            return res.status(404).json({
                success: false,
                message: "No courses found for the selected category.",
            })
        }
        console.log('done2')
        const differentcategory=await Category.find({_id:{$ne:category._id}});
        console.log(differentcategory);
        console.log(differentcategory[getrandnum(differentcategory.length)]._id)
        const randomcategory=await Category.findById(differentcategory[getrandnum(differentcategory.length)]._id)
                                                                        .populate({
                                                                            path:'courses',
                                                                            match:{status:'Published'},
                                                                            populate:{
                                                                                path:'ratingandreview'
                                                                            }
                                                                        }).exec();

        //most selling !!!
                                                          
        const allCategories = await Category.find({})
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "instructorname",
        },
        })
        .exec()
        
      const allCourses = allCategories.flatMap((category) => category.courses);
      
      const mostSellingCourses = allCourses
        .sort((a, b) => b.studentenrolled - b.studentenrolled)
        .slice(0, 10)
                                  
        res.status(200).json({
            success: true,
            data: {
                category,
                randomcategory,
                mostSellingCourses
            },
        })                                                                    
    }catch(error){
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}