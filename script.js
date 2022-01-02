const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities=[];
fetch(endpoint)
.then(rawData=>rawData.json())
.then(data=>{
    // data.forEach(city => {
    //     cities.push(city);
        
    // });
    cities.push(...data);
});


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


getData=(city,cities)=>{
    const regex=new RegExp(city,'gi');
    let filteredCities=[];
     
    filteredCities=cities.filter(element=> 
        {
            return element.city.match(regex) || element.state.match(regex);
        } );
       
    return filteredCities;
}

displayData=(event)=>{
    const resData=getData(event.target.value,cities);
    const regex=new RegExp(event.target.value,'gi');
    const name=event.target.value;
    

    let html=resData.map(element=>{
    let cityName=element.city.replace(regex,`<span class="hl">${name}</span>`);
    let stateName=element.state.replace(regex,`<span class="hl">${name}</span>`);


        return `
        <li>
        <span class="name"> ${cityName} , ${stateName} </span>
        <span class="population">${numberWithCommas(element.population   )}</span>
        </li>


        
        `
    }).join(' ');

    document.querySelector('.suggestions').innerHTML=html;

    

    
}

document.querySelector('.search').addEventListener('change',displayData);
document.querySelector('.search').addEventListener('keyup',displayData);



