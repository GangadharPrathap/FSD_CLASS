function getHedd() {
    var tag = document.getElementsByTagName("input")[0].value;

    var data = document.getElementsByTagName("input")[1].value;

    let NewElement = document.createElement(tag);
    // console.log(NewElement);
    NewElement.innerHTML = data;
    // NewElement.setAttribute("class", "heading");
    let parent = document.getElementsByTagName("body")[0];
    parent.appendChild(NewElement);
}
