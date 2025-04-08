
let pets = []


let cardRow = $('<div>', {class: 'row row-cols-1 row-cols-md-3 w-75 g-4'})
let cardCount = 0
let localImg = true;

async function fetchPets() {
    try {
        const response = await axios.get("/api/pets");
        //console.log(response.data);
        pets = [...response.data]

        console.log(pets)

        for(let i = 0; i < 18; i++){
    
            createCard(i)
            cardCount++;
           console.log("test")
        }

        setUpEventListeners()

    } catch (error) {
        console.log(error);
    }
}

fetchPets();

function createCard(i){
    let cardColumn = $('<div>', {class: 'col-auto mb-3'})

    let card = $('<div>', {class: 'card  border rounded-1 h-100'})

    let exitIcon = $('<button>', {class: 'exit-btn btn-close p-3 ms-auto m-1'}).attr("type", "button").attr("aria-label", "Close")

    
    let cardImage = $('<img>', {class: 'card-img-top rounded-top ps-3 pe-3'}).attr("src", pets[i].img)
    
    let cardBody = $('<div>', {class: 'card-body'})

    let petBreedContainer = $('<div>', {class: 'd-flex align-items-center'})

    let genderIcon = $('<img>', {class: 'gender-icon pe-1'})

    if(pets[i].sex == "Male") {
       genderIcon.attr("src", "icons/male.png")
    }
    else {
        genderIcon.attr("src", "icons/female.png")
    }

    
    let petBreed = $('<p>', {class: 'pet-breed'}).text(pets[i].breed)
    let petName = $('<span>', { class: 'pet-name' }).text(pets[i].name)
    let cardTitle = $('<h5>', { class: 'card-title' }).append(petName).append(" " + pets[i].petTitle)
    

    let cardText = $('<p>', {class: 'card-text'}).text(pets[i].shortDescription)

    let cardButton = $('<button>', {class: 'view-btn btn btn-primary mb-3 ms-3 me-3 '}).text("Get to Know " + pets[i].name).attr("type", "button").attr("data-bs-toggle", "modal").attr("data-bs-target", "#viewModal")

    

    cardRow.append(cardColumn)

    cardColumn.append(card)


    card.append(exitIcon,cardImage, cardBody, cardButton)

    cardBody.append(petBreedContainer, cardTitle, cardText)

    petBreedContainer.append(genderIcon, petBreed)


    $('section').append(cardRow)

}

function setUpEventListeners() {
    let cards = document.querySelectorAll('.col-auto')

    let exitButtons = document.querySelectorAll('.exit-btn')

    let viewButtons = document.querySelectorAll('.view-btn')

    let row = document.querySelector('.row');

    row.addEventListener('click', function(e){
        if (e.target && e.target.classList.contains('view-btn')) {
    
            const index = [...document.querySelectorAll('.view-btn')].indexOf(e.target)
        
            $('.pet-image').attr("src", pets[index].img)
            $('.modal-petName').text(pets[index].name + " " + pets[index].petTitle)
            $('.modal-petType').text(`Type: ${pets[index].type}`)
            $('.modal.petBreed').text(`Breed: ${pets[index].breed}`)
            $('.modal-petSex').text(`Sex: ${pets[index].sex}`)
            $('.modal-petNeutred').text(`Sprayed/Neutred: ${pets[index].neutred}`)
            $('.modal-petAge').text(`Age: ${pets[index].age}`)
            $('.modal-petID').text(`Animal ID: ${pets[index].animalID}`)
            $('.modal-petMicrochip').text(`Microchip: ${pets[index].microChip}`)
            $('.modal-petFullDesc').text(pets[index].fullDescription)
        }
        
    })


    row.addEventListener('click', async function(e) {
        if (e.target && e.target.classList.contains('btn-close')) {
            
            try {
                
                const index = [...document.querySelectorAll('.btn-close')].indexOf(e.target)
                const card = e.target.closest('.col-auto');
                card.remove()
                
                pets.splice(index, 1)

                console.log(index)

                cardCount--
                const response = await axios.delete(`/api/pets/${index}`);
        
            } catch (error) {
                console.log(error);
            }

            
        }
    })




    $(document).ready(function(){
        $(".col-auto").slice(0, 9).fadeIn()
        $(".load-btn").click(function() {
            $(".col-auto").slice(0, 100).fadeIn()
            $(this).fadeOut()
        })
    })


    $('.submit-btn').on("click", async function() {


        let modalName = document.querySelector(".modal-createName").value
        let modalTitle = document.querySelector(".modal-createTitle").value
        let modalAge = document.querySelector(".modal-createAge").value
        let modalType = document.querySelector(".modal-createType").value
        let modalBreed = document.querySelector(".modal-createBreed").value
        let modalSex = $(".modal-createSex").val()
        let modalNeutered = $(".modal-createNeutered").val()
        let modalShortDesc = $(".modal-createShortDesc").val()
        let modalFullDesc = $(".modal-createFullDesc").val()

        let modalImage = document.querySelector(".modal-createImg").files[0]; 
        let imageUrl = modalImage ? URL.createObjectURL(modalImage) : "images/Barkvinci-ThePaintingDog.jpg";


        let newData = {
            img: imageUrl,
            name: modalName,
            petTitle: modalAge,
            breed: modalBreed,
            type: modalType,
            sex: modalSex,
            neutered: modalNeutered,
            age: modalAge,
            animalID: Math.floor(100000 + Math.random() * 900000),
            microChip: Math.floor(10**14 + Math.random() * 9 * 10**14).toString(),
            shortDescription: modalShortDesc,
            fullDescription: modalFullDesc
        }


        pets.push(
            newData
        )

        console.log(pets)


        const response = await axios.post(`/api/pets/`, newData);
        
        createCard(pets.length-1)
        $(".col-auto").slice(0, 9).fadeIn()
        $(".col-auto").slice(0, 100).fadeIn()
        $(".load-btn").fadeOut()
    })


}




