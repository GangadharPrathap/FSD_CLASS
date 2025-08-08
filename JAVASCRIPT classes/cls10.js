var cars = [
    {
        "Image" : "https://images.timesdrive.in/thumb/msid-151044247,thumbsize-988074,width-1280,height-720,resizemode-75/151044247.jpg",
        "Price" : "1.5 Billion dollars",
        "Brand" : "Mclaren",
    },{
        "Image" : "https://irp.cdn-website.com/114aa860/import/clib/saxoninsurancebrokers_com/dms3rep/multi/Lamborghini-Aventador-SVJ-insurance.Lamborghini+Aventador+SVJ+insurance",
        "Price" : "1.2 Billion dollars",
        "Brand" : "Lamborgani",
    },{
        "Image" : "https://static1.hotcarsimages.com/wordpress/wp-content/uploads/2022/01/Acura-NSX---Front.jpg",
        "Price" : "2.1 Billion dollars",
        "Brand" : "Peugott Onyx",
    },{
        "Image" : "https://static0.carbuzzimages.com/wordpress/wp-content/uploads/gallery-images/original/1228000/0/1228091.jpg",
        "Price" : "2.0 Billion dollars",
        "Brand" : "Pagani HUayra",
    },{
        "Image" : "https://images.timesdrive.in/thumb/msid-151044247,thumbsize-988074,width-1280,height-720,resizemode-75/151044247.jpg",
        "Price" : "1.5 Billion dollars",
        "Brand" : "Mclaren",
    },{
        "Image" : "https://images.timesdrive.in/thumb/msid-151044247,thumbsize-988074,width-1280,height-720,resizemode-75/151044247.jpg",
        "Price" : "1.5 Billion dollars",
        "Brand" : "Mclaren",
    },{
        "Image" : "https://images.timesdrive.in/thumb/msid-151044247,thumbsize-988074,width-1280,height-720,resizemode-75/151044247.jpg",
        "Price" : "1.5 Billion dollars",
        "Brand" : "Mclaren",
    },{
        "Image" : "https://images.timesdrive.in/thumb/msid-151044247,thumbsize-988074,width-1280,height-720,resizemode-75/151044247.jpg",
        "Price" : "1.5 Billion dollars",
        "Brand" : "Mclaren",
    },{
        "Image" : "https://images.timesdrive.in/thumb/msid-151044247,thumbsize-988074,width-1280,height-720,resizemode-75/151044247.jpg",
        "Price" : "1.5 Billion dollars",
        "Brand" : "Mclaren",
    },{
        "Image" : "https://images.timesdrive.in/thumb/msid-151044247,thumbsize-988074,width-1280,height-720,resizemode-75/151044247.jpg",
        "Price" : "1.5 Billion dollars",
        "Brand" : "Mclaren",
    },
]
const main = cars.map((ele) => {
    return (
        `
        
        <div class="card">
            <div class="image-block">
                <div class="image"><img src="${ele.Image}" alt = ""/></div>
            </div>
            <div class="card-content">
                <div>${ele.Price}</div>
                <div>${ele.Brand}</div>
            </div>
        </div>
    `
    )
})
var parent = document.getElementsByClassName("parent")[0];
parent.innerHTML = main.join("");