let form = document.querySelector('form')
let defurl = "https://geo.ipify.org/api/v1?apiKey=at_yQx2FT2NVJhjsBY2BVBJjgP9c0dmd&ipAddress=192.212.174.101"
gen(defurl)
var mymap = null;
async function gen(url)
{
    try
    {
    document.querySelector('#error').classList.add('hide')
    let response = await axios.get(url)
    let data = response.data
    let loc = data.location.city + ', ' + data.location.region + ', ' + data.location.country + " " + data.location.postalCode
    let isp = data.isp
    let address = data.ip
    let time = data.location.timezone
    let locx = data.location.lat
    let locy = data.location.lng
    document.querySelector('.ip').innerText = address
    document.querySelector('.loc').innerText = loc
    document.querySelector('.time').innerText = time
    document.querySelector('.isp').innerText = isp
    mapgen(locx, locy)
    }
    catch(e)
    {
        document.querySelector('#error').classList.remove('hide')
    }
}
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let ip = form.elements.ip.value
    let url = `https://geo.ipify.org/api/v1?apiKey=at_yQx2FT2NVJhjsBY2BVBJjgP9c0dmd&ipAddress=${ip}`
    gen(url)
})

function mapgen(x, y) {
    let container = document.querySelector('.container')
    document.querySelector('#mapid').remove()
    let mp = document.createElement('div')
    mp.id = 'mapid'
    container.appendChild(mp)
    mymap = L.map('mapid').setView([x, y], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoicmV0cm8tdmlzaW9uIiwiYSI6ImNrazUzZzhlaTA3bWkycW83NXV3MnR6N2YifQ.rPZxt3QUArYtPkZr-drpbQ'
    }).addTo(mymap);
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="46" height="56"><path fill-rule="evenodd" d="M39.263 7.673c8.897 8.812 8.966 23.168.153 32.065l-.153.153L23 56 6.737 39.89C-2.16 31.079-2.23 16.723 6.584 7.826l.153-.152c9.007-8.922 23.52-8.922 32.526 0zM23 14.435c-5.211 0-9.436 4.185-9.436 9.347S17.79 33.128 23 33.128s9.436-4.184 9.436-9.346S28.21 14.435 23 14.435z"/></svg>';
    var iconUrl = 'data:image/svg+xml;base64,' + btoa(svg);
    var newmark = L.icon({
        iconUrl: iconUrl,
    });
    L.marker([x, y],{icon:newmark}).addTo(mymap);
}