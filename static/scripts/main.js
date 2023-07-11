function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    var content = document.getElementById('content');
    var control = document.getElementById('control');

    control.classList.toggle('rotate-180');
    sidebar.classList.toggle('sidebar-closed');
    content.classList.toggle('sidebar-closed');
    content.classList.toggle('sidebar-open');
}

function openModal() {
    var modal = document.getElementById('modal');
    modal.style.display = 'flex';
}


function activateGridItem(item) {
    var gridItems = document.getElementsByClassName('grid-item');
    for (var i = 0; i < gridItems.length; i++) {
        if (gridItems[i] !== item) {
            gridItems[i].classList.remove('active');
            gridItems[i].classList.remove('font-black');
        }
    }
    item.classList.add('active');
    item.classList.add('font-black');
}

function closeModal() {
    var modal = document.getElementById('modal');
    modal.style.display = 'none';
}

function toggleHiddenDiv() {
    var hiddenDiv = document.getElementById('hiddenDiv');
    hiddenDiv.classList.toggle('visible');

    var sideBar = document.getElementById('toolbar');
    sideBar.classList.remove('open');

    var openHiddenDivBtn = document.querySelector('.open-hidden-div-btn');
    openHiddenDivBtn.classList.toggle('visible');

}


$('#toolbar .hamburger').on('click', function () {
    $(this).parent().toggleClass('open');

    // $('.select-box .options-container .active').on('click', function () {
    //     $(this).parent().toggleClass('active');
    // });

    var hiddenDiv = document.getElementById('hiddenDiv');
    // hiddenDiv.classList.toggle('visible');
    hiddenDiv.classList.remove('visible');

    var openHiddenDivBtn = document.querySelector('.open-hidden-div-btn');
    // openHiddenDivBtn.classList.toggle('visible');
    openHiddenDivBtn.classList.remove('visible');
});


var map = L.map('map', {zoomControl: false, attributionControl: false}).setView([6.877, 31.3070], 6)

// zoom control options
var zoomOptions = {
    // position: 'topright'
    position: 'bottomleft'
};
// Creating zoom control
var zoom = L.control.zoom(zoomOptions);

// Adding zoom control to the map
zoom.addTo(map);

// var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
//     maxZoom: 18,
// }).addTo(map);

basemaps["Google-Hybrid"].addTo(map);

var roads = L.tileLayer.wms("http://localhost:8080/geoserver/kenya/wms",
    {
        // layers: 'kenya:road',
        // layers: 'kenya:kenya_lulc',
        layers: 'kenya:kenya_landuse',
        format: 'image/png',
        tiled: true,
        transparent: true,
        attribution: 'attribution'
    }).addTo(map);

 L.tileLayer.wms("http://localhost:8080/geoserver/kenya/wms",
    {
        // layers: 'kenya:road',
        // layers: 'kenya:kenya_lulc',
        layers: 'kenya:kenya_landuse',
        format: 'image/png',
        tiled: true,
        transparent: true,
        attribution: 'attribution'
    }).addTo(map);

var country = L.tileLayer.wms("http://localhost:8080/geoserver/kenya/wms",
    {
        layers: 'kenya:counties',
        format: 'image/png',
        tiled: true,
        transparent: true,
        attribution: 'attribution'
    }).addTo(map);


var overLays = {
    'roads': roads,
    'counties': country
}
L.control.layers(basemaps, overLays, {collapsed: true, position: 'topleft'}).addTo(map);


// L.control.sideBySide(basemaps.Dark.addTo(map), basemaps.Osm_Mapnik.addTo(map)).addTo(map)


var sideBySide;
var drawToggler = true;

function compareLayers() {
    if (drawToggler) {
        sideBySide = L.control.sideBySide(roads, country)
        sideBySide.addTo(map)
        // sideBySide.setLeftLayers(roads)
        // sideBySide.setRightLayers(country)
        drawToggler = !drawToggler;

    } else {
        drawToggler = true;
        map.removeControl(sideBySide)
    }

}


// slider control
var slider = document.getElementById("slider");
var sliderValue = document.getElementById("sliderValue");

slider.addEventListener("input", function () {
    sliderValue.textContent = slider.value;

    const value = this.value;
    this.style.background = `linear-gradient(to right, #82CFD0 0%, #82CFD0 ${value}%, #fff ${value}%, white 100%)`
});

// Set initial value to 2022
sliderValue.textContent = slider.value;

var slider = document.getElementById("slider");
var sliderValue = document.getElementById("sliderValue");
var animateButton = document.getElementById("animateButton");
var animationInterval;

slider.addEventListener("input", function () {
    sliderValue.textContent = slider.value;
});

// Set initial value to 2022
sliderValue.textContent = slider.value;

function animateSlider() {
    var targetValue = 2022 // Target value for animation
    var duration = 1000; // Animation duration in milliseconds
    var startValue = parseInt(slider.value, 10);
    var increment = (targetValue - startValue) / (duration / 10); // Increment per 10ms

    animationInterval = setInterval(function () {
        startValue += increment;
        slider.value = Math.round(startValue);
        sliderValue.textContent = slider.value;

        if (Math.abs(startValue - targetValue) < Math.abs(increment)) {
            clearInterval(animationInterval);
            slider.value = targetValue;
            sliderValue.textContent = targetValue;
        }
    }, 10);
}

function toggleAnimation() {
    if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
        animateButton.textContent = "Animate";
    } else {
        animateSlider();
        animateButton.textContent = "Stop Animation";
    }
}


// Chart Data
var chartData = {
    labels: ['Water', 'Trees', 'Vegetation', 'Crops', 'Build', 'Bare', 'Clouds'],
    datasets: [{
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', "Blue", "Purple"],
        label: 'L.U.L.C',
        data: [12, 19, 3, 5, 2, 3, 8],
        backgroundColor: [
            'rgba(255, 99, 132, 0.99)',
            'rgba(255, 159, 64, 0.99)',
            'rgba(255, 205, 86, 0.99)',
            'rgba(75, 192, 192, 0.99)',
            'rgba(54, 162, 235, 0.99)',
            'rgba(153, 102, 255, 0.99)',
            'rgba(201, 203, 207, 0.99)'
        ],
        // borderColor: 'rgba(75, 192, 192, 1)',
        borderColor: 'rgb(10,10,10)',
        borderWidth: 2
        // borderWidth: 1
    }]
};

// Chart Options
var chartOptions = {
    responsive: true,
    backgroundColor: 'rgb(10,10,10)',
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true
        }
    }
};

// Create Chart
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: chartOptions
});

var chartData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
    datasets: [{
        label: 'My Dataset',
        data: [11, 16, 7, 3, 8],
        backgroundColor: [
            'rgba(255, 99, 132, 0.99)',
            'rgba(54, 162, 235, 0.99)',
            'rgba(255, 206, 86, 0.99)',
            'rgba(75, 192, 192, 0.99)',
            'rgba(153, 102, 255, 0.99)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 2
    }]
};

// Chart Configuration
var chartConfig = {
    type: 'polarArea',
    data: chartData,
    options: {
        responsive: true,
        // backgroundColor : 'red'
    }
};

// Create Chart
var ctx = document.getElementById('barChart').getContext('2d');
var myChart = new Chart(ctx, chartConfig);


// Start Selected Option
const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");

const optionsList = document.querySelectorAll(".option");

selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");
});

optionsList.forEach(option => {
    option.addEventListener("click", () => {
        selected.innerHTML = option.querySelector("label").innerHTML;

        console.log(selected.innerHTML)

        if (selected.innerHTML == 'Eco Service 3') {
            alert("")
        }
        optionsContainer.classList.remove("active");
    });
});
//end selected option