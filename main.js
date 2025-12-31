let ulInformation= document.querySelector(".all-content .info");
let contentData = document.querySelector(".all-content .content");


function getUsers(url){
    axios.get(url)
    .then( (response)=> {
        let users = response.data;
        listOfUesers(users)
    })
    .catch(function (error) {
        alert("there are an error:" + error)
        
    });
    
}

function listOfUesers(users){
    ulInformation.innerHTML="";
    users.forEach(user => {
        let listLi = document.createElement("li");


        let liName = document.createElement("h2");
        liName.className="name";
        liName.textContent =user.name;
        listLi.appendChild(liName);

        let liEmail = document.createElement("p");
        liEmail.className = "email";
        liEmail.textContent = user.email;
        listLi.appendChild(liEmail);

        listLi.dataset.userId =user.id;

        listLi.addEventListener("click",function(){
            selectedElement(listLi)
            filterPost(user.id)
        })

        ulInformation.appendChild(listLi);

    });

}

function selectedElement(ele){
    ulInformation.querySelectorAll(".selected").forEach(item =>{
        item.classList.remove("selected");
    });

    ele.classList.add("selected")
}

function filterPost(id){
    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
    .then((response)=>{
        let posts = response.data;
        contentDev(posts);
    })
    .catch(error=>alert("there are an error :" +error));
}


function contentDev(posts){
    contentData.innerHTML = ""
    
    posts.forEach((post)=>{
        let div = document.createElement("div");
        div.className = "data";

        let h3Title = document.createElement("h3");
        h3Title.textContent = post.title;
        div.appendChild(h3Title);

        let pBody = document.createElement("p");
        pBody.textContent = post.body;
        div.appendChild(pBody);
        contentData.appendChild(div);

    })
}

getUsers("https://jsonplaceholder.typicode.com/users")