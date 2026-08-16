const SUPABASE_URL='https://euzzimaavoqmprigbxnd.supabase.co';
const SUPABASE_KEY='sb_publishable_LCh3q5lUckmSqdovX7Kwng_Zazv1_DJ';

const db=supabase.createClient(SUPABASE_URL,SUPABASE_KEY);

let profile=null;

const $=id=>document.getElementById(id);

$('today').textContent=new Date().toLocaleDateString('en-ZA',{
    weekday:'short',
    day:'2-digit',
    month:'short',
    year:'numeric'
});


/* ==========================================
   LOGIN
========================================== */

$('loginForm').addEventListener('submit',async e=>{

    e.preventDefault();

    $('loginError').textContent='';

    const {error}=await db.auth.signInWithPassword({
        email:$('email').value,
        password:$('password').value
    });

    if(error){

        $('loginError').textContent=error.message;

    }else{

        boot();

    }

});


/* ==========================================
   LOGOUT
========================================== */

$('logout').onclick=async()=>{

    await db.auth.signOut();

    location.reload();

};


/* ==========================================
   VEHICLES FROM PUBLIC vehicles.html
   Kept in sync with the 57 vehicles displayed
   on the public Vehicle Stock page.
========================================== */

const WEBSITE_VEHICLES=[
    {
        "stock_number": "WEB-0001",
        "make": "Bmw",
        "model": "BMW E90 320i iDrive Spec",
        "year": 2010,
        "price": 109900,
        "mileage": 192451,
        "transmission": "Automatic",
        "fuel": "Petrol",
        "body_type": "",
        "description": "BMW E90 320i iDrive Spec",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/bwm 3 series.jpeg"
        ],
        "detail_page": "bmw320i.html"
    },
    {
        "stock_number": "WEB-0002",
        "make": "Nissan",
        "model": "Nissan X-Trail 2.0",
        "year": 2013,
        "price": 0,
        "mileage": 166197,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Nissan X-Trail 2.0",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/nissan.jpeg"
        ],
        "detail_page": "xtrail.html"
    },
    {
        "stock_number": "WEB-0003",
        "make": "Toyota",
        "model": "Toyota Corolla Quest 1.6 Plus",
        "year": 2018,
        "price": 129900,
        "mileage": 167330,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Toyota Corolla Quest 1.6 Plus",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/toyota quest.jpeg"
        ],
        "detail_page": "toyotaquest.html"
    },
    {
        "stock_number": "WEB-0004",
        "make": "Toyota",
        "model": "Toyota Corolla Verso 1.8 7 Seater",
        "year": 2007,
        "price": 119900,
        "mileage": 227526,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Toyota Corolla Verso 1.8 7 Seater",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/versomain.jpeg"
        ],
        "detail_page": "verso.html"
    },
    {
        "stock_number": "WEB-0005",
        "make": "Volkswagen",
        "model": "Volkswagen Tiguan 1.4 TSI",
        "year": 2016,
        "price": 129900,
        "mileage": 239585,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Volkswagen Tiguan 1.4 TSI",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/vw tiguan.jpeg"
        ],
        "detail_page": "tiguan.html"
    },
    {
        "stock_number": "WEB-0006",
        "make": "Mazda",
        "model": "Mazda 3",
        "year": 2005,
        "price": 79900,
        "mileage": 162868,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Mazda 3",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/mazda31.jpeg"
        ],
        "detail_page": "mazda3.html"
    },
    {
        "stock_number": "WEB-0007",
        "make": "Volkswagen",
        "model": "Vw Polo Vivo",
        "year": 2010,
        "price": 89900,
        "mileage": 143734,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Vw Polo Vivo",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/vwpolomain2.jpeg"
        ],
        "detail_page": "polovivo2.html"
    },
    {
        "stock_number": "WEB-0008",
        "make": "Volkswagen",
        "model": "Vw Polo Vivo",
        "year": 2010,
        "price": 99900,
        "mileage": 174994,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Vw Polo Vivo",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/vwpolomain.jpeg"
        ],
        "detail_page": "polovivo.html"
    },
    {
        "stock_number": "WEB-0009",
        "make": "Nissan",
        "model": "Nissan Qashqai 2.0 Acenta CVT",
        "year": 2014,
        "price": 129900,
        "mileage": 220069,
        "transmission": "Automatic",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Nissan Qashqai 2.0 Acenta CVT",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/nissanq main.jpeg"
        ],
        "detail_page": "nissanq.html"
    },
    {
        "stock_number": "WEB-0010",
        "make": "Hyundai",
        "model": "Hyundai Accent",
        "year": 2013,
        "price": 109900,
        "mileage": 237075,
        "transmission": "Automatic",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Hyundai Accent",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/hyundaimain.jpeg"
        ],
        "detail_page": "hyundaia.html"
    },
    {
        "stock_number": "WEB-0011",
        "make": "Renault",
        "model": "Renault Kwid 1.0",
        "year": 2026,
        "price": 119900,
        "mileage": 12066,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Renault Kwid 1.0",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/renaultkmain.jpeg"
        ],
        "detail_page": "Renaultk.html"
    },
    {
        "stock_number": "WEB-0012",
        "make": "Toyota",
        "model": "Toyota Quantum/haice 2.5D-4d Sesfikile 16S",
        "year": 2021,
        "price": 375000,
        "mileage": 15537,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Toyota Quantum/haice 2.5D-4d Sesfikile 16S",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/quantammain.jpeg"
        ],
        "detail_page": "quantum.html"
    },
    {
        "stock_number": "WEB-0013",
        "make": "Toyota",
        "model": "Toyota Corolla Prestige 1.6",
        "year": 2014,
        "price": 159900,
        "mileage": 224278,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Toyota Corolla Prestige 1.6",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/prestigemain.jpeg"
        ],
        "detail_page": "Toyotap1.html"
    },
    {
        "stock_number": "WEB-0014",
        "make": "Toyota",
        "model": "Toyota Hilux 2.5d-4d",
        "year": 2013,
        "price": 149900,
        "mileage": 222131,
        "transmission": "Manual",
        "fuel": "Diesel",
        "body_type": "",
        "description": "Toyota Hilux 2.5d-4d",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/hiluxmain.jpeg"
        ],
        "detail_page": "hilux.html"
    },
    {
        "stock_number": "WEB-0015",
        "make": "Toyota",
        "model": "Toyota Tazz 1.3 AC/SPEC",
        "year": 2005,
        "price": 69000,
        "mileage": 311908,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Toyota Tazz 1.3 AC/SPEC",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/tazzmain.jpeg"
        ],
        "detail_page": "toyotatazz.html"
    },
    {
        "stock_number": "WEB-0016",
        "make": "Volkswagen",
        "model": "Vw Tiguan 1.4 TSI",
        "year": 2012,
        "price": 99900,
        "mileage": 226800,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Vw Tiguan 1.4 TSI",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/tiguan2main.jpeg"
        ],
        "detail_page": "vwtiguan.html"
    },
    {
        "stock_number": "WEB-0017",
        "make": "Toyota",
        "model": "Toyota Corolla Prestige 1.6",
        "year": 2016,
        "price": 159900,
        "mileage": 189186,
        "transmission": "Automatic",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Toyota Corolla Prestige 1.6",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/prestige2main.jpeg"
        ],
        "detail_page": "toyotap2.html"
    },
    {
        "stock_number": "WEB-0018",
        "make": "Hyundai",
        "model": "Hyundai Ix35 2.0 Gls/Executive",
        "year": 2012,
        "price": 139900,
        "mileage": 137523,
        "transmission": "Automatic",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Hyundai Ix35 2.0 Gls/Executive",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/ix35main.jpeg"
        ],
        "detail_page": "hyundaiix35.html"
    },
    {
        "stock_number": "WEB-0019",
        "make": "Hyundai",
        "model": "Hyundai i20 1.6",
        "year": 2011,
        "price": 139900,
        "mileage": 161197,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Hyundai i20 1.6",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/hyundaii20main.jpeg"
        ],
        "detail_page": "hyundaii20.html"
    },
    {
        "stock_number": "WEB-0020",
        "make": "Volkswagen",
        "model": "Vw Polo GTI 1.4tsi DSG",
        "year": 2013,
        "price": 139900,
        "mileage": 202912,
        "transmission": "Automatic",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Vw Polo GTI 1.4tsi DSG",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/pologtimain.jpeg"
        ],
        "detail_page": "pologti.html"
    },
    {
        "stock_number": "WEB-0021",
        "make": "Ford",
        "model": "Ford Kuga 1.5 EcoBoost Ambiente",
        "year": 2015,
        "price": 129900,
        "mileage": 206267,
        "transmission": "Automatic",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Ford Kuga 1.5 EcoBoost Ambiente",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/kugamain.jpeg"
        ],
        "detail_page": "kuga.html"
    },
    {
        "stock_number": "WEB-0022",
        "make": "Ford",
        "model": "Ford Figo 1.5",
        "year": 2018,
        "price": 119900,
        "mileage": 142465,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Ford Figo 1.5",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/figomain.jpeg"
        ],
        "detail_page": "figo.html"
    },
    {
        "stock_number": "WEB-0023",
        "make": "Mitsubishi",
        "model": "Mitsubishi Triton 2.5 Diesel",
        "year": 2014,
        "price": 149900,
        "mileage": 137523,
        "transmission": "Manual",
        "fuel": "Diesel",
        "body_type": "",
        "description": "Mitsubishi Triton 2.5 Diesel",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/mitsubishmain.jpeg"
        ],
        "detail_page": "mitsubishi.html"
    },
    {
        "stock_number": "WEB-0024",
        "make": "Toyota",
        "model": "Toyota Fortuner 3.0d-4d 4x4",
        "year": 2011,
        "price": 239900,
        "mileage": 164617,
        "transmission": "Manual",
        "fuel": "Diesel",
        "body_type": "",
        "description": "Toyota Fortuner 3.0d-4d 4x4",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/fortunermain.jpeg"
        ],
        "detail_page": "fortuner.html"
    },
    {
        "stock_number": "WEB-0025",
        "make": "Hyundai",
        "model": "Hyundai i20 1.2",
        "year": 2016,
        "price": 119900,
        "mileage": 213338,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Hyundai i20 1.2",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/i1202main.jpeg"
        ],
        "detail_page": "i202.html"
    },
    {
        "stock_number": "WEB-0026",
        "make": "Opel Corsa",
        "model": "Opel Corsa Pick-Up 1.4",
        "year": 2007,
        "price": 139900,
        "mileage": 437553,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Opel Corsa Pick-Up 1.4",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/pikupmain.jpeg"
        ],
        "detail_page": "pickup.html"
    },
    {
        "stock_number": "WEB-0027",
        "make": "Hyundai",
        "model": "Hyundai H1 2.5 Diesel",
        "year": 2016,
        "price": 249900,
        "mileage": 117987,
        "transmission": "Automatic",
        "fuel": "Diesel",
        "body_type": "",
        "description": "Hyundai H1 2.5 Diesel",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/h1main.jpeg"
        ],
        "detail_page": "h1.html"
    },
    {
        "stock_number": "WEB-0028",
        "make": "Renault",
        "model": "Renault Koleos 4x4 2.5",
        "year": 2010,
        "price": 89900,
        "mileage": 152792,
        "transmission": "Automatic",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Renault Koleos 4x4 2.5",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/koleosmain.jpeg"
        ],
        "detail_page": "koleos.html"
    },
    {
        "stock_number": "WEB-0029",
        "make": "Kia",
        "model": "Kia Cerato 1.6",
        "year": 2013,
        "price": 109900,
        "mileage": 207651,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Kia Cerato 1.6",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/ceratomain.jpeg"
        ],
        "detail_page": "cerato.html"
    },
    {
        "stock_number": "WEB-0030",
        "make": "Toyota",
        "model": "Toyota Corolla Professional 1.6",
        "year": 2012,
        "price": 99000,
        "mileage": 264659,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Toyota Corolla Professional 1.6",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/corollapmain.jpeg"
        ],
        "detail_page": "corollap.html"
    },
    {
        "stock_number": "WEB-0031",
        "make": "Nissan",
        "model": "Nissan Qashqai 2.0",
        "year": 2011,
        "price": 119900,
        "mileage": 175075,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Nissan Qashqai 2.0",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/qashqaimain.jpeg"
        ],
        "detail_page": "qashqai.html"
    },
    {
        "stock_number": "WEB-0032",
        "make": "Nissan",
        "model": "Nissan Livina 1.6 7 Seater",
        "year": 2008,
        "price": 99900,
        "mileage": 215620,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Nissan Livina 1.6 7 Seater",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/nissanlmain.jpeg"
        ],
        "detail_page": "nissanl.html"
    },
    {
        "stock_number": "WEB-0033",
        "make": "Volkswagen",
        "model": "Vw Polo 6 1.4",
        "year": 2011,
        "price": 99000,
        "mileage": 205537,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Vw Polo 6 1.4",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/polotmain.jpeg"
        ],
        "detail_page": "polot.html"
    },
    {
        "stock_number": "WEB-0034",
        "make": "Volkswagen",
        "model": "Vw Polo TSI 1.2",
        "year": 2017,
        "price": 149000,
        "mileage": 156887,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Vw Polo TSI 1.2",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/polotsimain.jpeg"
        ],
        "detail_page": "polotsi.html"
    },
    {
        "stock_number": "WEB-0035",
        "make": "Volkswagen",
        "model": "Vw Polo 8 TSI",
        "year": 2021,
        "price": 169000,
        "mileage": 253619,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Vw Polo 8 TSI",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/polo8main.jpeg"
        ],
        "detail_page": "polo8.html"
    },
    {
        "stock_number": "WEB-0036",
        "make": "Hyundai",
        "model": "Hyundai Elantra 1.6",
        "year": 2018,
        "price": 149900,
        "mileage": 209483,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Hyundai Elantra 1.6",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/elantramain.jpeg"
        ],
        "detail_page": "elantra.html"
    },
    {
        "stock_number": "WEB-0037",
        "make": "Suzuki",
        "model": "Suzuki Swift 1.2",
        "year": 2023,
        "price": 149900,
        "mileage": 103484,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Suzuki Swift 1.2",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/swiftmain.jpeg"
        ],
        "detail_page": "swift.html"
    },
    {
        "stock_number": "WEB-0038",
        "make": "Chrysler",
        "model": "Chrysler Grand Voyager 2.8",
        "year": 2023,
        "price": 89900,
        "mileage": 134051,
        "transmission": "Automatic",
        "fuel": "Diesel",
        "body_type": "",
        "description": "Chrysler Grand Voyager 2.8",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/chryslermain.jpeg"
        ],
        "detail_page": "chrysler.html"
    },
    {
        "stock_number": "WEB-0039",
        "make": "Toyota",
        "model": "Toyota Corolla 1.6 Carburetor",
        "year": 1992,
        "price": 59900,
        "mileage": 189000,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Toyota Corolla 1.6 Carburetor",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/kfcmain.jpeg"
        ],
        "detail_page": "kfc.html"
    },
    {
        "stock_number": "WEB-0040",
        "make": "Mazda",
        "model": "Mazda 2 1.5",
        "year": 2009,
        "price": 79900,
        "mileage": 199143,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Mazda 2 1.5",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/mazda2main.jpeg"
        ],
        "detail_page": "mazda2.html"
    },
    {
        "stock_number": "WEB-0041",
        "make": "Chevrolet",
        "model": "Chevrolet Aveo 1.5",
        "year": 2011,
        "price": 69900,
        "mileage": 140092,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Chevrolet Aveo 1.5",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/chevmain.jpeg"
        ],
        "detail_page": "chevrolet.html"
    },
    {
        "stock_number": "WEB-0042",
        "make": "Ford",
        "model": "Ford Fiesta 1.4",
        "year": 2011,
        "price": 89900,
        "mileage": 167997,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Ford Fiesta 1.4",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/fiestamain.jpeg"
        ],
        "detail_page": "fiesta.html"
    },
    {
        "stock_number": "WEB-0043",
        "make": "Volkswagen",
        "model": "Vw Polo 8 TSI 1.0",
        "year": 2019,
        "price": 159900,
        "mileage": 221740,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Vw Polo 8 TSI 1.0",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/vwpolo8main.jpeg"
        ],
        "detail_page": "vwpolo8.html"
    },
    {
        "stock_number": "WEB-0044",
        "make": "Toyota",
        "model": "Toyota Corolla Prestige 1.6",
        "year": 2015,
        "price": 149900,
        "mileage": 224271,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Toyota Corolla Prestige 1.6",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/toyotapmain.jpeg"
        ],
        "detail_page": "toyotap3.html"
    },
    {
        "stock_number": "WEB-0045",
        "make": "Kia",
        "model": "Kia Rio 1.4",
        "year": 2012,
        "price": 99900,
        "mileage": 216790,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Kia Rio 1.4",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/riomain.jpeg"
        ],
        "detail_page": "rio.html"
    },
    {
        "stock_number": "WEB-0046",
        "make": "Renault",
        "model": "Renault Sandero 1.6",
        "year": 2011,
        "price": 74500,
        "mileage": 194929,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Renault Sandero 1.6",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/sanderomain.jpeg"
        ],
        "detail_page": "sandero.html"
    },
    {
        "stock_number": "WEB-0047",
        "make": "Kia",
        "model": "Kia Cerato 2.0 Sedan",
        "year": 2009,
        "price": 69900,
        "mileage": 211673,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Kia Cerato 2.0 Sedan",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/cerato2main.jpeg"
        ],
        "detail_page": "cerato2.html"
    },
    {
        "stock_number": "WEB-0048",
        "make": "Opel Corsa",
        "model": "Opel Astra 1.8",
        "year": 2005,
        "price": 79900,
        "mileage": 152701,
        "transmission": "Automatic",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Opel Astra 1.8",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/astramain.jpeg"
        ],
        "detail_page": "astra.html"
    },
    {
        "stock_number": "WEB-0049",
        "make": "Hyundai",
        "model": "Hyundai Creta 1.6",
        "year": 2017,
        "price": 169900,
        "mileage": 179467,
        "transmission": "Automatic",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Hyundai Creta 1.6",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/cretamain.jpeg"
        ],
        "detail_page": "creta.html"
    },
    {
        "stock_number": "WEB-0050",
        "make": "Suzuki",
        "model": "Suzuki Dzire 1.2",
        "year": 2023,
        "price": 149900,
        "mileage": 155981,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Suzuki Dzire 1.2",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/dziremain.jpeg"
        ],
        "detail_page": "dzire.html"
    },
    {
        "stock_number": "WEB-0051",
        "make": "Hyundai",
        "model": "Hyundai i20 1.6",
        "year": 2012,
        "price": 89900,
        "mileage": 219804,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Hyundai i20 1.6",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/hi20main.jpeg"
        ],
        "detail_page": "hi20.html"
    },
    {
        "stock_number": "WEB-0052",
        "make": "Ford",
        "model": "Ford Ikon",
        "year": 2013,
        "price": 79900,
        "mileage": 136157,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Ford Ikon",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/ikonmain.jpeg"
        ],
        "detail_page": "ikon.html"
    },
    {
        "stock_number": "WEB-0053",
        "make": "Volkswagen",
        "model": "Vw Polo TSI 1.2",
        "year": 2017,
        "price": 149900,
        "mileage": 212558,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Vw Polo TSI 1.2",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/tsi1main.jpeg"
        ],
        "detail_page": "tsi1.html"
    },
    {
        "stock_number": "WEB-0054",
        "make": "Hyundai",
        "model": "Hyundai Tucson 2.0",
        "year": 2018,
        "price": 189900,
        "mileage": 100717,
        "transmission": "Automatic",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Hyundai Tucson 2.0",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/tucsonmain.jpeg"
        ],
        "detail_page": "tucson.html"
    },
    {
        "stock_number": "WEB-0055",
        "make": "Ford",
        "model": "Ford Everest 2.2",
        "year": 2018,
        "price": 189900,
        "mileage": 158910,
        "transmission": "Automatic",
        "fuel": "Diesel",
        "body_type": "",
        "description": "Ford Everest 2.2",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/everestmain.jpeg"
        ],
        "detail_page": "everest.html"
    },
    {
        "stock_number": "WEB-0056",
        "make": "Volkswagen",
        "model": "Vw Polo TSI 1.2",
        "year": 2017,
        "price": 149900,
        "mileage": 213104,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Vw Polo TSI 1.2",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/tsi2main.jpeg"
        ],
        "detail_page": "tsi2.html"
    },
    {
        "stock_number": "WEB-0057",
        "make": "Volkswagen",
        "model": "Vw Polo 6 1.4",
        "year": 2011,
        "price": 99900,
        "mileage": 260391,
        "transmission": "Manual",
        "fuel": "Petrol",
        "body_type": "",
        "description": "Vw Polo 6 1.4",
        "status": "available",
        "published": true,
        "photos": [
            "pictures/cars/polo6main.jpeg"
        ],
        "detail_page": "polo6.html"
    }
];


/* ==========================================
   IMPORT PUBLIC WEBSITE VEHICLES
========================================== */

async function syncWebsiteVehicles(){

    try{

        /*
         * Reconcile every public vehicle with the CRM.
         * We deliberately do this one vehicle at a time so that one
         * bad/duplicate row cannot prevent the remaining vehicles
         * from being imported.
         */
        const {data:existing,error}=await db
            .from('vehicles')
            .select('id,stock_number,make,model,year,mileage,detail_page');

        if(error){

            console.error('Vehicle sync error:',error);
            return;

        }

        const existingRows=existing||[];

        const normalized=(value)=>
            String(value??'')
                .trim()
                .toLowerCase()
                .replace(/\s+/g,' ');

        let imported=0;
        let updated=0;
        let failed=0;

        for(const vehicle of WEBSITE_VEHICLES){

            /*
             * Stock number is the primary web identifier. The detail
             * page is used as a fallback for older CRM records that
             * were created before web stock numbers were added.
             */
            let row=existingRows.find(x=>
                normalized(x.stock_number)===normalized(vehicle.stock_number)
            );

            if(!row && vehicle.detail_page){

                row=existingRows.find(x=>
                    normalized(x.detail_page)===
                    normalized(vehicle.detail_page)
                );

            }

            if(row){

                const {error:updateError}=await db
                    .from('vehicles')
                    .update({
                        ...vehicle,
                        status:'available',
                        published:true
                    })
                    .eq('id',row.id);

                if(updateError){

                    failed++;

                    console.error(
                        'Could not update public vehicle:',
                        vehicle.stock_number,
                        updateError
                    );

                }else{

                    updated++;

                }

                continue;

            }

            const {data:inserted,error:insertError}=await db
                .from('vehicles')
                .insert({
                    ...vehicle,
                    status:'available',
                    published:true
                })
                .select('id,stock_number')
                .single();

            if(insertError){

                failed++;

                console.error(
                    'Could not import public vehicle:',
                    vehicle.stock_number,
                    insertError
                );

            }else{

                imported++;

                if(inserted){

                    existingRows.push(inserted);

                }

            }

        }

        console.log(
            `Vehicle stock sync complete: ${imported} imported, `+
            `${updated} updated, ${failed} failed, `+
            `${WEBSITE_VEHICLES.length} public vehicles checked.`
        );

        if(failed){

            console.warn(
                `${failed} public vehicle(s) could not be synchronized. `+
                'See the browser console for the exact stock numbers.'
            );

        }

    }catch(error){

        console.error(
            'Vehicle stock sync failed:',
            error
        );

    }

}


/* ==========================================
   BOOT CRM
========================================== */
/* ==========================================
   BOOT CRM
========================================== */

async function boot(){

    const {
        data:{session}
    }=await db.auth.getSession();

    if(!session){

        $('loginView').classList.remove('hidden');
        $('appView').classList.add('hidden');

        return;

    }


    const {
        data:p,
        error
    }=await db
        .from('profiles')
        .select('*')
        .eq('id',session.user.id)
        .single();


    if(error||!p){

        $('loginError').textContent=
            'Your account is not activated for the CRM. Ask the manager to add your profile.';

        await db.auth.signOut();

        return;

    }


    profile=p;


    $('loginView').classList.add('hidden');
    $('appView').classList.remove('hidden');


    $('userName').textContent=
        p.full_name||session.user.email;


    $('userRole').textContent=
        p.role==='manager'
            ?'Manager / Admin'
            :'Sales Team';


    document
        .querySelectorAll('.manager-only')
        .forEach(el=>{
            el.style.display=
                p.role==='manager'
                    ?'block'
                    :'none';
        });


    /*
       IMPORTANT:
       Never block the CRM from opening while public vehicle stock
       is being synchronized. Supabase can be slow or reject an
       individual vehicle, but Staff, Dashboard and the other CRM
       sections must still open normally.
    */

    loadPage('dashboard');

    /*
       Run the public-stock reconciliation in the background.
       Any Supabase error is caught inside syncWebsiteVehicles().
    */
    syncWebsiteVehicles()
        .catch(error=>{
            console.error('Background vehicle sync failed:',error);
        });

}


/* ==========================================
   COUNT
========================================== */

async function count(table,filter){

    let q=db
        .from(table)
        .select('*',{count:'exact',head:true});

    if(filter){

        q=q.eq(...filter);

    }

    const {count}=await q;

    return count||0;

}


/* ==========================================
   PAGE LOADER
========================================== */

async function loadPage(page){

    document
        .querySelectorAll('.nav')
        .forEach(b=>{
            b.classList.toggle(
                'active',
                b.dataset.page===page
            );
        });


    const titles={

        dashboard:'Management Dashboard',
        leads:'Leads & Customers',
        vehicles:'Vehicle Stock',
        appointments:'Appointments & Test Drives',
        tradeins:'Trade-ins',
        sales:'Sales',
        followups:'Follow-ups',
        reports:'Reports',
        staff:'Staff & Performance'

    };


    $('pageTitle').textContent=titles[page];


    if(page==='dashboard')return dashboard();
    if(page==='leads')return leads();
    if(page==='vehicles')return vehicles();
    if(page==='appointments')return appointments();
    if(page==='tradeins')return tradeins();
    if(page==='sales')return sales();
    if(page==='followups')return followups();
    if(page==='reports')return reports();


    if(page==='staff'){

        if(profile.role!=='manager'){

            return loadPage('dashboard');

        }

        return staff();

    }

}


/* ==========================================
   NAVIGATION
========================================== */

document
    .querySelectorAll('.nav')
    .forEach(b=>{

        b.onclick=()=>loadPage(
            b.dataset.page
        );

    });


/* ==========================================
   DASHBOARD
========================================== */

async function dashboard(){

    const [
        v,
        c,
        l,
        a,
        s,
        f
    ]=await Promise.all([

        count(
            'vehicles',
            ['status','available']
        ),

        count('customers'),

        count(
            'leads',
            ['status','new']
        ),

        count(
            'appointments',
            ['status','scheduled']
        ),

        count('sales'),

        count(
            'followups',
            ['status','open']
        )

    ]);


    const {data:acts=[]}=await db
        .from('activity_log')
        .select('*')
        .order(
            'created_at',
            {ascending:false}
        )
        .limit(8);


    $('page').innerHTML=`

        <div class="cards">

            <div class="card">
                <div class="label">
                    Available Stock
                </div>

                <div class="metric">
                    ${v}
                </div>
            </div>


            <div class="card">
                <div class="label">
                    Customers
                </div>

                <div class="metric">
                    ${c}
                </div>
            </div>


            <div class="card">
                <div class="label">
                    New Leads
                </div>

                <div class="metric">
                    ${l}
                </div>
            </div>


            <div class="card">
                <div class="label">
                    Open Follow-ups
                </div>

                <div class="metric">
                    ${f}
                </div>
            </div>

        </div>


        <div class="grid">

            <div class="panel">

                <h3>
                    Business Activity
                </h3>

                ${
                    acts.length
                    ?
                    acts.map(x=>`

                        <div class="row">

                            <div>

                                <strong>
                                    ${escape(x.action)}
                                </strong>

                                <div class="muted">
                                    ${escape(x.entity_type)}
                                </div>

                            </div>

                            <div class="muted">

                                ${new Date(
                                    x.created_at
                                ).toLocaleString('en-ZA')}

                            </div>

                        </div>

                    `).join('')

                    :

                    '<div class="muted">No activity yet.</div>'
                }

            </div>


            <div class="panel">

                <h3>
                    Today
                </h3>

                <div class="row">
                    <span>Appointments</span>
                    <strong>${a}</strong>
                </div>

                <div class="row">
                    <span>Total sales recorded</span>
                    <strong>${s}</strong>
                </div>

                <div class="row">
                    <span>Available stock</span>
                    <strong>${v}</strong>
                </div>

                <div class="row">
                    <span>New leads</span>
                    <strong>${l}</strong>
                </div>

            </div>

        </div>

    `;

}


/* ==========================================
   SHELL
========================================== */

function shell(content,button){

    $('page').innerHTML=`

        <div class="toolbar">

            <input
                id="search"
                placeholder="Search..."
            >

            <button
                class="smallbtn"
                id="addBtn"
            >
                ${button||'Add'}
            </button>

        </div>

        ${content}

    `;

}


/* ==========================================
   LEADS
========================================== */

async function leads(){

    const {data=[]}=await db
        .from('customers')
        .select('*,leads(status,source,created_at)')
        .order(
            'created_at',
            {ascending:false}
        );


    shell(`

        <table class="table">

            <thead>

                <tr>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Source</th>
                    <th>Lead</th>
                    <th>Added</th>
                </tr>

            </thead>

            <tbody>

                ${data.map(c=>`

                    <tr>

                        <td>
                            <strong>
                                ${escape(c.full_name)}
                            </strong>

                            <div class="muted">
                                ${escape(c.email||'')}
                            </div>
                        </td>

                        <td>
                            ${escape(c.phone||'-')}
                        </td>

                        <td>
                            ${escape(c.source)}
                        </td>

                        <td>
                            <span class="badge">
                                ${c.leads?.[0]?.status||'Customer'}
                            </span>
                        </td>

                        <td>
                            ${new Date(
                                c.created_at
                            ).toLocaleDateString('en-ZA')}
                        </td>

                    </tr>

                `).join('')}

            </tbody>

        </table>

    `,'Add Customer');


    $('search').oninput=e=>
        filterRows(e.target.value);


    $('addBtn').onclick=()=>
        customerModal();

}


/* ==========================================
   VEHICLES
========================================== */

async function vehicles(){

    /*
       Vehicle Stock is a mirror of the public vehicles.html stock.
       Only those public stock numbers are shown here, which prevents
       old/incorrect CRM-only records such as "Toyota Verso" or "mmk"
       from appearing at the bottom.
    */
    const publicStockNumbers=WEBSITE_VEHICLES.map(v=>v.stock_number);

    const {data=[]}=await db
        .from('vehicles')
        .select('*')
        .in('stock_number',publicStockNumbers);

    const publicByStock=new Map(
        WEBSITE_VEHICLES.map(v=>[v.stock_number,v])
    );

    /* Always render the public image/status even if Supabase has not
       finished the background reconciliation yet. */
    const stock=data
        .map(v=>{
            const pub=publicByStock.get(v.stock_number);
            return pub
                ? {...v,...pub,status:'available'}
                : v;
        })
        .sort((a,b)=>
            String(a.stock_number||'').localeCompare(
                String(b.stock_number||''),
                undefined,
                {numeric:true}
            )
        );


    shell(`

        <div class="vehicle-grid">

            ${stock.map(v=>`

                <div
                    class="vehicle-card"
                    data-stock="${escape(v.stock_number)}"
                    data-search="${escape(
                        [
                            v.stock_number,
                            v.make,
                            v.model,
                            v.year,
                            v.price,
                            v.mileage,
                            v.transmission,
                            v.fuel,
                            v.status
                        ].join(' ')
                    )}"
                >

                    ${
                        v.photos && v.photos.length
                        ?
                        `<img
                            src="${escape(v.photos[0])}"
                            class="vehicle-photo"
                            alt="${escape(v.make+' '+v.model)}"
                        >`
                        :
                        `<div class="vehicle-photo no-photo">
                            🚗
                        </div>`
                    }


                    <div class="vehicle-info">

                        <h3>
                            ${escape(v.make+' '+v.model)}
                        </h3>

                        <div class="muted">
                            Stock: ${escape(v.stock_number||'')}
                        </div>


                        <div class="vehicle-price">

                            ${
                                Number(v.price||0)>0
                                ?
                                'R '+Number(v.price)
                                    .toLocaleString('en-ZA')
                                :
                                'PRICE PENDING'
                            }

                        </div>


                        <div class="vehicle-details">

                            <span>
                                ${Number(v.mileage||0)
                                    .toLocaleString('en-ZA')} km
                            </span>

                        </div>


                        <div class="vehicle-bottom">

                            <span class="badge ${
                                v.status==='sold'
                                ?'red'
                                :
                                v.status==='available'
                                ?'green'
                                :''
                            }">

                                ${escape(v.status)}

                            </span>


                            ${
                                v.status!=='sold'
                                ?
                                `<button
                                    class="smallbtn sell-btn"
                                    data-id="${v.id}"
                                >
                                    SELL
                                </button>`
                                :
                                `<span class="badge red">
                                    SOLD
                                </span>`
                            }

                        </div>

                    </div>

                </div>

            `).join('')}

        </div>

    `,'Add Vehicle');


    $('search').oninput=e=>
        filterRows(e.target.value);


    $('addBtn').onclick=()=>
        vehicleModal();


    /*
       SELL BUTTONS
    */

    document
        .querySelectorAll('.sell-btn')
        .forEach(button=>{

            button.onclick=async()=>{

                const vehicleId=
                    button.dataset.id;

                await saleModalForVehicle(
                    vehicleId
                );

            };

        });

}
async function saleModalForVehicle(vehicleId){

    const {data:cs=[]}=await db
        .from('customers')
        .select('id,full_name')
        .order('full_name');


    const {data:v}=await db
        .from('vehicles')
        .select('id,make,model,year,price')
        .eq('id',vehicleId)
        .single();


    if(!v){

        alert('Vehicle not found.');
        return;

    }


    modal(
        'Sell Vehicle',

        `

        <div class="form">

            <div class="panel">

                <h3>
                    ${escape(v.make+' '+v.model)}
                </h3>

                <div class="muted">
                    ${escape(String(v.year||''))}
                    &nbsp; • &nbsp;
                    R${Number(v.price||0)
                        .toLocaleString('en-ZA')}
                </div>

            </div>


            <select id="c">

                ${cs.map(x=>`

                    <option value="${x.id}">
                        ${escape(x.full_name)}
                    </option>

                `).join('')}

            </select>


            <label>
                Salesperson
            </label>

            <input
                id="sp"
                type="text"
                value="${escape(profile?.full_name || '')}"
                readonly
                required
            />

            <input
                id="price"
                type="number"
                placeholder="Final sale price"
                value="${v.price||''}"
            >


            <input
                id="date"
                type="date"
                value="${
                    new Date()
                    .toISOString()
                    .slice(0,10)
                }"
            >


            <select id="pay">

                <option value="pending">
                    pending
                </option>

                <option value="paid">
                    paid
                </option>

                <option value="part_paid">
                    part paid
                </option>

            </select>


            <select id="delivery">

                <option value="pending">
                    pending
                </option>

                <option value="ready">
                    ready
                </option>

                <option value="delivered">
                    delivered
                </option>

            </select>

        </div>

        `,

        async d=>{

            const {
                data:s,
                error
            }=await db
                .from('sales')
                .insert({

                    customer_id:
                        d.querySelector('#c').value,

                    vehicle_id:
                        vehicleId,

                    salesperson_id:
                        profile?.id,

                    sale_price:
                        Number(
                            d.querySelector('#price').value
                        ),

                    sale_date:
                        d.querySelector('#date').value,

                    payment_status:
                        d.querySelector('#pay').value,

                    delivery_status:
                        d.querySelector('#delivery').value

                })
                .select()
                .single();


            if(error)
                throw error;


            const {
                error:vehicleError
            }=await db
                .from('vehicles')
                .update({

                    status:'sold',

                    updated_at:
                        new Date().toISOString()

                })
                .eq(
                    'id',
                    vehicleId
                );


            if(vehicleError)
                throw vehicleError;


            await log(
                'Vehicle sold',
                'sale',
                s.id
            );


            loadPage('vehicles');

        }

    );

}


/* ==========================================
   APPOINTMENTS
========================================== */

async function appointments(){

    const {data=[]}=await db
        .from('appointments')
        .select(
            '*,customers(full_name,phone),vehicles(make,model)'
        )
        .order('starts_at');


    shell(`

        <table class="table">

            <thead>

                <tr>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Vehicle</th>
                    <th>Type</th>
                    <th>Status</th>
                </tr>

            </thead>

            <tbody>

                ${data.map(a=>`

                    <tr>

                        <td>
                            ${new Date(
                                a.starts_at
                            ).toLocaleString('en-ZA')}
                        </td>

                        <td>
                            ${escape(
                                a.customers?.full_name||'-'
                            )}
                        </td>

                        <td>
                            ${escape(
                                (a.vehicles?.make||'')+
                                ' '+
                                (a.vehicles?.model||'')
                            )}
                        </td>

                        <td>
                            ${a.appointment_type.replace('_',' ')}
                        </td>

                        <td>
                            <span class="badge">
                                ${a.status}
                            </span>
                        </td>

                    </tr>

                `).join('')}

            </tbody>

        </table>

    `,'Add Appointment');


    $('addBtn').onclick=()=>
        appointmentModal();

}


/* ==========================================
   TRADE INS
========================================== */

async function tradeins(){

    const {data=[]}=await db
        .from('trade_ins')
        .select('*,customers(full_name)')
        .order(
            'created_at',
            {ascending:false}
        );


    shell(`

        <table class="table">

            <thead>

                <tr>
                    <th>Customer</th>
                    <th>Vehicle</th>
                    <th>Mileage</th>
                    <th>Offer</th>
                    <th>Status</th>
                </tr>

            </thead>


            <tbody>

                ${data.map(t=>`

                    <tr>

                        <td>
                            ${escape(
                                t.customers?.full_name||'-'
                            )}
                        </td>

                        <td>
                            ${escape(
                                [
                                    t.vehicle_year,
                                    t.vehicle_make,
                                    t.vehicle_model
                                ]
                                .filter(Boolean)
                                .join(' ')
                            )}
                        </td>

                        <td>
                            ${Number(
                                t.mileage||0
                            ).toLocaleString('en-ZA')}
                            km
                        </td>

                        <td>
                            R ${Number(
                                t.offer||0
                            ).toLocaleString('en-ZA')}
                        </td>

                        <td>
                            <span class="badge">
                                ${t.status}
                            </span>
                        </td>

                    </tr>

                `).join('')}

            </tbody>

        </table>

    `,'Add Trade-in');


    $('addBtn').onclick=()=>
        tradeModal();

}


/* ==========================================
   SALES
========================================== */

async function sales(){

    const {data=[]}=await db
        .from('sales')
        .select(
            '*,customers(full_name),vehicles(make,model,stock_number),profiles(full_name)'
        )
        .order(
            'sale_date',
            {ascending:false}
        );


    shell(`

        <table class="table">

            <thead>

                <tr>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Vehicle</th>
                    <th>Sale Price</th>
                    <th>Salesperson</th>
                    <th>Delivery</th>
                </tr>

            </thead>


            <tbody>

                ${data.map(s=>`

                    <tr>

                        <td>
                            ${s.sale_date}
                        </td>

                        <td>
                            ${escape(
                                s.customers?.full_name||'-'
                            )}
                        </td>

                        <td>
                            ${escape(
                                (s.vehicles?.make||'')+
                                ' '+
                                (s.vehicles?.model||'')
                            )}
                        </td>

                        <td>
                            R ${Number(
                                s.sale_price||0
                            ).toLocaleString('en-ZA')}
                        </td>

                        <td>
                            ${escape(
                                s.profiles?.full_name||'-'
                            )}
                        </td>

                        <td>
                            ${s.delivery_status}
                        </td>

                    </tr>

                `).join('')}

            </tbody>

        </table>

    `,'Record Sale');


    $('addBtn').onclick=()=>
        saleModal();

}


/* ==========================================
   FOLLOW UPS
========================================== */

async function followups(){

    const {data=[]}=await db
        .from('followups')
        .select(
            '*,customers(full_name),profiles(full_name)'
        )
        .order('due_at');


    shell(`

        <table class="table">

            <thead>

                <tr>
                    <th>Due</th>
                    <th>Customer</th>
                    <th>Assigned</th>
                    <th>Status</th>
                    <th>Notes</th>
                </tr>

            </thead>


            <tbody>

                ${data.map(f=>`

                    <tr>

                        <td>
                            ${new Date(
                                f.due_at
                            ).toLocaleString('en-ZA')}
                        </td>

                        <td>
                            ${escape(
                                f.customers?.full_name||'-'
                            )}
                        </td>

                        <td>
                            ${escape(
                                f.profiles?.full_name||'-'
                            )}
                        </td>

                        <td>
                            <span class="badge">
                                ${f.status}
                            </span>
                        </td>

                        <td>
                            ${escape(
                                f.notes||''
                            )}
                        </td>

                    </tr>

                `).join('')}

            </tbody>

        </table>

    `,'Add Follow-up');


    $('addBtn').onclick=()=>
        followModal();

}


/* ==========================================
   STAFF
========================================== */

async function staff(){

    const {
        data:staffs=[],
        error
    }=await db
        .from('profiles')
        .select(
            'id,full_name,role,phone,active,created_at'
        )
        .order('full_name');


    if(error){

        $('page').innerHTML=`

            <div class="panel">

                <h3>Staff</h3>

                <div class="error">
                    ${escape(error.message)}
                </div>

            </div>

        `;

        return;

    }


    const {
        data:salesData=[]
    }=await db
        .from('sales')
        .select(
            'salesperson_id,sale_price,sale_date,customers(full_name),vehicles(make,model,stock_number)'
        )
        .order(
            'sale_date',
            {ascending:false}
        );


    const stats={};


    salesData.forEach(s=>{

        const id=
            s.salesperson_id||'unassigned';

        if(!stats[id]){

            stats[id]={
                count:0,
                total:0
            };

        }

        stats[id].count++;

        stats[id].total+=Number(
            s.sale_price||0
        );

    });


    $('page').innerHTML=`

        <div class="cards">

            <div class="card">
                <div class="label">
                    Active Staff
                </div>
                <div class="metric">
                    ${staffs.filter(x=>x.active).length}
                </div>
            </div>


            <div class="card">
                <div class="label">
                    Total Sales Recorded
                </div>
                <div class="metric">
                    ${salesData.length}
                </div>
            </div>


            <div class="card">
                <div class="label">
                    Sales Value
                </div>
                <div class="metric">
                    R ${salesData.reduce(
                        (a,s)=>
                            a+Number(
                                s.sale_price||0
                            ),
                        0
                    ).toLocaleString('en-ZA')}
                </div>
            </div>


            <div class="card">
                <div class="label">
                    Team Members
                </div>
                <div class="metric">
                    ${staffs.length}
                </div>
            </div>

        </div>


        <div class="panel" style="margin-top:18px">

            <h3>
                Salesperson performance
            </h3>

            <table class="table">

                <thead>

                    <tr>
                        <th>Salesperson</th>
                        <th>Role</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Cars Sold</th>
                        <th>Sales Value</th>
                    </tr>

                </thead>


                <tbody>

                    ${staffs.map(x=>`

                        <tr>

                            <td>
                                <strong>
                                    ${escape(
                                        x.full_name||
                                        'Unnamed'
                                    )}
                                </strong>
                            </td>

                            <td>
                                ${escape(x.role)}
                            </td>

                            <td>
                                ${escape(
                                    x.phone||'-'
                                )}
                            </td>

                            <td>

                                <span class="badge ${
                                    x.active
                                    ?'green'
                                    :'red'
                                }">

                                    ${
                                        x.active
                                        ?
                                        'Active'
                                        :
                                        'Inactive'
                                    }

                                </span>

                            </td>

                            <td>
                                ${stats[x.id]?.count||0}
                            </td>

                            <td>
                                R ${Number(
                                    stats[x.id]?.total||0
                                ).toLocaleString('en-ZA')}
                            </td>

                        </tr>

                    `).join('')}

                </tbody>

            </table>

        </div>

    `;

}


/* ==========================================
   REPORTS
========================================== */

async function reports(){

    const {data:vs=[]}=await db
        .from('vehicles')
        .select('status');


    const {data:ss=[]}=await db
        .from('sales')
        .select(
            'sale_price,sale_date'
        );


    const total=ss.reduce(
        (a,s)=>
            a+Number(
                s.sale_price||0
            ),
        0
    );


    $('page').innerHTML=`

        <div class="cards">

            <div class="card">
                <div class="label">
                    Vehicles Sold
                </div>

                <div class="metric">
                    ${vs.filter(
                        v=>v.status==='sold'
                    ).length}
                </div>
            </div>


            <div class="card">
                <div class="label">
                    Available
                </div>

                <div class="metric">
                    ${vs.filter(
                        v=>v.status==='available'
                    ).length}
                </div>
            </div>


            <div class="card">
                <div class="label">
                    Reserved
                </div>

                <div class="metric">
                    ${vs.filter(
                        v=>v.status==='reserved'
                    ).length}
                </div>
            </div>


            <div class="card">
                <div class="label">
                    Recorded Sales Value
                </div>

                <div class="metric">
                    R ${total.toLocaleString('en-ZA')}
                </div>
            </div>

        </div>


        <div
            class="panel"
            style="margin-top:18px"
        >

            <h3>
                Management summary
            </h3>

            <p class="muted">

                This report is based on live records
                in the MiCarSales CRM database.

            </p>

        </div>

    `;

}


/* ==========================================
   MODAL
========================================== */

function modal(title,body,onSave){

    const d=document.createElement('div');

    d.className='modal';

    d.innerHTML=`

        <div class="modalbox">

            <div class="modalhead">

                <h3>
                    ${title}
                </h3>

                <button class="close">
                    ✕
                </button>

            </div>

            ${body}

            <button
                class="primary"
                id="saveModal"
                style="margin-top:15px"
            >
                Save
            </button>

        </div>

    `;


    document.body.appendChild(d);


    d.querySelector('.close').onclick=()=>
        d.remove();


    d.querySelector('#saveModal').onclick=async()=>{

        try{

            await onSave(d);

            d.remove();

        }catch(e){

            alert(
                e.message||e
            );

        }

    };

}


/* ==========================================
   CUSTOMER MODAL
========================================== */

function customerModal(){

    modal(
        'Add customer',

        `

        <div class="form">

            <input
                id="n"
                placeholder="Full name"
                required
            >

            <input
                id="p"
                placeholder="Phone"
            >

            <input
                id="e"
                placeholder="Email"
            >

            <select id="s">

                <option>walk-in</option>
                <option>website</option>
                <option>phone</option>
                <option>whatsapp</option>
                <option>referral</option>
                <option>social media</option>

            </select>

            <textarea
                id="notes"
                placeholder="Notes"
            ></textarea>

        </div>

        `,

        async d=>{

            const {
                data:c,
                error
            }=await db
                .from('customers')
                .insert({

                    full_name:
                        d.querySelector('#n').value,

                    phone:
                        d.querySelector('#p').value,

                    email:
                        d.querySelector('#e').value,

                    source:
                        d.querySelector('#s').value,

                    notes:
                        d.querySelector('#notes').value,

                    created_by:
                        profile.id

                })
                .select()
                .single();


            if(error)throw error;


            await log(
                'Customer added',
                'customer',
                c.id
            );


            loadPage('leads');

        }

    );

}


/* ==========================================
   VEHICLE MODAL
========================================== */

function vehicleModal(){

    modal(
        'Add vehicle',

        `

        <div class="form">

            <input
                id="stock"
                placeholder="Stock number"
                required
            >

            <input
                id="make"
                placeholder="Make"
                required
            >

            <input
                id="model"
                placeholder="Model"
                required
            >

            <input
                id="year"
                type="number"
                placeholder="Year"
            >

            <input
                id="price"
                type="number"
                placeholder="Price"
            >

            <input
                id="mileage"
                type="number"
                placeholder="Mileage"
            >

            <input
                id="trans"
                placeholder="Transmission"
            >

            <input
                id="fuel"
                placeholder="Fuel"
            >

            <select id="status">

                <option value="available">
                    available
                </option>

                <option value="reserved">
                    reserved
                </option>

                <option value="sold">
                    sold
                </option>

            </select>

        </div>

        `,

        async d=>{

            const {
                data:v,
                error
            }=await db
                .from('vehicles')
                .insert({

                    stock_number:
                        d.querySelector('#stock').value,

                    make:
                        d.querySelector('#make').value,

                    model:
                        d.querySelector('#model').value,

                    year:
                        Number(
                            d.querySelector('#year').value
                        )||null,

                    price:
                        Number(
                            d.querySelector('#price').value
                        )||0,

                    mileage:
                        Number(
                            d.querySelector('#mileage').value
                        )||0,

                    transmission:
                        d.querySelector('#trans').value,

                    fuel:
                        d.querySelector('#fuel').value,

                    status:
                        d.querySelector('#status').value,

                    published:true

                })
                .select()
                .single();


            if(error)throw error;


            await log(
                'Vehicle added',
                'vehicle',
                v.id
            );


            loadPage('vehicles');

        }

    );

}


/* ==========================================
   APPOINTMENT
========================================== */

async function appointmentModal(){

    const {data:cs=[]}=await db
        .from('customers')
        .select('id,full_name')
        .order('full_name');


    const {data:vs=[]}=await db
        .from('vehicles')
        .select('id,make,model')
        .eq(
            'status',
            'available'
        );


    modal(
        'Add appointment',

        `

        <div class="form">

            <select id="c">

                ${cs.map(x=>`

                    <option value="${x.id}">
                        ${escape(x.full_name)}
                    </option>

                `).join('')}

            </select>


            <select id="v">

                ${vs.map(x=>`

                    <option value="${x.id}">
                        ${escape(
                            x.make+' '+x.model
                        )}
                    </option>

                `).join('')}

            </select>


            <input
                id="dt"
                type="datetime-local"
            >


            <select id="t">

                <option value="test_drive">
                    Test drive
                </option>

                <option value="viewing">
                    Viewing
                </option>

                <option value="meeting">
                    Meeting
                </option>

            </select>

        </div>

        `,

        async d=>{

            const {
                data:a,
                error
            }=await db
                .from('appointments')
                .insert({

                    customer_id:
                        d.querySelector('#c').value,

                    vehicle_id:
                        d.querySelector('#v').value,

                    assigned_to:
                        profile.id,

                    starts_at:
                        new Date(
                            d.querySelector('#dt').value
                        ).toISOString(),

                    appointment_type:
                        d.querySelector('#t').value

                })
                .select()
                .single();


            if(error)throw error;


            await log(
                'Appointment created',
                'appointment',
                a.id
            );


            loadPage('appointments');

        }

    );

}


/* ==========================================
   TRADE IN
========================================== */

async function tradeModal(){

    const {data:cs=[]}=await db
        .from('customers')
        .select('id,full_name')
        .order('full_name');


    modal(
        'Add trade-in',

        `

        <div class="form">

            <select id="c">

                ${cs.map(x=>`

                    <option value="${x.id}">
                        ${escape(x.full_name)}
                    </option>

                `).join('')}

            </select>


            <input
                id="make"
                placeholder="Vehicle make"
            >

            <input
                id="model"
                placeholder="Vehicle model"
            >

            <input
                id="year"
                type="number"
                placeholder="Year"
            >

            <input
                id="reg"
                placeholder="Registration"
            >

            <input
                id="mil"
                type="number"
                placeholder="Mileage"
            >

            <input
                id="val"
                type="number"
                placeholder="Estimated value"
            >

            <input
                id="offer"
                type="number"
                placeholder="Offer"
            >

        </div>

        `,

        async d=>{

            const {
                data:t,
                error
            }=await db
                .from('trade_ins')
                .insert({

                    customer_id:
                        d.querySelector('#c').value,

                    vehicle_make:
                        d.querySelector('#make').value,

                    vehicle_model:
                        d.querySelector('#model').value,

                    vehicle_year:
                        Number(
                            d.querySelector('#year').value
                        )||null,

                    registration:
                        d.querySelector('#reg').value,

                    mileage:
                        Number(
                            d.querySelector('#mil').value
                        )||null,

                    estimated_value:
                        Number(
                            d.querySelector('#val').value
                        )||null,

                    offer:
                        Number(
                            d.querySelector('#offer').value
                        )||null

                })
                .select()
                .single();


            if(error)throw error;


            await log(
                'Trade-in added',
                'trade_in',
                t.id
            );


            loadPage('tradeins');

        }

    );

}


/* ==========================================
   SALE
========================================== */

async function saleModal(){

    const {data:cs=[]}=await db
        .from('customers')
        .select('id,full_name')
        .order('full_name');


    const {data:vs=[]}=await db
        .from('vehicles')
        .select(
            'id,make,model,price'
        )
        .in(
            'status',
            [
                'available',
                'reserved'
            ]
        );


    const {data:staffs=[]}=await db
        .from('profiles')
        .select(
            'id,full_name,role,active'
        )
        .eq(
            'active',
            true
        )
        .order('full_name');


    const salespersonField=
        profile.role==='manager'

        ?

        `<select id="sp">

            ${staffs.map(x=>`

                <option
                    value="${x.id}"
                    ${
                        x.id===profile.id
                        ?
                        'selected'
                        :
                        ''
                    }
                >

                    ${escape(
                        x.full_name||x.id
                    )}
                    —
                    ${escape(x.role)}

                </option>

            `).join('')}

        </select>`

        :

        `<input
            id="sp"
            value="${escape(
                profile.full_name||''
            )}"
            disabled
        />`;


    modal(
        'Record sale',

        `

        <div class="form">

            <select id="c">

                ${cs.map(x=>`

                    <option value="${x.id}">
                        ${escape(x.full_name)}
                    </option>

                `).join('')}

            </select>


            <select id="v">

                ${vs.map(x=>`

                    <option value="${x.id}">

                        ${escape(
                            x.make+
                            ' '+
                            x.model
                        )}

                        —
                        R${Number(
                            x.price||0
                        ).toLocaleString('en-ZA')}

                    </option>

                `).join('')}

            </select>


            ${salespersonField}


            <input
                id="price"
                type="number"
                placeholder="Final sale price"
            >


            <input
                id="date"
                type="date"
                value="${
                    new Date()
                    .toISOString()
                    .slice(0,10)
                }"
            >


            <select id="pay">

                <option>pending</option>
                <option>paid</option>
                <option>part_paid</option>

            </select>


            <select id="delivery">

                <option>pending</option>
                <option>ready</option>
                <option>delivered</option>

            </select>

        </div>

        `,

        async d=>{

            const vid=
                d.querySelector('#v').value;


            const salespersonId=
                profile.role==='manager'
                ?
                d.querySelector('#sp').value
                :
                profile.id;


            const {
                data:s,
                error
            }=await db
                .from('sales')
                .insert({

                    customer_id:
                        d.querySelector('#c').value,

                    vehicle_id:
                        vid,

                    salesperson_id:
                        salespersonId,

                    sale_price:
                        Number(
                            d.querySelector('#price').value
                        ),

                    sale_date:
                        d.querySelector('#date').value,

                    payment_status:
                        d.querySelector('#pay').value,

                    delivery_status:
                        d.querySelector('#delivery').value

                })
                .select()
                .single();


            if(error)throw error;


            /*
               Mark vehicle sold.
               updated_at starts the 24 hour timer.
            */

            const {
                error:vehicleError
            }=await db
                .from('vehicles')
                .update({

                    status:'sold',

                    updated_at:
                        new Date().toISOString()

                })
                .eq(
                    'id',
                    vid
                );


            if(vehicleError)
                throw vehicleError;


            await log(
                'Vehicle sold',
                'sale',
                s.id
            );


            loadPage('sales');

        }

    );

}


/* ==========================================
   FOLLOW UP
========================================== */

async function followModal(){

    const {data:cs=[]}=await db
        .from('customers')
        .select('id,full_name')
        .order('full_name');


    modal(
        'Add follow-up',

        `

        <div class="form">

            <select id="c">

                ${cs.map(x=>`

                    <option value="${x.id}">
                        ${escape(x.full_name)}
                    </option>

                `).join('')}

            </select>


            <input
                id="dt"
                type="datetime-local"
            >


            <textarea
                id="n"
                placeholder="Follow-up notes"
            ></textarea>

        </div>

        `,

        async d=>{

            const {
                data:f,
                error
            }=await db
                .from('followups')
                .insert({

                    customer_id:
                        d.querySelector('#c').value,

                    assigned_to:
                        profile.id,

                    due_at:
                        new Date(
                            d.querySelector('#dt').value
                        ).toISOString(),

                    notes:
                        d.querySelector('#n').value

                })
                .select()
                .single();


            if(error)throw error;


            await log(
                'Follow-up created',
                'followup',
                f.id
            );


            loadPage('followups');

        }

    );

}


/* ==========================================
   ACTIVITY LOG
========================================== */

async function log(
    action,
    type,
    id
){

    await db
        .from('activity_log')
        .insert({

            actor_id:
                profile.id,

            action,
            entity_type:type,
            entity_id:id

        });

}


/* ==========================================
   SEARCH
========================================== */

function filterRows(term){

    const value=String(term??'').toLowerCase().trim();

    const vehicleCards=document.querySelectorAll('.vehicle-card');

    if(vehicleCards.length){

        vehicleCards.forEach(card=>{

            const haystack=(
                card.innerText+' '+
                (card.dataset.search||'')+' '+
                (card.dataset.stock||'')
            ).toLowerCase();

            card.style.display=
                !value||haystack.includes(value)
                    ?''
                    :'none';

        });

        return;

    }

    document
        .querySelectorAll('tbody tr')
        .forEach(r=>{

            r.style.display=
                r.innerText
                    .toLowerCase()
                    .includes(value)
                    ?
                    ''
                    :
                    'none';

        });

}


/* ==========================================
   ESCAPE
========================================== */

function escape(s){

    return String(
        s??''
    ).replace(
        /[&<>"']/g,
        m=>({

            '&':'&amp;',
            '<':'&lt;',
            '>':'&gt;',
            '"':'&quot;',
            "'":'&#039;'

        }[m])
    );

}


/* ==========================================
   START
========================================== */
